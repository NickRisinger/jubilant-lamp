import ElementPlus from 'element-plus';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';

import '@/index.css';
import 'element-plus/dist/index.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(ElementPlus);
app.mount('#app');
