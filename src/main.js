import './assets/main.css'
import './assets/page.css'
import './assets/form.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { init_store } from './stores'

const app = createApp(App)

app.use(router)

app.mount('#app')

init_store()