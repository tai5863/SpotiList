<template>
  <div class="centroid" :id="'centroid' + id">
    <div class="audio_features" :id="'centroid' + id + '_features'">
      <div class="title" v-if="!isAverage">
        Centroid No.{{ id + 1 }}
      </div>
      <div class="title" v-if="isAverage">
        Average
      </div>
      <parameter :paramName="'Acousticness'" :value="centroid.acousticness" :min="0" :max="1" />
      <parameter :paramName="'Danceability'" :value="centroid.danceability" :min="0" :max="1" />
      <parameter :paramName="'Enegy'" :value="centroid.energy" :min="0" :max="1" />
      <parameter :paramName="'Instrumentalness'" :value="centroid.instrumentalness" :min="0" :max="1" />
      <parameter :paramName="'Liveness'" :value="centroid.liveness" :min="0" :max="1" />
      <parameter :paramName="'Loudness'" :value="centroid.loudness" :min="-60" :max="0" />
      <parameter :paramName="'Speechiness'" :value="centroid.speechiness" :min="0" :max="1" />
      <parameter :paramName="'Valence'" :value="centroid.valence" :min="0" :max="1" />
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
  name: 'Centroid',
  components: {
    Parameter
  },
  props: {
    centroid: Object,
    id: Number,
    color: String
  },
  data() {
    return {
      isDisplayed: true,
      isAverage: false,
    }
  },
  created() {
    if (this.id === 9999) {
      this.isAverage = true;
    }
  },
  mounted() {
    let eAudioFeatures = document.getElementById("centroid" + this.id + "_features");
    eAudioFeatures.style.transitionDuration = "1.0s, 0.5s";
    eAudioFeatures.style.transitionTimingFunction = "ease-in-out";
    eAudioFeatures.style.transitionDelay = "0.0s, 0.5s";
    eAudioFeatures.classList.add('displayed_audio_features');

    let eCentroid = document.getElementById("centroid" + this.id);
    eCentroid.style.borderColor = this.color;
  }
}
</script>

<style scoped>
.centroid {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 1rem 1rem 1.8rem 1rem;
  margin: 0.5rem;
  font-size: 1.3rem;
  text-align: left;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.1rem solid;
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
</style>
