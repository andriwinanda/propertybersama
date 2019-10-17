import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Register from '@/pages/register'
import ResetPassword from '@/pages/reset_password'
import Home from '@/pages/home'
import Detail from '@/pages/detail'
import Listing from '@/pages/listing'
import Artikel from '@/pages/artikel'
import BeritaProperti from '@/pages/berita-properti'

import Dashboard from '@/pages/dashboard'
import EditProfile from '@/pages/edit-profile'
import GantiPassword from '@/pages/ganti-password'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/reset-password',
      component: ResetPassword
    },
    {
      path: '/ganti-password',
      component: GantiPassword
    },
    {
      path: '/listing',
      component: Listing
    },
    {
      path: '/deals',
      component: Listing
    },
    {
      path: '/listing/detail/:id',
      component: Detail
    },
    {
      path: '/artikel',
      component: Artikel
    },
    {
      path: '/berita',
      component: BeritaProperti
    },

    {
      path: '/dashboard',
      component: Dashboard
    },
    {
      path: '/edit-profile',
      component: EditProfile
    },
  ],
  scrollBehavior () {
    return { x: 0, y: 0 };
  },
  mode: "history",

})

export default router;
