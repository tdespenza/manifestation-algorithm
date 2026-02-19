import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import DashboardView from '../views/DashboardView.vue';
import CategoryDetailView from '../views/CategoryDetailView.vue';
import SettingsView from '../views/SettingsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/category/:id',
      name: 'CategoryDetail',
      component: CategoryDetailView,
      props: true
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    }
  ]
});

export default router;
