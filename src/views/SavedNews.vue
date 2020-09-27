<template>
  <h1>Saved news</h1>
  <CategoryList
    :categories="categories"
    :active-category="category"
    @choose-category="chooseCategory"
  />
  <NewsList :news="savedNews" :loading="false" :error="null" />
</template>

<script>
import { onMounted, toRefs, watch } from "vue";
import CategoryList from "@/components/CategoryList.vue";
import NewsList from "@/components/NewsList.vue";
import { categories } from "@/constants";
import { useNews } from "@/composables/useNews";

export default {
  name: "SavedNews",
  components: { NewsList, CategoryList },
  props: {
    category: String
  },
  setup(props) {
    const { category } = toRefs(props);

    const { savedNews, getSavedNewsByCategory } = useNews();

    onMounted(() => getSavedNewsByCategory(category?.value));

    watch(category, () => getSavedNewsByCategory(category?.value));

    return {
      savedNews,
      categories
    };
  },
  methods: {
    chooseCategory(category) {
      this.$router.push(`/saved-news/${category}`);
    }
  }
};
</script>

<style scoped lang="scss">
h1 {
  text-align: left;
  margin: 0;
}
</style>
