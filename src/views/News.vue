<template>
  <h1>News</h1>
  <section class="utils">
    <CategoryList :categories="categories" :active-category="category" />
    <Button @click="getNewsByCategory(category)" :type="`info`">Refresh</Button>
  </section>
  <NewsList :news="news" :loading="loading" :error="error" />
  <Pagination
    class="pagination"
    :maxPages="pagination.pages"
    :currentPage="pagination.currentPage"
    @choose-page="choosePage"
  />
</template>

<script>
import { toRefs, watch, onMounted } from "vue";
import Button from "@/components/Button.vue";
import NewsList from "@/components/NewsList.vue";
import CategoryList from "@/components/CategoryList.vue";
import Pagination from "@/components/Pagination.vue";
import { categories } from "@/constants";
import { useNews } from "@/composables/useNews";

export default {
  name: "News",
  components: { NewsList, CategoryList, Button, Pagination },
  props: {
    category: String
  },
  setup(props) {
    const { category } = toRefs(props);

    const { news, getNewsByCategory, loading, error, pagination } = useNews();

    onMounted(() =>
      news.value.length ? null : getNewsByCategory(category?.value)
    );

    watch(category, () => getNewsByCategory(category?.value));

    return {
      news,
      getNewsByCategory,
      pagination,
      loading,
      error,
      categories
    };
  },
  methods: {
    choosePage(page) {
      this.getNewsByCategory(this.category, page);
    }
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

.pagination {
  margin: 0 auto;
}
</style>
