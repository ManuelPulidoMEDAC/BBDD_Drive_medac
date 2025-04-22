<template>
  <!-- Contenedor principal con el título y los selectores -->
  <div class="container">
    <h1>Selecciona tu ciclo, curso y asignatura</h1>

    <!-- Contenedor de los selectores de ciclo, curso y asignatura -->
    <div class="selectors">
      <!-- Selector de ciclo -->
      <div class="dropdown">
        <label for="ciclo">Ciclo</label>
        <select
          v-model="selectedCiclo"
          @change="loadCursos"
        >
          <option
            value=""
            disabled
          >
            Selecciona un ciclo
          </option>
          <option
            v-for="ciclo in ciclos"
            :key="ciclo.id"
            :value="ciclo.id"
          >
            {{ ciclo.nombre }}
          </option>
        </select>
      </div>

      <!-- Selector de curso que se muestra solo si hay cursos disponibles -->
      <div
        v-if="cursos.length > 0"
        class="dropdown"
      >
        <label for="curso">Curso</label>
        <select
          v-model="selectedCurso"
          @change="loadAsignaturas"
        >
          <option
            value=""
            disabled
          >
            Selecciona un curso
          </option>
          <option
            v-for="curso in cursos"
            :key="curso.id"
            :value="curso.id"
          >
            {{ curso.nombre }}
          </option>
        </select>
      </div>

      <!-- Selector de asignatura que se muestra solo si hay asignaturas disponibles -->
      <div
        v-if="asignaturas.length > 0"
        class="dropdown"
      >
        <label for="asignatura">Asignatura</label>
        <select
          v-model="selectedAsignatura"
          @change="loadRecursos"
        >
          <option
            value=""
            disabled
          >
            Selecciona una asignatura
          </option>
          <option
            v-for="asignatura in asignaturas"
            :key="asignatura.id"
            :value="asignatura.id"
          >
            {{ asignatura.nombre }}
          </option>
        </select>
      </div>
    </div>

    <!-- Listado de recursos que se muestra solo si hay recursos disponibles -->
    <div
      v-if="recursos.length > 0"
      class="resources"
    >
      <h2>Recursos</h2>
      <ul>
        <li
          v-for="recurso in recursos"
          :key="recurso.id"
        >
          <div>
            <strong>{{ recurso.titulo }}</strong><br>
            <span>{{ recurso.tipo }}</span><br>
            <a
              :href="recurso.enlace_url"
              target="_blank"
            >Ver recurso</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// Importación de las funcionalidades necesarias de Vue
import { ref } from 'vue'

// Variables reactivas para almacenar los datos
const ciclos = ref([]) // Lista de ciclos
const cursos = ref([]) // Lista de cursos
const asignaturas = ref([]) // Lista de asignaturas
const recursos = ref([]) // Lista de recursos

// Variables para almacenar las selecciones del usuario
const selectedCiclo = ref(null)
const selectedCurso = ref(null)
const selectedAsignatura = ref(null)

// Función para cargar los ciclos (Simulación por ahora)
async function loadCiclos () {
  ciclos.value = [
    { id: 1, nombre: 'DAM' },
    { id: 2, nombre: 'DAW' }
  ]
}

// Función para cargar los cursos en función del ciclo seleccionado
async function loadCursos () {
  if (!selectedCiclo.value) return
  cursos.value = selectedCiclo.value === 1
    ? [{ id: 1, nombre: '1o' }, { id: 2, nombre: '2o' }]
    : [{ id: 3, nombre: '1o' }, { id: 4, nombre: '2o' }]
}

// Función para cargar las asignaturas en función del curso seleccionado
async function loadAsignaturas () {
  if (!selectedCurso.value) return
  asignaturas.value = selectedCurso.value === 1
    ? [{ id: 1, nombre: 'Lenguaje de Marcas' }, { id: 2, nombre: 'Programación' }]
    : [{ id: 3, nombre: 'Bases de Datos' }, { id: 4, nombre: 'Redes' }]
}

// Función para cargar los recursos en función de la asignatura seleccionada
async function loadRecursos () {
  if (!selectedAsignatura.value) return
  recursos.value = [
    { id: 1, titulo: 'Tutorial de Vue', tipo: 'video', enlace_url: 'https://vuejs.org' },
    { id: 2, titulo: 'Guía de Git', tipo: 'documento', enlace_url: 'https://git-scm.com' }
  ]
}

// Cargar los ciclos al inicializar el componente
loadCiclos()
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  background-color: #f7fafc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 36px;
  color: #2d3748;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
}

.selectors {
  width: 100%;
  margin-bottom: 24px;
}

.dropdown {
  margin-bottom: 20px;
}

label {
  font-size: 18px;
  color: #4a5568;
  margin-bottom: 8px;
  font-weight: 600;
  display: block;
  font-family: 'Roboto', sans-serif;
}

select {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  color: #2d3748;
  background-color: #fff;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  transition: border-color 0.3s, box-shadow 0.3s;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  font-family: 'Roboto', sans-serif;
}

select:focus {
  border-color: #3182ce;
  box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.2);
  outline: none;
}

.resources {
  margin-top: 30px;
  width: 100%;
}

.resources h2 {
  font-size: 28px;
  color: #2d3748;
  margin-bottom: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
}

.resources ul {
  list-style-type: none;
  padding: 0;
}

.resources li {
  background-color: #fff;
  margin: 12px 0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.resources li:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.resources li div {
  font-size: 16px;
  color: #4a5568;
  font-family: 'Roboto', sans-serif;
}

.resources li strong {
  font-weight: 700;
  font-size: 18px;
  color: #2b6cb0;
}

.resources span {
  font-style: italic;
  color: #718096;
  margin-top: 5px;
  display: inline-block;
}

.resources a {
  display: inline-block;
  margin-top: 12px;
  font-size: 16px;
  color: #3182ce;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.resources a:hover {
  color: #2b6cb0;
  text-decoration: underline;
}
</style>
