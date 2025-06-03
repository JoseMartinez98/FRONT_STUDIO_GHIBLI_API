<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['buscar'])

const terminoBusqueda = ref('')

watch(terminoBusqueda, (nuevoValor) => {
  emit('buscar', nuevoValor.trim().toLowerCase())
})
</script>

<template>
  <div class="barra-busqueda">
    <input
      v-model="terminoBusqueda"
      type="text"
      placeholder="Buscar película por nombre..."
    />
  </div>
</template>

<style scoped>
.barra-busqueda {
  text-align: center;
  margin-top: 40px;
}
.barra-busqueda input {
  padding: 10px;
  width: 300px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
</style>
