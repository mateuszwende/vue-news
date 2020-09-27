<template>
  <Header />
  <main>
    <router-view />
  </main>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "App",
  components: { Header }
};
</script>

<style lang="scss">
#app {
  font-family: Abel, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $primary-text-color;
}

main {
  display: grid;
  grid-gap: 2rem;
  max-width: $max-width;
  width: calc(100% - 3rem);
  padding: 3rem 1.5rem;
  margin: 0 auto;
}
</style>
