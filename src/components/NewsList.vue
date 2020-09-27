<template>
  <section v-if="loading"><p>Loading...</p></section>
  <section v-else-if="error">
    <p>{{ error }}</p>
  </section>
  <section v-else-if="news.length" class="list">
    <NewsItem
      v-for="newsItem in news"
      :key="newsItem.id"
      :item="newsItem"
      @save="saveNewsItem(newsItem)"
      @unsave="unsaveNewsItem(newsItem.id)"
    />
  </section>
  <section v-else><p>There is no data.</p></section>
</template>

<script>
import NewsItem from "@/components/NewsItem.vue";
import { useNews } from "@/composables/useNews";

export default {
  name: "NewsList",
  components: { NewsItem },
  props: {
    news: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    error: {
      type: String
    }
  },
  setup() {
    const { saveNewsItem, unsaveNewsItem } = useNews();

    return {
      saveNewsItem,
      unsaveNewsItem
    };
  }
};
</script>

<style scoped lang="scss">
.list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;

  @include screen-min-xs() {
    width: calc(100% + 2rem);
    margin: 0 -1rem;
  }
}

.item {
  flex: 0 0 100%;
  margin-bottom: 2rem;

  @include screen-min-xs() {
    flex: 0 0 calc(50% - 2rem);
    margin: 0 1rem 2rem 1rem;
  }

  @include screen-min-sm() {
    flex: 0 0 calc(33.333333% - 2rem);
  }
}

p {
  text-align: left;
}
</style>
