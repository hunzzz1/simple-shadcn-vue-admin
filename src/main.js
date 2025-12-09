import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import setupRouter from '@/router'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const router = setupRouter()
const app = createApp(App)


const options = {
    // You can set your default options here
};

app.use(Toast, options);
app.use(createPinia())
app.use(router)

app.mount('#app')
