import { ref, computed } from "vue";
import { fetchNewsByCategory } from "@/services/news";
import { getList, saveItem, removeItem } from "@/utils/localstorage";

const news = ref([]);
const savedNews = ref([]);
const pagination = ref({
  pages: 0,
  currentPage: 0
});

export function useNews() {
  const loading = ref(false);
  const error = ref(null);

  const getNewsByCategory = async (category, page) => {
    loading.value = true;
    try {
      getSavedNews();

      const res = await fetchNewsByCategory(category, page);

      mapWithSaved(res.results);

      pagination.value.pages = res.pages;
      pagination.value.currentPage = res.currentPage;

      error.value = null;
    } catch (err) {
      error.value = "Something went wrong. Please, try again later.";
    }

    loading.value = false;
  };

  const mapWithSaved = (newsItems) => {
    news.value = newsItems.map((item) => ({
      ...item,
      isSaved: savedNews.value.some((savedItem) => savedItem.id === item.id)
    }));
  };

  const getSavedNews = () => {
    savedNews.value = getList();
  };

  const saveNewsItem = (item) => {
    const isDuplicate = getList().some((newsItem) => newsItem.id === item.id);
    if (isDuplicate) return;

    saveItem({ ...item, isSaved: true });
    savedNews.value = getList();

    mapWithSaved(news.value);
  };

  const unsaveNewsItem = (id) => {
    removeItem(id);
    savedNews.value = getList();

    mapWithSaved(news.value);
  };

  return {
    news: computed(() => news.value),
    getNewsByCategory,
    loading,
    error,
    pagination: computed(() => pagination.value),
    savedNews: computed(() => savedNews.value),
    saveNewsItem,
    unsaveNewsItem,
    getSavedNews
  };
}
