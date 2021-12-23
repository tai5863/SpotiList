<template>
  <div class="song">
    <img :id="this.song.name + '_thumbnail'" :src="this.song.thumbnailUrl" alt="thumbnail" v-on:click="toggleDisplayParams" />
    <div class="audio_features" :id="this.song.name">
      <div class="title">
        <p class="song_name">{{ song.name }}</p>
        <p class="artist">{{ song.artist }}</p>
      </div>
      <parameter :paramName="'Acousticness'" :value="song.acousticness" :min="0" :max="1" />
      <parameter :paramName="'Danceability'" :value="song.danceability" :min="0" :max="1" />
      <parameter :paramName="'Enegy'" :value="song.energy" :min="0" :max="1" />
      <parameter :paramName="'Instrumentalness'" :value="song.instrumentalness" :min="0" :max="1" />
      <parameter :paramName="'Liveness'" :value="song.liveness" :min="0" :max="1" />
      <parameter :paramName="'Loudness'" :value="song.loudness" :min="-60" :max="0" />
      <parameter :paramName="'Speechiness'" :value="song.speechiness" :min="0" :max="1" />
      <parameter :paramName="'Valence'" :value="song.valence" :min="0" :max="1" />
      <!-- <p class="param">duration_ms: {{ song.duration_ms }}</p> -->
      <!-- <p class="param">key: {{ song.key }}</p> -->
      <!-- <p class="param">mode: {{ song.mode }}</p> -->
      <!-- <p class="param">tempo: {{ song.tempo }}</p> -->
      <!-- <p class="param">time_signature: {{ song.time_signature }}</p> -->
    </div>
  </div>
</template>

<script>
import Parameter from '@/components/Parameter.vue'

export default {
  name: 'Song',
  components: {
    Parameter
  },
  props: {
    song: Object
  },
  data() {
    return {
      isDisplayed: false
    }
  },
  methods: {
    toggleDisplayParams() {
      this.isDisplayed = !this.isDisplayed;
      let eAudioFeatures = document.getElementById(this.song.name);
      let eThumbnail = document.getElementById(this.song.name + '_thumbnail');

      if (this.isDisplayed === true) {
        eAudioFeatures.style.transitionDuration = "1.0s, 0.5s";
        eAudioFeatures.style.transitionTimingFunction = "ease-in-out";
        eAudioFeatures.style.transitionDelay = "0.0s, 0.5s";
        eAudioFeatures.classList.add('displayed_audio_features');

        eThumbnail.classList.add('displayed_img');
      } else {
        eAudioFeatures.style.transitionDuration = "1.0s, 0.5s";
        eAudioFeatures.style.transitionTimingFunction = "ease-out";
        eAudioFeatures.style.transitionDelay = "0.0s";
        eAudioFeatures.classList.remove('displayed_audio_features');
        
        eThumbnail.classList.remove('displayed_img');
      }
    }
  }
}
</script>

<style scoped>
.song {
  padding: 1rem 1rem 1.8rem 1rem;
  font-size: 1.3rem;
  text-align: left;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
img {
  width: 230px;
  height: 230px;
  margin: 0 1rem;
  background: white;
  opacity: 0.7;
  transition: all 1.0s;
}
img:hover {
  cursor: pointer;
  opacity: 1.0;
}
.displayed_img {
  opacity: 1.0; 
}
.audio_features {
  display: inline-block;
  margin: 0 1rem;
  transition-property: width, opacity;
  opacity: 0;
  width: 0px;
}
.displayed_audio_features {
  opacity: 1;
  width: 100%;
}
.title {
  height: 3rem;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  justify-content: left;
}
.song_name {
  border-bottom: 0.01rem solid #ffffff;
  font-size: 1.8rem;
}
.artist {
  margin: 0 1rem;
  font-size: 1.5rem;
  opacity: 0.3;
}
.param {
  margin: 0;
}
</style>
