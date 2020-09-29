<template>
  <section class="search">
    <input
      :value="initialValue"
      @input="fireOnChange"
      placeholder="Search..."
    />
  </section>
</template>

<script>
import { debounce } from "@/utils/debounce";

export default {
  name: "Search",
  props: {
    initialValue: {
      type: String,
      default: ""
    }
  },
  methods: {
    fireOnChange: debounce(function(e) {
      this.$emit("on-change", e.target.value);
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
