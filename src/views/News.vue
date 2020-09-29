<template>
  <h1>News</h1>
  <section class="utils">
    <div class="segregation">
      <CategoryList
        :categories="categories"
        :active-category="category"
        @choose-category="chooseCategory"
      />
      <Search @on-change="searchNews" :initial-value="search" />
    </div>

    <Button @click="fetchNews" :type="`info`">Refresh</Button>
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
    category: String,
    search: String,
    page: String
  },
  setup(props) {
    const { category, search, page } = toRefs(props);

    const { news, getNews, loading, error, pagination } = useNews();

    const fetchNews = () =>
      getNews({
        category: category?.value,
        search: search?.value,
        page: page?.value
      });

    onMounted(fetchNews);

    watch([category, search, page], () => fetchNews());

    return {
      news,
      fetchNews,
      loading,
      error,
      pagination,
      categories
    };
  },
  methods: {
    choosePage(page) {
      this.goTo(this.category, { search: this.search, page });
    },
    chooseCategory(category) {
      this.goTo(category, { search: this.search, page: 1 });
    },
    searchNews(search) {
      this.goTo(this.category, { search, page: 1 });
    },
    goTo(category, query) {
      this.$router.push({
        name: "news",
        params: { ...(category && { category }) },
        query: {
          ...(query.search && { search: query.search }),
          ...(query.page && { page: query.page })
        }
      });
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
