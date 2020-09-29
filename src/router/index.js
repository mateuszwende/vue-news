import { createRouter, createWebHistory } from "vue-router";
import News from "../views/News.vue";
import SavedNews from "../views/SavedNews.vue";

const routes = [
  {
    path: "/",
    redirect: "/news"
  },
  {
    path: "/news/:category?",
    name: "news",
    component: News,
    props: (route) => ({
      category: route.params.category,
      search: route.query.search,
      page: route.query.page
    })
  },
  {
    path: "/saved-news/:category?",
    name: "saved-news",
    component: SavedNews,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
