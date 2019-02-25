import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/page/home'
import Register from '@/components/page/register'
import Login from '@/components/page/login'
import Goods from '@/components/page/Goods'
import CategoryList from '@/components/page/CategoryList'

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
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/Goods',
      name: 'Goods',
      component: Goods
    }, {
      path: '/CategoryList',
      name: 'CategoryList',
      component: CategoryList
    },
  ]
})
