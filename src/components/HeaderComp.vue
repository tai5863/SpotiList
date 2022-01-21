<template>
  <div class="header">
    <h1>SpotiList</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "HeaderComp",
  props: {
    message: String,
  },
};
</script>

<style scoped>
.header {
  margin: 2rem;
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
h1 {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen;
  animation: show 0.6s both;
  font-size: 40px;
}
p {
  font-family: "游ゴシック", "Yu Gothic", "游ゴシック体", YuGothic, sans-serif;
  animation: show 0.6s both;
  font-weight: 1000;
  font-size: 15px;
}
</style>
