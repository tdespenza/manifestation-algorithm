import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { i18n } from './i18n';
import './assets/main.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(i18n);

// Global error handler — prevents uncaught component errors from crashing the whole app
app.config.errorHandler = (err, _instance, info) => {
  console.error('[Vue error]', info, err);
};

// Global window error handler
window.addEventListener('error', event => {
  console.error('[Window error]', event.error || event.message);
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', event => {
  console.error('[Unhandled promise rejection]', event.reason);
});

app.mount('#app');
