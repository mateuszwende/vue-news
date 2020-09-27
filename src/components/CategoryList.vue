<template>
  <section class="list">
    <Button
      v-for="(category, index) in categories"
      :key="index"
      :type="'accent'"
      :active="activeCategory === category"
      @click="$emit('choose-category', category)"
    >
      {{ category }}
    </Button>
  </section>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  name: "CategoryList",
  components: { Button },
  props: {
    categories: {
      type: Array,
      required: true
    },
    activeCategory: {
      type: String
    }
  }
};
</script>

<style scoped lang="scss">
.list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

button {
  margin-bottom: 0.5rem;
  margin-right: 1rem;
}
</style>
