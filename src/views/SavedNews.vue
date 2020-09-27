<template>
  <h1>Saved news</h1>
  <NewsList :news="savedNews" :loading="false" :error="null" />
</template>

<script>
import { useNews } from "@/composables/useNews";
import NewsList from "@/components/NewsList.vue";
import { onMounted } from "vue";

export default {
  name: "SavedNews",
  components: { NewsList },
  setup() {
    const { savedNews, getSavedNews } = useNews();

    onMounted(getSavedNews);

    return {
      savedNews
    };
  }
};
</script>

<style scoped lang="scss">
h1 {
  text-align: left;
  margin: 0;
}
</style>
