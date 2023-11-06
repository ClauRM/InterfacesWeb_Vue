import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Formulario from '../components/Formulario.vue'
import Listado from '../components/Listado.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Formulario
    },
    {
      path: '/listado/:_nombre/:_apellido',
      name: 'listado',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Listado,
      props: true
    }
  ]
})

export default router
