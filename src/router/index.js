import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/page/home'
import Register from '@/components/page/register'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    }]
})
