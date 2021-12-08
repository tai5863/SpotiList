<template>
  <div id="visualize">
    <h1>Visualize</h1>
    <GetTracksInformation :routeParams="routeParams"></GetTracksInformation>
  </div>
</template>

<script>
import GetTracksInformation from '@/components/GetTracksInformation.vue'

export default {
  name: 'Visualize',
  components: {
    GetTracksInformation
  },
  props: {
    routeParams: Object
  },
  created() {
    if (this.$route.hash) {
      this.$router.push(this.$route.fullPath.replace('#', '?'));
      this.authorized = true;
    }
  }
}
</script>

<style scoped>
#visualize {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
