<template>
  <div id="home">
    <h1>Spotilist</h1>
    <p>
      SpotiListは、Spotifyのお気に入りの曲を分析し、類似した曲のプレイリストを作成するアプリです。
    </p>
    <Login v-if="!authorized" :redirectURI="redirectURI"></Login>
    <GetTracksAndInformation
      :rendered="rendered"
      :routeParams="routeParams"
    ></GetTracksAndInformation>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import GetTracksAndInformation from "@/components/GetTracksAndInformation.vue";

export default {
  name: "App",
  components: {
    Login,
    GetTracksAndInformation,
  },
  data: function () {
    return {
      redirectURI: "http://localhost:8080/SpotiList/", // 開発用
      // redirectURI: 'https://tai5863.github.io/SpotiList/', // 本番用
      authorized: false,
      rendered: false,
    };
  },
  props: {
    routeParams: Object,
  },
  created: function () {
    if (this.$route.hash) {
      this.$router.push(this.$route.fullPath.replace("#", "?"));
      this.authorized = true;
      this.rendered = true;
    }
  },
};
</script>

<style>
#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
  font-size: 80px;
}
p {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
  font-size: 20px;
}
</style>
