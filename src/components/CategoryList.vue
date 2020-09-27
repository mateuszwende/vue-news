<template>
  <section class="list">
    <CategoryItem
      v-for="(category, index) in categories"
      :key="index"
      :category="category"
      :active="activeCategory === category"
      :choose-category="chooseCategory"
      @click="chooseCategory(category)"
    />
  </section>
</template>

<script>
import CategoryItem from "@/components/CategoryItem.vue";

export default {
  name: "CategoryList",
  components: { CategoryItem },
  props: {
    categories: {
      type: Array,
      required: true
    },
    activeCategory: {
      type: String
    }
  },
  methods: {
    chooseCategory(category) {
      this.$router.push(`/news/${category}`);
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
