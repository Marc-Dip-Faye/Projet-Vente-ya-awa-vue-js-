import { createApp } from 'vue'
import '../src/assets/main.css'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
      app.use(createPinia())
      app.mount('#app')
