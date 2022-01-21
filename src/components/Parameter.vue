<template>
  <div class="parameter">
    <p class="param_name">{{ paramName }}</p>
    <div class="bar_container">
      <div class="bar part" :id="'bar_' + paramName" :style="barWidth"></div>
      <div class="bar hole"></div>
    </div>
    <p class="value + paramName">{{ value }}</p>
  </div>
</template>

<script>
export default {
  name: 'Parameter',
  props: {
    paramName: String,
    value: Number,
    min: Number,
    max: Number
  },
  data() {
    return {
      bar: null
    }
  },
  mounted() {
    this.bar = document.getElementById('bar_' + this.paramName);
  },
  computed: {
    barWidth() {
      return { '--bar-width': Math.abs(this.value) / Math.max(Math.abs(this.min), Math.abs(this.max)) * 200 + 'px' }
    },
  }
}
</script>

<style scoped>
.parameter {
  display: flex;
  align-items: center;
  justify-content: left;
}
.param_name {
  width: 160px;
  font-size: 1.2rem;
  margin: 0;
}
.bar {
  max-width: var(--bar-width);
  color: white;
  padding: 0.5rem 0;
  background: white;
  opacity: 1.0;
}
.part {
  animation: bar-animation 1 2s;
}
@keyframes bar-animation {
  0%{
    width: 0px;
  }
  100%{
    width: var(--bar-width);
  }
}
.hole {
  width: 200px;
  padding: 0.01rem 0.5rem;
  opacity: 1;
}
.value {
  font-size: 1.0rem;
  margin: 0 0 0 1rem;
  opacity: 0.6;
}
</style>
