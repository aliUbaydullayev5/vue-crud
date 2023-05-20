import { createRouter, createWebHistory } from 'vue-router';
import mainPage from "pages/mainPage.vue"

const routes = [
  {
    path: '/',
    name: 'main',
    component: mainPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
