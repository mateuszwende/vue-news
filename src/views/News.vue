<template>
  <h1>News</h1>
  <section class="utils">
    <div class="segregation">
      <CategoryList
        :categories="categories"
        :active-category="category"
        @choose-category="chooseCategory"
      />
      <Search @on-change="search" :initialQuery="searchQuery" />
    </div>

    <Button @click="refresh" :type="`info`">Refresh</Button>
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
import Search from "@/components/Search.vue";
import { categories } from "@/constants";
import { useNews } from "@/composables/useNews";

export default {
  name: "News",
  components: { NewsList, CategoryList, Button, Pagination, Search },
  props: {
    category: String
  },
  setup(props) {
    const { category } = toRefs(props);

    const {
      news,
      getNews,
      loading,
      error,
      pagination,
      searchQuery
    } = useNews();

    onMounted(() =>
      news.value.length ? null : getNews({ category: category?.value, page: 1 })
    );

    watch(category, () =>
      getNews({ category: category?.value, page: 1, q: searchQuery.value })
    );

    return {
      news,
      getNews,
      pagination,
      searchQuery,
      loading,
      error,
      categories
    };
  },
  methods: {
    choosePage(page) {
      this.getNews({
        category: this.category?.value,
        page,
        q: this.searchQuery.value
      });
    },
    chooseCategory(category) {
      this.$router.push(`/news/${category}`);
    },
    refresh() {
      this.getNews({
        category: this.category?.value,
        q: this.searchQuery.value
      });
    },
    search(q) {
      this.getNews({ category: this.category?.value, q });
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
  gap: 0.5rem 2rem;
}

.segregation {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 2rem;
}

.pagination {
  margin: 0 auto;
}
</style>
