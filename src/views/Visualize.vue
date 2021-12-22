<template>
  <div id="visualize">
    <GetTracksInformation v-if="!needVisualize" :routeParams="routeParams" @get_audio_features="visualize" @get_favorites="setFavorites"></GetTracksInformation>
    <div id="song_container" v-if="needVisualize">
      <img :src="this.song.thumbnailUrl" alt="image" width="300" height="300"> 
      <div id="audio_features">
        <div class="title">
          <p class="song_name">{{ song.name }}</p>
          <p class="artist">{{ song.artist }}</p>
        </div>
        <visualize-individual :paramName="'Acousticness'" :value="song.acousticness" :min="0" :max="1" />
        <visualize-individual :paramName="'Danceability'" :value="song.danceability" :min="0" :max="1" />
        <visualize-individual :paramName="'Enegy'" :value="song.energy" :min="0" :max="1" />
        <visualize-individual :paramName="'Instrumentalness'" :value="song.instrumentalness" :min="0" :max="1" />
        <visualize-individual :paramName="'Liveness'" :value="song.liveness" :min="0" :max="1" />
        <visualize-individual :paramName="'Loudness'" :value="song.loudness" :min="-60" :max="0" />
        <visualize-individual :paramName="'Speechiness'" :value="song.speechiness" :min="0" :max="1" />
        <visualize-individual :paramName="'Valence'" :value="song.valence" :min="0" :max="1" />
        <!-- <p class="param">duration_ms: {{ song.duration_ms }}</p> -->
        <!-- <p class="param">key: {{ song.key }}</p> -->
        <!-- <p class="param">mode: {{ song.mode }}</p> -->
        <!-- <p class="param">tempo: {{ song.tempo }}</p> -->
        <!-- <p class="param">time_signature: {{ song.time_signature }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import GetTracksInformation from '@/components/GetTracksInformation.vue'
import VisualizeIndividual from '@/components/VisualizeIndividual.vue'

export default {
  name: 'Visualize',
  components: {
    GetTracksInformation,
    VisualizeIndividual
  },
  props: {
    routeParams: Object
  },
  data() {
    return {
      needVisualize: false,
      favorites: [],
      audioFeatures: [],
      song: {
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
  methods: {
    setFavorites(favorites) {
      this.favorites = favorites;
      this.song.name = this.favorites[0].track.name;
      this.song.artist = this.favorites[0].track.artists[0].name;
      this.song.thumbnailUrl = this.favorites[0].track.album.images[0].url;
    },
    visualize(audioFeatures) {
      this.audioFeatures = audioFeatures;
      this.song.acousticness = this.audioFeatures[0].acousticness;
      this.song.danceability = this.audioFeatures[0].danceability;
      this.song.acousticness = this.audioFeatures[0].acousticness;
      this.song.duration_ms = this.audioFeatures[0].duration_ms;
      this.song.energy = this.audioFeatures[0].energy;
      this.song.instrumentalness = this.audioFeatures[0].instrumentalness;
      this.song.key = this.audioFeatures[0].key;
      this.song.liveness = this.audioFeatures[0].liveness;
      this.song.loudness = this.audioFeatures[0].loudness;
      this.song.mode = this.audioFeatures[0].mode;
      this.song.speechiness = this.audioFeatures[0].speechiness;
      this.song.tempo = this.audioFeatures[0].tempo;
      this.song.time_signature = this.audioFeatures[0].time_signature;
      this.song.valence = this.audioFeatures[0].valence;

      this.needVisualize = true;
    }
  }
}
</script>

<style scoped>
#visualize {
  font-family: 'Abel', sans-serif;
  font-size: 1.3rem;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #ffffff;
}
#song_container {
  display: flex;
  align-items: center;
  justify-content: center;
}
#audio_features {
  display: inline-block;
  margin: 0 2rem;
}
img {
  width: 250px;
  height: 250px;
}
.title {
  height: 3rem;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  justify-content: left;
}
.song_name {
  font-size: 1.8rem;
}
.artist {
  margin: 0 1rem;
  font-size: 1.5rem;
  opacity: 0.5;
}
.param {
  margin: 0;
}
</style>
