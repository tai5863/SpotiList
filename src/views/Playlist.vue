<template>
  <div id="playlist">
    <header-comp :message="'分類されたお気に入りの曲からプレイリストを作成します。'"/>
    <div class="container">
      <p>あなたのお気に入りの曲はこんな感じ</p>
      <centroid
        :centroid="average"
        :color="'#ffffff'"
        :id="9999"
      />
      <p>類似度の高い曲からプレイリストを作成しました！</p>
      <div class="button_container save">
        <!-- <button @click="doAxios" class="operator save">
          プレイリストを保存
        </button> -->
        <button class="operator save">
          プレイリストを保存
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import HeaderComp from "@/components/HeaderComp.vue";
import Centroid from "@/components/Centroid.vue";

export default {
  name: 'Playlist',
  components: {
    HeaderComp,
    Centroid
  },
  props: {
    routeParams: Object,
    classifiedSongs: Array,
    centroids: Array,
    favorites: Array,
    userId: String,
  },
  data() {
    return {
      axios: axios,
      playlistIds: [],
      classifiedFavorites: [],
      average: {
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
      }
    }
  },
  created() {
    if (this.routeParams === undefined) {
      this.$router.push('/');
    }
    for (let i = 0; i < this.centroids.length; i++) {
      let centroid = this.centroids[i];
      for (let j = 0; j < Object.keys(centroid).length; j++) {
        let key = Object.keys(centroid)[j];
        this.average[key] += centroid[key] / this.centroids.length;
        if (key !== "loudness") {
          this.average[key] = Number(
            centroid[key].toFixed(3)
          );
        } else {
          this.average[key] = Number(
            centroid[key].toFixed(2)
          );
        }
      }
    }
    for (let i = 0; i < this.classifiedSongs.length; i++) {
      this.classifiedFavorites.push([]);
      for (let j = 0; j < this.classifiedSongs[i].length; j++) {
        this.classifiedFavorites[i].push([]);
        let id = this.classifiedSongs[i][j].id;
        this.classifiedFavorites[i][j].push(this.favorites[id]);
      }
    }
    console.log(this.classifiedFavorites);
  },
  computed: {
    config() {
      return {
        headers: {
          Authorization:
            this.routeParams.token_type + " " + this.routeParams.access_token,
          "Content-Type": "application/json",
        },
      };
    },
  },
  methods: {
    async doAxios() {
      await this.makePlaylists();
      await this.savePlaylists();
    },
    makePlaylists() {
      return new Promise((resolve, reject) => {
        let promises = [];

        for (let i = 0; i < this.classifiedFavorites.length; i++) {
          let endpoint =
            "https://api.spotify.com/v1/users/" + this.userId + "/playlists";
          let data = {
            name: "Playlist #" + (i + 1),
            public: false
          };

          promises.push(this.axios.post(endpoint, JSON.stringify(data), this.config));
        }

        this.axios
          .all(promises)
          .then((res) => {
            for (let i = 0; i < res.length; i++) {
              let playlistId = res[i].data.id;
              this.playlistIds.push(playlistId);
            }
            console.log("make playlists");
            resolve("make playlists");
          })
          .catch((err) => {
            console.error(err + ": make playlists");
            alert("エラーが発生しました");
            this.$router.push("/");
            reject(err);
          });
      });
    },
    savePlaylists() {
      return new Promise((resolve, reject) => {
        let promises = [];

        for (let i = 0; i < this.classifiedFavorites.length; i++) {
          let endpoint =
            "https://api.spotify.com/v1/playlists/" +
            this.playlistIds[i] +
            "/tracks";
          let data = {
            uris: []
          };

          for (let j = 0; j < this.classifiedFavorites[i].length; j++) {
            data.uris.push(
              this.classifiedFavorites[i][j][0].track.uri
            );
          }

          promises.push(this.axios.post(endpoint, JSON.stringify(data), this.config));
        }

        this.axios
          .all(promises)
          .then(() => {
            console.log("save playlists");
            alert("プレイリストを保存しました");
            resolve("save playlists");
          })
          .catch((err) => {
            console.error(err + ": save playlists");
            alert("エラーが発生しました");
            this.$router.push("/");
            reject(err);
          });
      });
    },
  }
}
</script>

<style scoped>
@import "../assets/css/styles.css";

#playlist {
  font-size: 1.3rem;
  text-align: left;
  color: #ffffff;
}
.container {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}
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
.centroid {
  width: 25%;
  transition-duration: 0.6s;
  animation: show 0.6s both;
  animation-delay: 0.2s;
  -webkit-animation: show 0.6s both;
  -webkit-animation-delay: 0.2s;
}
.centroid:hover {
  background-color: rgb(127, 127, 127);
  cursor: pointer;
}
p {
  margin: 3rem 0;
  font-family: "游ゴシック", "Yu Gothic", "游ゴシック体", YuGothic, sans-serif;
  animation: show 0.6s both;
  font-weight: 1000;
  font-size: 15px;
}
</style>
