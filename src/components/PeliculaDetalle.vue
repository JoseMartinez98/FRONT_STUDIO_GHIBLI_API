<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const pelicula = ref(null)
const route = useRoute()
const router = useRouter()
const id = route.params.id

onMounted(async () => {
  try {
    const response = await axios.get(`/api/peliculas/${id}`)
    pelicula.value = response.data
  } catch (error) {
    console.error('Error al cargar la película:', error)
  }
})

function volver() {
  router.push({ name: 'PeliculasList' })
}
function convertirYoutubeEmbed(url) {
  const videoId = new URLSearchParams(url.split('?')[1]).get('v');
  return `https://www.youtube.com/embed/${videoId}`;
}
const redSeleccionada = ref('')

function compartir() {
  if (!pelicula.value || !redSeleccionada.value) return

  const urlActual = window.location.href
  const titulo = encodeURIComponent(`¡Mira esta película: ${pelicula.value.primaryTitle}!`)
  const urlCompartida = encodeURIComponent(urlActual)

  let url = ''
  switch (redSeleccionada.value) {
    case 'facebook':
      url = `https://www.facebook.com/sharer/sharer.php?u=${urlCompartida}`
      break
    case 'twitter':
      url = `https://twitter.com/intent/tweet?text=${titulo}&url=${urlCompartida}`
      break
    case 'whatsapp':
      url = `https://wa.me/?text=${titulo}%20${urlCompartida}`
      break
  }

  if (url) {
    window.open(url, '_blank')
  }
}

</script>

<template>
  <button @click="volver" class="volver-btn">← Volver</button>
    <div class="pelicula-detalle" v-if="pelicula">
      <div class="contenido">
        <div class="imagen">
          <img :src="pelicula.image" alt="Imagen de la película" />
        </div>
        <div class="info">
          <h1>{{ pelicula.primaryTitle }}</h1>
          <p><strong>👤 DIRECTOR:</strong> {{ pelicula.director }} </p>
          <p><strong>🎬 PRODUCER:</strong> {{ pelicula.producer }} </p>
          <p><strong>⏳ DURATION:</strong> {{ pelicula.running_time }} min </p>
          <p><strong>⭐️ PUNCTUATION:</strong> {{ pelicula.rt_score }} / 100 </p>
          <p><strong>🗓️ RELEASE DATE:</strong> {{ pelicula.releaseDate }} </p>
          <p><strong>💬 DESCRIPTION:</strong> {{ pelicula.description }} </p>
        </div>
      </div>
      <div v-if="pelicula.trailerUrl" class="trailer">
        <iframe
          :src="convertirYoutubeEmbed(pelicula.trailerUrl)"
          width="560"
          height="315"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div v-if="pelicula" class="compartir">
        <h3>📤 Share this movie:</h3>
        <select v-model="redSeleccionada">
          <option disabled value="">Choose a social network</option>
          <option value="facebook">Facebook</option>
          <option value="twitter">Twitter</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
        <button @click="compartir">Share</button>
      </div>

    </div>
    <div v-else>
      <p>Charging...</p>
  </div>
</template>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}
h3{
  color: #000;
}
.pelicula-detalle {
  width: 100%;
  justify-content: center;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
}

.volver-btn {
  border: solid 2px black;
  border-radius: 8px;
  background-color:  rgba(154,50,75,255);
  color: rgb(220, 220, 199);
  box-shadow: 0px 0px 8px black;
  transition: 0.2s;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  margin: 40px;
  margin-left: 100px;
  padding: 5px 10px;
  transition: color 0.2s ease;
}

.volver-btn:hover{
  cursor: pointer;
  color:  rgb(220, 220, 199);
  background-color: black;
}
.ordenar:active{
 scale: 1.1;
}

.contenido {
  display: flex;
  flex-wrap: wrap;
  gap: 40px; 
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  width: 100%;
  align-items: flex-start;
}

.imagen {
  flex: 1;
  min-width: 45%;
  display: flex;
  justify-content: center;
}

.imagen img {
  width: 100%;
  max-width: 380px;
  border-radius: 8px;
  box-shadow: 0 0 20px #000;
}

.info {
  color: white;
  flex: 2;
  min-width: 45%;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: #0000006d;
  border-radius: 8px;
  box-shadow: 0 0 20px #000;

}
iframe{
  border-radius: 20px;
  width: 60%;
}
.trailer{
 width: 100%;
 height: auto;
 display: flex;
 justify-content: center;
 margin-top: 80px;
 margin-bottom: 80px;
}
.compartir {
  margin: 40px auto;
  max-width: 400px;
  text-align: center;
  color: white;
}

.compartir select,
.compartir button {
  margin: 10px;
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
}

.compartir button {
  background-color: #9a324b;
  color: #fff;
  cursor: pointer;
  box-shadow: 0px 0px 6px black;
  font-weight: bold;
}

.compartir button:hover {
  background-color: black;
}

/* Tablets */
@media (max-width: 900px) {
  .contenido {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .info {
    font-size: 18px;
  }

  .volver-btn {
    font-size: 18px;
    margin: 40px;
  }
}

/* Móviles */
@media (max-width: 600px) {
  .pelicula-detalle{
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .imagen{
    max-width: 340px;
  }
  .info{
    max-width: 340px;
  }
  iframe{
    max-width: 340px;
  }
  .imagen img {
    max-width: 100%;
  }

  .info {
    font-size: 16px;
    padding: 0 10px;
  }

  .volver-btn {
    font-size: 16px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    text-align: center;
  }
}
</style>
