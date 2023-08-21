import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ActivityView from '../views/ActivityView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import LoginView from '../views/Profile/LoginView.vue'
import AuthenticatedView from '../views/Profile/AuthenticatedView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/activity',
      name: 'activity',
      component: ActivityView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Match All',
      component: NotFoundView
    },
    {
      path: '/login',
      children: [
        {
          path: '',
          name: 'Login',
          component: LoginView,
        },
        {
          path: '/detail/:id?',
          name: 'Authenticated',
          component: AuthenticatedView,
        }
      ]
    }
  ]
})

export default router
