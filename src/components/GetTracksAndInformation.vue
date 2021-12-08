<template>
  <div id="main">
    <div class="button_container">
      <button @click="init" class="operator" v-if="rendered" id="operator_init">
        曲の詳細、類似度を可視化します
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  components: {
  },
  props: {
    rendered: Boolean,
    routeParams: Object,
  },
  data: function () {
    return {
    };
  },
  methods: {
    init: function () {
      this.getUsersID();
    },
    getUsersID: function () {
      const axios = require("axios");
      let endpoint = "https://api.spotify.com/v1/me/";
      let data = {
        headers: {
          Authorization:
            this.routeParams.token_type + " " + this.routeParams.access_token,
        },
        data: {},
      };

      axios
        .get(endpoint, data)
        .then((res) => {
          this.userID = res.data.id;
        })
        .catch((err) => {
          console.error(err);
          alert("エラーが発生しました");
          window.location.href = "";
        });
    },
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