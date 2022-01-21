<template>
  <div id="home">
    <h1>SpotiList</h1>
    <p>SpotiListは、あなたのSpotifyのお気に入りの曲を分析し、類似した曲のプレイリストを作成するアプリです。</p>
    <Login v-if="!authorized" :redirectURI="redirectURI"></Login>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";

export default {
  name: "Home",
  components: {
    Login,
  },
  props: {
    routeParams: Object,
  },
  data() {
    return {
      authorized: false,
      // redirectURI: "https://spotilist-b5e14.web.app/",
      redirectURI: "https://tai5863.github.io/SpotiList/",
      // redirectURI: "http://localhost:8080/",
    };
  },
  created() {
    if (this.$route.hash) {
      this.$router.push(this.$route.fullPath.replace("#", "?"));
      this.authorized = true;
      this.$router.push({
        name: "Visualize",
        params: { routeParams: this.$route.query }
      });
    }
  }, 
};
</script>

<style scoped>
#home {
  width: 100vw;
  height: 100vh;
  text-align: center;
  color: #ffffff;
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
h1 {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen;
  animation: show 0.6s both;
  font-size: 40px;
}
p {
  font-family: "游ゴシック", "Yu Gothic", "游ゴシック体", YuGothic, sans-serif;
  animation: show 0.6s both;
  font-weight: 1000;
  font-size: 15px;
}
</style>
