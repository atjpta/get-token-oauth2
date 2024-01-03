import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vue-toast-notification/dist/theme-bootstrap.css';
import GoogleSignInPlugin from "vue3-google-signin"

const valueClientIdGg = localStorage.getItem('ClientIdGg') ?? '';
const app = createApp(App)
app.use(GoogleSignInPlugin, {
    clientId: valueClientIdGg,
});
app.mount('#app')
