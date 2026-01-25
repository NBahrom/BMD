import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { i18n, bootstrap } from './i18n'


async function start() {
  const app = createApp(App)

  app.use(router)
  app.use(createPinia())

  await bootstrap() 
  app.use(i18n)

  app.mount('#app')
}

start()