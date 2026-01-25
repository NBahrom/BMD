import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { i18n, bootstrap } from './i18n'


const app = createApp(App)

app.use(router)

bootstrap()

app.use(i18n)

app.use(createPinia())

app.mount('#app')
