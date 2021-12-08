<template>
  <div id="home">
    <h1>Spotilist</h1>
    <p>
      SpotiListは、Spotifyのお気に入りの曲を分析し、類似した曲のプレイリストを作成するアプリです。
    </p>
    <Login v-if="!authorized" :redirectURI="redirectURI"></Login>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";

export default {
  name: "App",
  components: {
    Login,
  },
  data: function () {
    return {
      redirectURI: "http://localhost:8080/SpotiList/visualize", // 開発用
      // redirectURI: 'https://tai5863.github.io/SpotiList/', // 本番用
      authorized: false,
    };
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
