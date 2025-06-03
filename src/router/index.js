import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import PeliculasList from '@/components/PeliculasList.vue'
import PeliculaDetalle from '@/components/PeliculaDetalle.vue'

const routes = [
 {
    path: '/',
    name: 'PeliculasList',
    component: PeliculasList
  },
  {
    path: '/pelicula/:id',
    name: 'PeliculaDetalle',
    component: PeliculaDetalle,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Mi Biblioteca Online'
})

export default router
