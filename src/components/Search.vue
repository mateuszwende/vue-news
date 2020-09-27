<template>
  <section class="search">
    <input v-model="searchQuery" placeholder="Search..." />
  </section>
</template>

<script>
import { debounce } from "@/utils/debounce";

export default {
  name: "Search",
  props: {
    initialQuery: {
      type: String
    }
  },
  data() {
    return {
      searchQuery: this.initialQuery || ""
    };
  },
  watch: {
    searchQuery: function() {
      this.fireOnChange();
    }
  },
  methods: {
    fireOnChange: debounce(function() {
      this.$emit("on-change", this.searchQuery);
    }, 500)
  }
};
</script>

<style scoped lang="scss">
input {
  padding: 0.4rem 1rem;
  border: 0;
  border-radius: 0.2rem;
}
</style>
