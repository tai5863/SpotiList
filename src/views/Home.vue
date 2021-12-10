<template>
  <div id="home">
    <Title></Title>
    <Login v-if="!authorized" :redirectURI="redirectURI"></Login>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import Title from "@/components/Title.vue";

export default {
  name: "Home",
  components: {
    Login,
    Title,
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
