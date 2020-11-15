
require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router'
Vue.use(VueRouter)
//router import
import {routes} from './routes'

const router = new VueRouter({
  routes,
  mode: 'history'

})

//import Helper User Class
import User from './Helpers/User';
window.User = User;

//Notification Helper
import Notification from './Helpers/Notification';
window.Notification = Notification;


//izitoast notification
import iziToast from 'izitoast'
window.iziToast = iziToast;




Vue.component('example-component', require('./components/ExampleComponent.vue').default);

const app = new Vue({
    el: '#app',
    router
});
