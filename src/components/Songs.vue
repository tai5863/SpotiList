<template>
  <div class="songs">
    <centroid
      :centroid="centroids[id]"
      :color="colors[id]"
      :id="id"
    />
    <canvas id="canvas"></canvas>
    <div id="songs_container">
      <song
        class="song"
        v-for="song in classifiedSongs[id].slice(0, 15)"
        :key="song.id"
        :song="song"
      />
    </div>
    <div class="button_container back">
      <button @click="back" class="operator back">戻る</button>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";

import Centroid from "@/components/Centroid.vue";
import Song from "@/components/Song.vue";

export default {
  name: "Songs",
  components: {
    Centroid,
    Song,
  },
  props: {
    id: Number,
    colors: Array,
    centroids: Array,
    classifiedSongs: Array,
  },
  mounted() {
    console.log(this.centroids[this.id]);
    document.body.style.overflow = "hidden";
    this.target = this.id;

    let camera, scene, scene2, renderer, renderer2, objects;

    let width = window.innerWidth,
      height = window.innerHeight;

    let wrapper = document.getElementById("songs_container");
    let items = document.getElementsByClassName("song");

    init();
    animate();

    function init() {
      camera = new THREE.PerspectiveCamera(75, width / height, 1, 5000);
      camera.position.set(0, 0, 1000);
      camera.lookAt(0, 0, 0);
      scene = new THREE.Scene();
      scene2 = new THREE.Scene();

      objects = new THREE.Group();
      let positions = [];

      for (let i = 0; i < items.length; i++) {
        let arr = [];
        let object = new CSS3DObject(items[i]);
        object.position.x = Math.cos((i + 1) / items.length * 2 * Math.PI) * 1100 + Math.random() * 100 - 50;
        object.position.y = Math.sin((i + 1) / items.length * 2 * Math.PI) * 600 + Math.random() * 200 - 100;
        object.position.z = Math.random() * 100 - 50;
        arr.push(new THREE.Vector3(0, 0, 0));
        arr.push(new THREE.Vector3(object.position.x, object.position.y, object.position.z));
        objects.add(object);
        positions.push(arr);
      }

      scene.add(objects);

      renderer = new CSS3DRenderer();
      renderer.setSize(width, height);
      renderer.domElement.firstChild.style.perspective = 600 + "px";

      const material = new THREE.LineBasicMaterial({
        transparent: true,
        color: 0xffffff,
        opacity: 0.5
      });

      for (let i = 0; i < positions.length; i++) {
        const geometry = new THREE.BufferGeometry().setFromPoints(positions[i]);

        const line = new THREE.Line(geometry, material);

        scene2.add(line);
      }

      renderer2 = new THREE.WebGLRenderer({
        canvas: document.getElementById("canvas"),
        antialias: true,
        alpha: 1.0
      });
      renderer2.setSize(width, height);

      window.addEventListener("resize", onWindowResize, false);

      // delete children
      while (wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
      wrapper.appendChild(renderer.domElement);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
    }

    function render() {
      renderer.render(scene, camera);
      renderer2.render(scene2, camera);
    }

    renderer.domElement.firstChild.style.transformStyle = "flat";
  },
  destroyed() {
    document.body.style.overflow = "auto";
  },
  methods: {
    back() {
      this.$emit("back");
    },
  },
};
</script>

<style scoped>
@import "../assets/css/styles.css";

body {
  overflow-y: hidden;
}
.songs {
  position: relative;
  background-color: black;
  font-size: 1.3rem;
  text-align: left;
  color: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
  overflow-y: hidden;
}
.centroid {
  position: absolute;
  top: 50%;
  left: 50%; /*親のleftから50%*/
  transform: translateY(-50%) translateX(-50%);;
  z-index: 1000;
}
#songs_container {
  background-color: rgba(0, 0, 0, 0.5);
}
#canvas {
  position: absolute;
  top: 0;
  left: 0;
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
.button_container > .back {
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
</style>
