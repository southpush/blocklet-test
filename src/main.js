import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';

import "virtual:windi.css";
import "./styles/common.css"

import { router } from './routes'

import directives from './directives'


const app = createApp(App);
app.use(router)

const pinia = createPinia()
app.use(pinia)

for (const key in directives) {
    app.directive(key, directives[key])
}
app.mount('#app');
