import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Register from '@/pages/register'
import ResetPassword from '@/pages/reset_password'
import Home from '@/pages/home'
import Detail from '@/pages/detail'
import Listing from '@/pages/listing'
import Berita from '@/pages/berita'
import BeritaDetail from '@/pages/berita-detail'
import About from '@/pages/about'
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
      path: '/disewa',
      component: Listing
    },
    {
      path: '/listing/detail/:id',
      component: Detail
    },
    {
      path: '/berita',
      component: Berita
    },
    {
      path: '/berita-detail/:permalink',
      component: BeritaDetail
    },
    {
      path: '/about/:permalink',
      component: About
    },

    {
      path: '/profile',
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
