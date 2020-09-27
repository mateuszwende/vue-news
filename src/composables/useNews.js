import { ref, computed } from "vue";
import { fetchNews } from "@/services/news";
import { getList, saveItem, removeItem } from "@/utils/localstorage";
import { categories } from "@/constants";

const news = ref([]);
const savedNews = ref([]);
const pagination = ref({
  pages: 0,
  currentPage: 0
});
const searchQuery = ref("");

export function useNews() {
  const loading = ref(false);
  const error = ref(null);

  const getNews = async ({ category, q = searchQuery.value, page = 1 }) => {
    loading.value = true;
    try {
      getSavedNews();

      const res = await fetchNews({
        section: category || categories.join("|"),
        q,
        page
      });

      mapWithSaved(res.results);

      pagination.value.pages = res.pages;
      pagination.value.currentPage = res.currentPage;

      searchQuery.value = q;

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

  const getSavedNews = (category) => {
    savedNews.value = category
      ? getList().filter((newsItem) => newsItem.sectionId === category)
      : getList();
  };

  const saveNewsItem = (item) => {
    const isDuplicate = getList().some((newsItem) => newsItem.id === item.id);
    if (isDuplicate) return;

    saveItem({ ...item, isSaved: true });
    savedNews.value = [...savedNews.value, item];

    mapWithSaved(news.value);
  };

  const unsaveNewsItem = (id) => {
    removeItem(id);
    savedNews.value = savedNews.value.filter((newsItem) => newsItem.id !== id);

    mapWithSaved(news.value);
  };

  return {
    news: computed(() => news.value),
    getNews,
    loading,
    error,
    pagination: computed(() => pagination.value),
    savedNews: computed(() => savedNews.value),
    getSavedNews,
    searchQuery,
    saveNewsItem,
    unsaveNewsItem
  };
}
