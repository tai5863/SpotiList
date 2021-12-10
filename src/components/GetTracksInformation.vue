<template>
  <div id="get_tracks_information">
    <div class="button_container">
      <button @click="init" class="operator" id="operator_init">
        曲の詳細、類似度を可視化します
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GetTracksInformation",
  props: {
    routeParams: Object,
  },
  data() {
    return {
      userId: "",
      axios: require("axios"),
      limit: 50,
      total: 0,
      offset: 0,
      favorites: [],
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
    async init() {
      await this.getUserId();
      await this.getTotalNumber();
      await this.getTracks();
      console.log("finished");
    },
    getUserId() {
      return new Promise((resolve, reject) => {
        let endpoint = "https://api.spotify.com/v1/me/";

        this.axios
          .get(endpoint, this.data)
          .then((res) => {
            this.userId = res.data.id;
            console.log("get userId");
            resolve("get userId");
          })
          .catch((err) => {
            alert("エラーが発生しました");
            window.location.href = "";
            reject(err);
          });
      });
    },
    getTotalNumber() {
      return new Promise((resolve, reject) => {
        let endpoint_first =
          "https://api.spotify.com/v1/me/tracks?limit=" +
          String(this.limit) +
          "&market=JP";
        this.axios
          .get(endpoint_first, this.data)
          .then((res_first) => {
            this.favorites = res_first.data.items;
            this.total = res_first.data.total;
            console.log('total: ' + String(this.total));
            resolve("get favorites");
          })
          .catch((err) => {
            alert("エラーが発生しました");
            window.location.href = "";
            reject(err);
          });
      });
    },
    getTracks() {
      return new Promise((resolve, reject) => {
        if (this.total > this.limit) {
          let promises = [];
          let loop_num = Math.floor(this.total / this.limit);

          for (let i = 0; i < loop_num; i++) {
            this.offset += this.limit;
            let endpoint_next =
              "https://api.spotify.com/v1/me/tracks?offset=" +
              String(this.offset) +
              "&limit=50&market=JP";
            promises.push(this.axios.get(endpoint_next, this.data));
          }

          this.axios
            .all(promises)
            .then((res_next) => {
              res_next.forEach((element) => {
                this.favorites = this.favorites.concat(element.data.items);
              });
              console.log(this.favorites);
              resolve("get tracks");
            })
            .catch((err) => {
              console.error(err);
              alert("エラーが発生しました");
              window.location.href = "";
              reject(err);
            });
        } 
      });
    }
  },
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
.button_container {
  text-align: right;
  position: fixed;
  bottom: 0;
  right: 5%;
}
button {
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
#operator_init:hover {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
