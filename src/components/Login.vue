<template>
  <div id="login">
    <div class="button_container">
      <button @click="login" class="operator" id="operator_auth">
        さあ、はじめましょう。
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  props: {
    redirectURI: String,
  },
  methods: {
    login: function () {
      const endpoint = "https://accounts.spotify.com/authorize";
      const response_type = "token";
      const client_id = "74bf37f991444e03b6a910d9078615b6";
      let scope = "user-library-read playlist-modify-private";
      location.href =
        endpoint +
        "?response_type=" +
        response_type +
        "&client_id=" +
        client_id +
        "&redirect_uri=" +
        this.redirectURI +
        "&scope=" +
        scope;
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
#operator_auth {
  background-color: #1ed760;
}
</style>
