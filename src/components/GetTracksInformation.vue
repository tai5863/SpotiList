<template>
  <div class="get_tracks_information">
    <div class="button_container visualize">
      <button @click="visualize" class="operator visualize">
        曲の詳細、類似度を可視化
      </button>
    </div>
  </div>
</template>

<script>
import kmeans from "kmeansjs";
import axios from "axios";

export default {
  name: "GetTracksInformation",
  props: {
    routeParams: Object,
  },
  data() {
    return {
      userId: "",
      axios: axios,
      favoriteTracksLimit: 50,
      featuresLimit: 100,
      total: 0,
      favorites: [],
      audioFeatures: [],
    };
  },
  computed: {
    data() {
      return {
        headers: {
          Authorization:
            this.routeParams.token_type + " " + this.routeParams.access_token,
        },
        data: {},
      };
    },
  },
  methods: {
    async visualize() {
      await this.getUserId();
      await this.getTotalNumber();
      await this.getTracks();
      await this.getAudioFeatures();
      await this.kmeans();
      console.log("finished");
    },
    getUserId() {
      return new Promise((resolve, reject) => {
        let endpoint_user_id = "https://api.spotify.com/v1/me/";

        this.axios
          .get(endpoint_user_id, this.data)
          .then((res) => {
            this.userId = res.data.id;
            console.log("get userId");
            resolve("get userId");
          })
          .catch((err) => {
            console.error(err + ": get userId");
            alert("エラーが発生しました");
            // window.location.href = "http://localhost:8080/SpotiList";
            this.$router.push("/");
            reject(err);
          });
      });
    },
    getTotalNumber() {
      return new Promise((resolve, reject) => {
        let endpoint_total_num =
          "https://api.spotify.com/v1/me/tracks?limit=" +
          String(this.favoriteTracksLimit) +
          "&market=JP";
        this.axios
          .get(endpoint_total_num, this.data)
          .then((res) => {
            this.favorites = res.data.items;
            this.total = res.data.total;
            console.log("total: " + String(this.total));
            resolve("get total number");
          })
          .catch((err) => {
            console.error(err + ": get total number");
            alert("エラーが発生しました");
            this.$router.push("/");
            reject(err);
          });
      });
    },
    getTracks() {
      return new Promise((resolve, reject) => {
        let offset = 0;

        if (this.total !== 0) {
          let promises = [];
          let loop_num = Math.floor(this.total / this.favoriteTracksLimit) + 1;

          for (let i = 0; i < loop_num; i++) {
            offset += this.favoriteTracksLimit;
            let endpoint_tracks =
              "https://api.spotify.com/v1/me/tracks?offset=" +
              String(offset) +
              "&limit=50&market=JP";
            promises.push(this.axios.get(endpoint_tracks, this.data));
          }

          this.axios
            .all(promises)
            .then((res) => {
              res.forEach((element) => {
                this.favorites = this.favorites.concat(element.data.items);
              });
              console.log("get tracks");
              resolve("get tracks");
            })
            .catch((err) => {
              console.error(err + ": get tracks");
              alert("エラーが発生しました");
              this.$router.push("/");
              reject(err);
            });
        }
      });
    },
    getAudioFeatures() {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-unused-vars
        let offset = 0;
        let splitFavorites = [];

        let promises = [];
        let loop_num = Math.floor(this.total / this.featuresLimit) + 1;

        for (let i = 0; i < loop_num; i++) {
          offset += this.featuresLimit;
          splitFavorites = sliceByNumber(this.favorites, this.featuresLimit);
          let endpoint_features =
            "https://api.spotify.com/v1/audio-features?ids=" +
            splitFavorites[i].map((item) => item.track.id);
          promises.push(this.axios.get(endpoint_features, this.data));
        }

        this.axios
          .all(promises)
          .then((res) => {
            res.forEach((element) => {
              this.audioFeatures = this.audioFeatures.concat(
                element.data.audio_features
              );
            });
            console.log("get audio features");
            resolve("get audio features");

            this.kmeans();
          })
          .catch((err) => {
            console.error(err + ": audio features");
            alert("エラーが発生しました");
            this.$router.push("/");
            reject(err);
          });
      });
    },
    kmeans() {
      return new Promise((resolve, reject) => {
        let vectors = [];
        let songs = [];
        let classifiedSongs = [];
        let centroids = [];
        let colors = [];

        let params = {
          id: 0,
          acousticness: 0,
          danceability: 0,
          energy: 0,
          instrumentalness: 0,
          key: 0,
          liveness: 0,
          loudness: 0,
          mode: 0,
          speechiness: 0,
          tempo: 0,
          time_signature: 0,
          valence: 0,
          distance: 0,
        };

        for (let i in this.audioFeatures) {
          let obj = {};
          setSongInformation(obj, this.favorites, this.audioFeatures, i);
          songs.push(obj);
          addVector(vectors, obj);
        }

        let distances = [];

        let k = kmeans(vectors, 10, (err, res) => {
          if (err) {
            console.error(err);
            this.$router.push("/");
            reject(err)
          }

          for (let i = 0; i < res.length; i++) {
            let tmp = [];
            distances.push([]);
            for (let j = 0; j < res[i].length; j++) {
              distances[i].push(res[i][j][res[i][j].length - 1]);
              let id = res[i][j][0];
              delete songs["distance"];
              tmp.push(songs[id]);
            }
            classifiedSongs.push(tmp);
          }
        });

        for (let i = 0; i < k.centroids.length; i++) {
          let obj = {};
          setCentroidsInformation(obj, params, k.centroids[i]);
          centroids.push(obj);
        }

        for (let i = 0; i < k.k; i++) {
          let hue = 360 * (i / k.k);
          let color = "hsl(" + hue + ", 100%, 50%)";
          colors.push(color);
        }

        this.$emit("finished_clustering", classifiedSongs, centroids, distances, colors, this.favorites, this.userId);
        resolve('finished clustering');
      });
    },
  },
};

const sliceByNumber = (array, number) => {
  const length = Math.ceil(array.length / number);
  return new Array(length)
    .fill()
    .map((_, i) => array.slice(i * number, (i + 1) * number));
};

function setSongInformation(songObject, favorites, audioFeatures, index) {
  songObject.name = favorites[index].track.name;
  songObject.artist = favorites[index].track.artists[0].name;
  songObject.thumbnailUrl = favorites[index].track.album.images[0].url;
  songObject.id = Number(index);

  songObject.acousticness = audioFeatures[index].acousticness;
  songObject.danceability = audioFeatures[index].danceability;
  songObject.energy = audioFeatures[index].energy;
  songObject.instrumentalness = audioFeatures[index].instrumentalness;
  songObject.key = audioFeatures[index].key;
  songObject.liveness = audioFeatures[index].liveness;
  songObject.loudness = audioFeatures[index].loudness;
  songObject.mode = audioFeatures[index].mode;
  songObject.speechiness = audioFeatures[index].speechiness;
  songObject.tempo = audioFeatures[index].tempo;
  songObject.time_signature = audioFeatures[index].time_signature;
  songObject.valence = audioFeatures[index].valence;

  songObject.distance = 0;
}

function setCentroidsInformation(centroidObject, paramsObject, centroid) {
  for (let i = 0; i < Object.keys(paramsObject).length; i++) {
    if (Object.keys(paramsObject)[i] !== "loudness") {
      centroidObject[Object.keys(paramsObject)[i]] = Number(
        centroid[i].toFixed(3)
      );
    } else {
      centroidObject[Object.keys(paramsObject)[i]] = Number(
        centroid[i].toFixed(2)
      );
    }
  }
  delete centroidObject.distance;
  delete centroidObject.id;
}

function addVector(vectors, songObject) {
  let arr = [];
  for (let i = 3; i < Object.keys(songObject).length; i++) {
    arr.push(songObject[Object.keys(songObject)[i]]);
  }
  vectors.push(arr);
}
</script>

<style scoped>
@keyframes show {
  0% {
    transform: translate(0, 2em);
    opacity: 0;
  }
  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}
.button_container > .visualize {
  text-align: center;
  position: fixed;
  right: 5%;
  bottom: 0;
}
.operator {
  display: inline-block;
  transition-duration: 0.6s;
  animation: show 0.6s both;
  animation-delay: 0.2s;
  -webkit-animation: show 0.6s both;
  -webkit-animation-delay: 0.2s;
  font-family: "游ゴシック", "Yu Gothic", "游ゴシック体", YuGothic, sans-serif;
  font-weight: 1000;
  font-size: 15px;
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 40px;
  padding: 15px 30px;
  cursor: pointer;
  margin: 40px auto;
  width: 250px;
}
.operator:hover {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
