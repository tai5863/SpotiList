<template>
  <div class="get_tracks_information">
    <div class="button_container visualize">
      <button @click="visualize" class="operator visualize">
        曲の詳細、類似度を可視化します
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GetTracksInformation",
  props: {
    routeParams: Object
  },
  data() {
    return {
      userId: "",
      axios: require("axios"),
      favoriteTracksLimit: 50,
      featuresLimit: 100,
      total: 0,
      favorites: [],
      audioFeatures: []
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
      }
    }
  },
  methods: {
    async visualize() {
      await this.getUserId();
      await this.getTotalNumber();
      await this.getTracks();
      await this.getAudioFeatures();
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
            window.location.href = "";
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
            console.log('total: ' + String(this.total));
            resolve("get total number");
          })
          .catch((err) => {
            console.error(err + ": get total number");
            alert("エラーが発生しました");
            window.location.href = "";
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
              this.$emit('get_favorites', this.favorites);
              console.log("get tracks");
              resolve("get tracks");
            })
            .catch((err) => {
              console.error(err + ": get tracks");
              alert("エラーが発生しました");
              window.location.href = "";
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
              this.audioFeatures = this.audioFeatures.concat(element.data.audio_features);
            });
            this.$emit('get_audio_features', this.audioFeatures);
            console.log("get audio features");
            resolve("get audio features");
          })
          .catch((err) => {
            console.error(err + ": audio features");
            alert("エラーが発生しました");
            window.location.href = "";
            reject(err);
          });
      });
    },
  },
};

const sliceByNumber = (array, number) => {
  const length = Math.ceil(array.length / number)
  return new Array(length).fill().map((_, i) =>
    array.slice(i * number, (i + 1) * number)
  );
};
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
