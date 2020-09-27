<template>
  <h1>News</h1>
  <section class="utils">
    <CategoryList :categories="categories" :active-category="category" />
    <Button @click="getNewsByCategory(category)" :type="`info`">Refresh</Button>
  </section>
  <NewsList :news="news" :loading="loading" :error="error" />
</template>

<script>
import { toRefs, watch, onMounted } from "vue";
import Button from "@/components/Button.vue";
import NewsList from "@/components/NewsList.vue";
import CategoryList from "@/components/CategoryList.vue";
import { categories } from "@/constants";
import { useNews } from "@/composables/useNews";

export default {
  name: "News",
  components: { NewsList, CategoryList, Button },
  props: {
    category: String
  },
  setup(props) {
    const { category } = toRefs(props);

    const { news, getNewsByCategory, loading, error } = useNews();

    onMounted(() =>
      news.value.length ? null : getNewsByCategory(category.value)
    );

    watch(category, getNewsByCategory);

    return {
      news,
      getNewsByCategory,
      loading,
      error,
      categories
    };
  }
};
</script>

<style scoped lang="scss">
h1 {
  text-align: left;
  margin: 0;
}

.utils {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
</style>
