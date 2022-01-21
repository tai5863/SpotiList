<template>
  <div id="visualize">
    <header-comp :message="'曲同士の類似度に基づいてビジュアライズします。'" />
    <get-tracks-information
      v-if="!isExistingAudioFeatures && !displayExplanation"
      :routeParams="routeParams"
      @finished_clustering="onFinishedClustering"
    />
    <params-explanation v-if="displayExplanation" @close="closeExplanation" />
    <div class="button_container explanation" v-if="!displayExplanation">
      <button @click="toggleParamsExplanation" class="operator explanation">
        パラメータの説明
      </button>
    </div>
    <div
      class="centroids_container"
      v-if="!displayExplanation && centroids.length !== 0 && !isVisualizing"
    >
      <centroid
        v-for="(centroid, index) in centroids"
        :key="centroid.id"
        :centroid="centroid"
        :color="colors[index]"
        :id="index"
        @click.native="render(index)"
      />
    </div>
    <songs
      v-if="isVisualizing && !displayExplanation"
      :id="target"
      :classifiedSongs="classifiedSongs"
      :centroids="centroids"
      :colors="colors"
      @back="toggleVisualize"
    />
    <div class="button_container playlist" v-if="!displayExplanation && isExistingAudioFeatures && !isVisualizing">
      <button @click="pushToPlaylist" class="operator playlist">
        プレイリストを作成
      </button>
    </div>
  </div>
</template>

<script>
import GetTracksInformation from "@/components/GetTracksInformation.vue";
import ParamsExplanation from "@/components/ParamsExplanation.vue";
import HeaderComp from "@/components/HeaderComp.vue";
import Centroid from "@/components/Centroid.vue";
import Songs from "@/components/Songs.vue";

export default {
  name: "Visualize",
  components: {
    GetTracksInformation,
    ParamsExplanation,
    // eslint-disable-next-line vue/no-unused-components
    HeaderComp,
    Centroid,
    Songs,
  },
  props: {
    routeParams: Object,
  },
  data() {
    return {
      userId: "",
      isExistingAudioFeatures: false,
      isVisualizing: false,
      displayExplanation: false,
      target: 0,
      favorites: [],
      classifiedSongs: [],
      colors: [],
      centroids: [],
      distanecs: [],
    };
  },
  created() {
    if (this.$route.hash) {
      this.$router.push(this.$route.fullPath.replace("#", "?"));
      this.authorized = true;
    }
  },
  methods: {
    toggleParamsExplanation() {
      this.displayExplanation = !this.displayExplanation;
    },
    render(index) {
      window.scroll({ top: 0 });
      this.target = index;
      this.isVisualizing = true;
    },
    onFinishedClustering(...arg) {
      const [classifiedSongs, centroids, distances, colors, favorites, userId] = arg;
      this.classifiedSongs = classifiedSongs;
      this.centroids = centroids;
      this.distances = distances;
      this.colors = colors;
      this.favorites = favorites;
      this.userId = userId;

      this.isExistingAudioFeatures = true;
    },
    toggleVisualize() {
      this.isVisualizing = !this.isVisualizing;
    },
    closeExplanation() {
      this.displayExplanation = false;
    },
    pushToPlaylist() {
      this.$router.push({
        name: "Playlist",
        params: {
          centroids: this.centroids,
          classifiedSongs: this.classifiedSongs,
          routeParams: this.routeParams,
          favorites: this.favorites,
          userId: this.userId
        },
      });
    }
  },
};
</script>

<style scoped>
@import "../assets/css/styles.css";

#visualize {
  font-size: 1.3rem;
  text-align: left;
  color: #ffffff;
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
.button_container > .explanation {
  z-index: 1000;
  text-align: center;
  position: fixed;
  right: 5%;
  top: 0;
}
.button_container > .playlist {
  z-index: 1000;
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
.centroids_container {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
}
.centroid {
  transition-duration: 0.6s;
  animation: show 0.6s both;
  animation-delay: 0.2s;
  -webkit-animation: show 0.6s both;
  -webkit-animation-delay: 0.2s;
}
.centroid:hover {
  background-color: rgb(127, 127, 127);
  cursor: pointer;
}
</style>
