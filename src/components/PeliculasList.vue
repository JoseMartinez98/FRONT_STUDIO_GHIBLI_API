<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const peliculas = ref([])
const router = useRouter()

const obtenerPeliculas = async (orden = null) => {
  try {
    let url = orden
      ? `http://localhost:8080/peliculas?orden=${orden}`
      : '/api/peliculas'

    const response = await axios.get(url)
    peliculas.value = response.data
  } catch (error) {
    console.error('Error al cargar las películas:', error)
  }
}
const ordenarPorFecha = (orden = 'asc') => {
  obtenerPeliculasDesdeFecha(orden)
}

const obtenerPeliculasDesdeFecha = async (orden) => {
  try {
    const response = await axios.get(`http://localhost:8080/peliculas/fecha?orden=${orden}`)
    peliculas.value = response.data
  } catch (error) {
    console.error('Error al ordenar por fecha:', error)
  }
}



onMounted(() => {
  obtenerPeliculas()
})

function irADetalle(id) {
  router.push({ name: 'PeliculaDetalle', params: { id } })
}

const ordenarAsc = () => obtenerPeliculas('asc')
const ordenarDesc = () => obtenerPeliculas('desc')
</script>


<template>
  <div class="principal">
    <button class="ordenar" @click="ordenarAsc">Title A-Z</button>
    <button class="ordenar" @click="ordenarDesc">Title Z-A</button>
    <button class="ordenar" @click="ordenarPorFecha('asc')"> Year ↑</button>
    <button class="ordenar" @click="ordenarPorFecha('desc')"> Year ↓</button>


 </div> 
  <div class="GrupoPeliculas">
    <div v-for="pelicula in peliculas" :key="pelicula.id" class="pelicula" @click="irADetalle(pelicula.id)" style="cursor:pointer;">
      <img :src="pelicula.image" alt="Imagen de la película" v-if="pelicula.image" />
      <h2>{{ pelicula.primaryTitle }}</h2>
      <h2> {{ pelicula.releaseDate }}</h2>
    </div>
  </div>

</template>

<style scoped>
.principal{
  margin: 40px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
}
.ordenar{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px; 
  font-size: 18px;
  margin: 20px;
  padding: 10px;
  height: 40px;
  width: 120px;
  border: solid 2px black;
  border-radius: 8px;
  background-color:  rgba(154,50,75,255);
  color: rgb(220, 220, 199);
  box-shadow: 0px 0px 8px black;
  transition: 0.2s;
}
.ordenar:hover{
  cursor: pointer;
  color:  rgb(220, 220, 199);
  background-color: black;
}
.ordenar:active{
 scale: 1.1;
}

.GrupoPeliculas{
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px; 
  margin-left: auto;
  margin-right: auto;
}
.pelicula {
  font-size: 10px;
  text-align: center;
  width: 250px;
}
.pelicula img {
  border-radius: 8px;
  width: 100%;
  height: auto;
  box-shadow: 0px 0px 15px #000;
}

/* Tablets */
@media (max-width: 900px) {
 .GrupoPeliculas img {
    max-width: 100%;
  } 
}
/* Móviles */
@media (max-width: 600px) {
  .GrupoPeliculas img {
    max-width: 100%;
    height: auto;
  }
}
</style>
