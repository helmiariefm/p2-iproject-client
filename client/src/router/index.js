import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Buy from '../views/Buy.vue'
import Contact from '../views/Contact.vue'
import Login from '../views/Login.vue'
import InvitationForm from '../views/InvitationForm.vue'
import MainPage from '../views/invitations/MainPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/buy',
      name: 'buy',
      component: Buy
    },
    {
      path: '/contact',
      name:'contact',
      component: Contact
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/invitation-form',
      name: 'invitation-form',
      component: InvitationForm
    },
    {
      path: '/:invitationName',
      name: 'invitationName',
      component: MainPage
    } 
  ]
})

router.beforeEach((to, _, next) => {
  const isLogin = localStorage.access_token
  if(to.name == 'invitation-form' && !isLogin){
    next('/login')
  } else if(to.name == 'login' && isLogin){
    next('/')
  } else {
    next()
  }
})

export default router
