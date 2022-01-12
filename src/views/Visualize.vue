<template>
  <div id="visualize">
    <get-tracks-information v-if="!isExistingAudioFeatures && !displayExplanation" :routeParams="routeParams" @get_audio_features="visualize" @get_favorites="setFavorites" />
    <params-explanation v-if="displayExplanation" @close="closeExplanation" />
    <div class="button_container explanation" v-if="!displayExplanation">
      <button @click="toggleParamsExplanation" class="operator explanation">
        パラメータの説明
      </button>
    </div>
    <div id="songs_container" v-show="isVisualizing && !displayExplanation">
      <song :song="song1"/>
      <song :song="song2"/>
      <song :song="song3"/>
    </div>
    <button v-on:click="visualizeSample">CSS3D</button>
  </div>
</template>

<script>
// import kmeans from "kmeans-js";
import * as THREE from 'three';
import {
  CSS3DRenderer,
  CSS3DObject
} from 'three-css3drenderer';

import GetTracksInformation from '@/components/GetTracksInformation.vue'
import ParamsExplanation from '@/components/ParamsExplanation.vue'
import Song from '@/components/Song.vue'

export default {
  name: 'Visualize',
  components: {
    GetTracksInformation,
    ParamsExplanation,
    Song
  },
  props: {
    routeParams: Object
  },
  data() {
    return {
      isExistingAudioFeatures: false,
      isVisualizing: false,
      displayExplanation: false,
      favorites: [],
      audioFeatures: [],
      vectors: [],
      song1: {
        thumbnailUrl: "",
        name: "",
        artist: "",
        acousticness: 0,
        danceability: 0,
        duration_ms: 0,
        energy: 0,
        instrumentalness: 0,
        key: 0,
        liveness: 0,
        loudness: 0,
        mode: 0,
        speechiness: 0,
        tempo: 0,
        time_signature: 0,
        valence: 0
      },
      song2: {
        thumbnailUrl: "",
        name: "",
        artist: "",
        acousticness: 0,
        danceability: 0,
        duration_ms: 0,
        energy: 0,
        instrumentalness: 0,
        key: 0,
        liveness: 0,
        loudness: 0,
        mode: 0,
        speechiness: 0,
        tempo: 0,
        time_signature: 0,
        valence: 0
      },
      song3: {
        thumbnailUrl: "",
        name: "",
        artist: "",
        acousticness: 0,
        danceability: 0,
        duration_ms: 0,
        energy: 0,
        instrumentalness: 0,
        key: 0,
        liveness: 0,
        loudness: 0,
        mode: 0,
        speechiness: 0,
        tempo: 0,
        time_signature: 0,
        valence: 0
      }
    }
  },
  created() {
    if (this.$route.hash) {
      this.$router.push(this.$route.fullPath.replace('#', '?'));
      this.authorized = true;
    }
  },
  mounted() {
    // this.visualizeSample();
  },
  methods: {
    toggleParamsExplanation() {
      this.displayExplanation = !this.displayExplanation;
    },
    visualizeSample() {
      this.isVisualizing = true;

      let camera, scene, renderer, objects;
      let fov = 240;

      let width = window.innerWidth, height = window.innerHeight;

      let wrapper = document.getElementById("songs_container");
      let items = document.getElementsByClassName("song");

      init();
      animate();

      function init() {
        camera = new THREE.PerspectiveCamera(fov, width / height, 1, 1000);
        scene = new THREE.Scene();

        objects = new THREE.Group();

        for (let i = 0; i < items.length; i++) {
          let object = new CSS3DObject(items[i]);
          object.position.x = Math.cos((i + 1) / items.length * 2 * Math.PI) * 400 + width / 2;
          object.position.y = Math.sin((i + 1) / items.length * 2 * Math.PI) * 400 + height / 2;
          object.position.z = Math.random() * -500;
          objects.add(object);
        }

        scene.add(objects);

        renderer = new CSS3DRenderer();
        renderer.setSize(width, height);
        renderer.domElement.firstChild.style.perspective = 600 + 'px';

        // delete children
        while (wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
        wrapper.appendChild(renderer.domElement);
      }

      function animate() {
        requestAnimationFrame(animate);
        render();
      }

      function render() {
        renderer.render(scene, camera);
      }

      renderer.domElement.firstChild.style.transformStyle = 'flat';
    },
    setFavorites(favorites) {
      this.favorites = favorites;
    },
    visualize(audioFeatures) {
      this.audioFeatures = audioFeatures;
      console.log(this.audioFeatures);
      // kmeans(audioFeatures, 10, (res, err) => {
      //   console.log(res);

      //   if (err) {
      //     console.error(err);
      //   }
      // });
      for (let i in this.audioFeatures) {
        let obj = {};
        setSongInformation(obj, this.favorites, this.audioFeatures, i);
        addVector(this.vectors, obj);
      }

      setSongInformation(this.song1, this.favorites, this.audioFeatures, 0);
      setSongInformation(this.song2, this.favorites, this.audioFeatures, 1);
      setSongInformation(this.song3, this.favorites, this.audioFeatures, 2);

      this.isExistingAudioFeatures = true;
    },
    closeExplanation() {
      this.displayExplanation = false;
    }
  }
}

function setSongInformation(songObject, favorites, audioFeatures, index) {
  songObject.name = favorites[index].track.name;
  songObject.artist = favorites[index].track.artists[0].name;
  songObject.thumbnailUrl = favorites[index].track.album.images[0].url;

  songObject.acousticness = audioFeatures[index].acousticness;
  songObject.danceability = audioFeatures[index].danceability;
  songObject.duration_ms = audioFeatures[index].duration_ms;
  songObject.energy = audioFeatures[index].energy;
  songObject.instrumentalness = audioFeatures[index].instrumentalness;
  songObject.key = audioFeatures[index].key;
  songObject.liveness = audioFeatures[index].liveness;
  songObject.loudness = audioFeatures[index].loudness;
  songObject.mode = audioFeatures[index].mode;
  songObject.speechiness = audioFeatures[index].speechiness;
  songObject.tempo = audioFeatures[index].tempo;
  songObject.time_signature = audioFeatures[index].time_signature;
  songObject.valence = audioFeatures[index].valence;
}

function addVector(vectors, songObject) {
  let arr = [];
  for (let i = 3; i < Object.keys(songObject).length; i++) {
    arr.push(songObject[Object.keys(songObject)[i]]);
  }
  vectors.push(arr);
}

</script>

<style scoped>
@import "../assets/css/styles.css";

#visualize {
  font-size: 1.3rem;
  text-align: left;
  color: #ffffff;
}
#songs_container {
  overflow: hidden;
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
</style>
