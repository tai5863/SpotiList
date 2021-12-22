<template>
  <div id="home">
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
  data() {
    return {
      redirectURI: "http://localhost:8080/SpotiList/visualize", // 開発用
      // redirectURI: 'https://tai5863.github.io/SpotiList/', // 本番用
      authorized: false,
    };
  },
};
</script>

<style scoped>
#home {
  font-family: 'Abel', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
