import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login';

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({store}) => {
    store.router = markRaw(router)
})
app.provide("baseUrl", "https://violet-fear-production.up.railway.app");
app.use(vue3GoogleLogin, {
    clientId:
      '842533811382-tsqgej0vciis8f5msgsv09jf3fglvqi7.apps.googleusercontent.com',
});

app.use(pinia)
app.use(router)

app.mount('#app')
