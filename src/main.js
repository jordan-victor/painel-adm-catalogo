import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// import $ from 'jquery'
// import 'datatables.net-dt'
// import 'datatables.net-dt/css/jquery.dataTables.css'

// window.$ = $

createApp(App)
.use(router)
.mount('#app')
