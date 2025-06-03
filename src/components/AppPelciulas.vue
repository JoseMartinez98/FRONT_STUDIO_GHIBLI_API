<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const peliculas = ref([])

onMounted(async () => {
  try {
const response = await axios.get('/api/peliculas')

    peliculas.value = response.data
    console.log('Películas:', response.data)

  } catch (error) {
    console.error('Error al cargar las películas:', error)
  }
})
</script>

<template>
  <div>
    <h1>Películas</h1>
    <div v-for="pelicula in peliculas" :key="pelicula.id" class="pelicula">
      <h2>{{ pelicula.primaryTitle }}</h2>
      <p><strong>Director:</strong> {{ pelicula.director }}</p>
      <p><strong>Fecha de Estreno:</strong> {{ pelicula.release_date }}</p>
      <p><strong>Descripción:</strong> {{ pelicula.description }}</p>
      <img :src="pelicula.image" alt="Imagen de la película" v-if="pelicula.image"/>
    </div>
  </div>
</template>

<style scoped>
.pelicula {
  display: flex;
}
div > img{
  border-radius: 8px;
  width: 200px;
  height: auto;
  box-shadow: 0px 0px 30px #000;
}
</style>
