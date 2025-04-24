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
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

:root {
  --primary-color: #4F46E5;
  --secondary-color: #6366F1;
  --background-blur: rgba(255, 255, 255, 0.6);
  --border-color: rgba(255, 255, 255, 0.3);
  --text-color: #1f2937;
  --shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.container {
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  max-width: 960px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f0f4ff, #ffffff);
  border-radius: 16px;
  box-shadow: var(--shadow);
  animation: fadeIn 1s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

h1 {
  font-size: 36px;
  color: var(--primary-color);
  font-weight: 700;
  margin-bottom: 32px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.selectors {
  width: 100%;
  margin-bottom: 32px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.dropdown {
  backdrop-filter: blur(8px);
  background: var(--background-blur);
  border: 1px solid var(--border-color);
  padding: 16px;
  border-radius: 12px;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.dropdown:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

label {
  font-size: 16px;
  color: var(--text-color);
  margin-bottom: 8px;
  font-weight: 600;
  display: block;
}

select {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  color: var(--text-color);
  background-color: #fff;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

select:focus {
  border-color: var(--secondary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
  outline: none;
}

.resources {
  margin-top: 40px;
  width: 100%;
}

.resources h2 {
  font-size: 28px;
  color: var(--primary-color);
  margin-bottom: 24px;
  font-weight: 700;
  text-align: center;
  position: relative;
  z-index: 1;
}

.resources ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.resources li {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 24px;
  border-radius: 16px;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(4px);
  animation: fadeInUp 0.8s ease;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.resources li:hover {
  transform: scale(1.03);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

.resources li div {
  font-size: 16px;
  color: var(--text-color);
}

.resources li strong {
  font-weight: 700;
  font-size: 18px;
  color: var(--primary-color);
}

.resources span {
  font-style: italic;
  color: #6b7280;
  margin-top: 5px;
  display: inline-block;
}

.resources a {
  display: inline-block;
  margin-top: 12px;
  font-size: 16px;
  color: var(--secondary-color);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.resources a:hover {
  color: var(--primary-color);
  text-decoration: underline;
}
</style>
