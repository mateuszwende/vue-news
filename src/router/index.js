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
    name: "News",
    component: News,
    props: true
  },
  {
    path: "/saved-news/:category?",
    name: "Saved News",
    component: SavedNews,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
