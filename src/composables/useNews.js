import { ref, computed } from "vue";
import { fetchNews } from "@/services/news";
import { getList, saveItem, removeItem } from "@/utils/localstorage";
import { categories } from "@/constants";

const loading = ref(false);
const error = ref(null);
const news = ref([]);
const savedNews = ref([]);
const pagination = ref({
  pages: 0,
  currentPage: 0
});

export function useNews() {
  const getNews = async ({ category, search, page = 1 }) => {
    loading.value = true;
    try {
      getSavedNews();

      const res = await fetchNews({
        section: category || categories.join("|"),
        q: search,
        page: Number(page)
      });

      mapWithSaved(res.results);

      pagination.value = {
        pages: res.pages || 10,
        currentPage: res.currentPage || 1
      };

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
    savedNews: computed(() => savedNews.value),
    pagination: computed(() => pagination.value),
    loading,
    error,
    getNews,
    getSavedNews,
    saveNewsItem,
    unsaveNewsItem
  };
}
