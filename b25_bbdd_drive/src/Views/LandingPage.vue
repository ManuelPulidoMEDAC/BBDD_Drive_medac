<template>
  <div class="background">
    <div class="container">
      <h1>Selecciona tu ciclo, curso y asignatura</h1>

      <!-- Menú hamburguesa -->
      <div class="menu-container">
        <div
          class="burger"
          @click="toggleMenu"
        >
          ☰
        </div>

        <transition name="slide">
          <nav
            v-if="menuOpen"
            class="menu"
          >
            <div class="user-info">
              <img
                :src="userImage"
                alt="Avatar"
                class="avatar"
              >
              <p class="username">
                {{ user?.email || 'Usuario' }}
              </p>
            </div>

            <ul>
              <li
                class="logout"
                @click="logout"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-log-out"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line
                      x1="21"
                      y1="12"
                      x2="9"
                      y2="12"
                    />
                  </svg>
                  LogOut
                </span>
              </li>

              <!-- ✅ Panel Admin visible si isAdmin es true -->
              <li
                v-if="isAdmin"
                class="admin-panel"
                @click="adminModalOpen = true"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-settings"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                    />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                  Panel Admin
                </span>
              </li>
            </ul>
          </nav>
        </transition>
      </div>

      <!-- Seleccionadores de ciclo, curso y asignatura -->
      <div class="selectors">
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

      <!-- Modal de Panel Administrador -->
      <div
        v-if="adminModalOpen"
        class="admin-modal-overlay"
        @click.self="closeAdminModal"
      >
        <div class="admin-modal">
          <!-- Pestañas -->
          <div class="tabs">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              :class="{ 'active': activeTab === tab.id }"
              @click="activeTab = tab.id"
            >
              {{ tab.label }}
            </button>
          </div>

          <!-- Contenido según pestaña activa -->
          <div class="tab-content">
            <!-- Pestaña: Alta de Usuario -->
            <div
              v-if="activeTab === 'addUser'"
              class="form-container"
            >
              <h3>➕ Dar de Alta Usuario</h3>
              <form @submit.prevent="handleAddUser">
                <!-- Grupo: Email -->
                <div class="form-group">
                  <label for="email">Email:</label>
                  <input
                    v-model="newUser.email"
                    type="email"
                    placeholder="usuario@ejemplo.com"
                    required
                  >
                </div>

                <!-- Grupo: DNI -->
                <div class="form-group">
                  <label for="dni">DNI:</label>
                  <input
                    v-model="newUser.dni"
                    type="text"
                    placeholder="12345678A"
                    required
                    pattern="[0-9]{8}[A-Za-z]"
                    title="Formato de DNI: 8 números seguidos de 1 letra"
                  >
                </div>

                <!-- Grupo: Contraseña -->
                <div class="form-group">
                  <label for="password">Contraseña Temporal:</label>
                  <input
                    v-model="newUser.password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    required
                    minlength="6"
                  >
                  <button
                    type="button"
                    class="generate-btn"
                    @click="generatePassword"
                  >
                    Generar
                  </button>
                </div>

                <!-- Grupo: Especialidad -->
                <div class="form-group">
                  <label for="specialty">Especialidad:</label>
                  <select
                    v-model="newUser.specialty"
                    required
                  >
                    <option value="teacher">
                      DAW
                    </option>
                    <option value="teacher">
                      DAM
                    </option>
                    <option value="teacher">
                      Marketing
                    </option>
                  </select>
                </div>

                <!-- Grupo: Centro -->
                <div class="form-group">
                  <label for="center">Centro:</label>
                  <select
                    v-model="newUser.center"
                    required
                  >
                    <option value="">
                      Seleccione un centro
                    </option>
                    <option value="Centro A">
                      Centro A
                    </option>
                    <option value="Centro B">
                      Centro B
                    </option>
                    <option value="Centro C">
                      Centro C
                    </option>
                  </select>
                </div>

                <!-- Grupo: Rol -->
                <div class="form-group">
                  <label for="role">Rol:</label>
                  <select
                    v-model="newUser.role"
                    required
                  >
                    <option value="admin">
                      Administrador
                    </option>
                    <option value="teacher">
                      Profesor
                    </option>
                  </select>
                </div>

                <!-- Grupo: Admin -->
                <div class="form-group">
                  <label for="isAdmin">Rol de Administrador:</label>
                  <select
                    id="isAdmin"
                    v-model="newUser.isAdmin"
                    required
                  >
                    <option :value="true">
                      Administrador (acceso completo)
                    </option>
                    <option :value="false">
                      Usuario normal (acceso limitado)
                    </option>
                  </select>
                </div>
                <!-- Acciones del formulario -->
                <div class="form-actions">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="isLoading"
                  >
                    <span v-if="!isLoading">Crear Usuario</span>
                    <span v-else>Procesando...</span>
                  </button>
                </div>
              </form>

              <!-- Feedback del formulario -->
              <div
                v-if="feedback.message"
                class="feedback"
                :class="feedback.type"
              >
                {{ feedback.message }}
              </div>
            </div>

            <!-- Pestaña: Gestión -->
            <div
              v-if="activeTab === 'manage'"
              class="management-container"
            >
              <!-- Sección: Gestión de Usuarios -->
              <div class="modal-section">
                <h3>👥 Gestión de Usuarios</h3>
                <div class="action-buttons">
                  <button
                    class="btn btn-danger"
                    @click="removeUser"
                  >
                    <i class="fas fa-user-minus" /> Dar de baja
                  </button>
                  <button
                    class="btn btn-secondary"
                    @click="showUserList"
                  >
                    <i class="fas fa-list" /> Listar usuarios
                  </button>
                </div>
              </div>

              <!-- Sección: Gestión de Recursos -->
              <div class="modal-section">
                <h3>📚 Gestión de Recursos</h3>
                <div class="action-buttons">
                  <button
                    class="btn btn-primary"
                    @click="uploadResource"
                  >
                    <i class="fas fa-upload" /> Subir recurso
                  </button>
                  <button
                    class="btn btn-warning"
                    @click="editResource"
                  >
                    <i class="fas fa-edit" /> Editar recurso
                  </button>
                </div>
              </div>

              <!-- Feedback de gestión -->
              <div
                v-if="adminFeedback"
                class="feedback"
                :class="feedbackType"
              >
                {{ adminFeedback }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase, supabaseAdmin } from '@/supabase/supabaseClient.js'

const router = useRouter()
const user = ref(null)
const isAdmin = ref(false) // Detecta si el usuario es admin
const menuOpen = ref(false)
const adminModalOpen = ref(false) // ✅ AÑADIDO para controlar el modal del panel admin

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeAdminModal = () => {
  adminModalOpen.value = false
  activeTab.value = 'handleAddUser'
  newUser.value = { email: '', password: '', role: 'user' }
  feedback.value = { message: '', type: '' }
}

const removeUser = () => {
  console.log('Eliminar usuario')
}

onMounted(async () => {
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error al obtener usuario:', error)
  } else {
    user.value = data.user
    // Confirmo si el usuario es superadmin desde la base de datos
    const { data: profile, error: profileError } = await supabase
      .from('profesores')
      .select('superadmin')
      .eq('id', user.value.id)
      .single()

    console.log('resultado de la consulta: ', profile)
    // Manejamos los errores de la consulta
    if (profileError) {
      console.error('Error al obtener perfil: ', profileError)
    } else {
      isAdmin.value = profile.superadmin
    }
  }

  await loadCiclos()
})

// Ciclos, cursos, asignaturas y recursos
const ciclos = ref([])
const cursos = ref([])
const asignaturas = ref([])
const recursos = ref([])

const selectedCiclo = ref(null)
const selectedCurso = ref(null)
const selectedAsignatura = ref(null)

const loadCiclos = async () => {
  const { data, error } = await supabase.from('ciclos_formativos').select('*')
  if (error) console.error(error)
  else ciclos.value = data
}

const loadCursos = async () => {
  if (!selectedCiclo.value) return
  selectedCurso.value = null
  selectedAsignatura.value = null
  recursos.value = []
  const { data, error } = await supabase.from('cursos').select('*').eq('ciclo_formativo_id', selectedCiclo.value)
  if (error) console.error(error)
  else cursos.value = data
}

const loadAsignaturas = async () => {
  if (!selectedCurso.value) return
  selectedAsignatura.value = null
  recursos.value = []
  const { data, error } = await supabase.from('asignaturas').select('*').eq('curso_id', selectedCurso.value)
  if (error) console.error(error)
  else asignaturas.value = data
}

const loadRecursos = async () => {
  if (!selectedAsignatura.value) return
  const { data, error } = await supabase.from('recursos').select('*').eq('asignatura_id', selectedAsignatura.value)
  if (error) console.error(error)
  else recursos.value = data
}

const userImage = computed(() => {
  const name = user.value?.email || 'User'
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=64`
})

const logout = async () => {
  await supabase.auth.signOut()
  menuOpen.value = false
  router.push('/')
}

// Variables para el alta de usuarios
const activeTab = ref('addUser')
const tabs = [
  { id: 'addUser', label: 'Alta Usuario' },
  { id: 'manage', label: 'Gestión' }
]
const newUser = ref({ // Nuevas lineas para el formulario de alta de usuario
  email: '',
  dni: '',
  password: '',
  specialty: '',
  center: '',
  isAdmin: false,
  role: 'user'
})
const isLoading = ref(false)
const feedback = ref({ message: '', type: '' })

const generatePassword = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let password = ''
  for (let i = 0; i < 10; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  newUser.value.password = password
  feedback.value = {
    message: 'Contraseña generada. Cópiala y guárdala.',
    type: 'success'
  }
}

const handleAddUser = async () => {
  isLoading.value = true
  feedback.value = { message: '', type: '' }

  try {
    // 1. Crear usuario en Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: newUser.value.email,
      password: newUser.value.password,
      email_confirm: true
    })

    if (authError) throw authError

    // 2. Guardar rol en la base de datos
    const { error: dbError } = await supabase
      .from('profesores')
      .upsert({
        id: authData.user.id,
        email: newUser.value.email,
        role: newUser.value.role
      })

    if (dbError) throw dbError

    feedback.value = {
      message: `✅ Usuario ${newUser.value.email} creado como ${newUser.value.role}`,
      type: 'success'
    }

    // Resetear formulario
    newUser.value = { email: '', password: '', role: 'user' }
  } catch (error) {
    console.error('Error:', error)
    feedback.value = {
      message: `❌ Error: ${error.message}`,
      type: 'error'
    }
  } finally {
    isLoading.value = false
  }
}
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

.background {
  background: linear-gradient(135deg, #4b6bfb, #ff7043);
  min-height: 100vh;
  padding: 20px;
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
  cursor: pointer;
}

.resources h2 {
  font-size: 28px;
  color: var(--primary-color);
  margin-bottom: 24px;
  font-weight: 700;
  text-align: center;
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

.resources a {
  display: inline-block;
  margin-top: 12px;
  font-size: 16px;
  color: var(--secondary-color);
  text-decoration: none;
  font-weight: 600;
}

.resources a:hover {
  color: var(--primary-color);
  text-decoration: underline;
}

.menu-container {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-bottom: 20px;
  z-index: 999;
}

.burger {
  font-size: 30px;
  cursor: pointer;
  background-color: #fff;
  padding: 10px 15px;
  border-radius: 10px;
  box-shadow: var(--shadow);
  transition: background-color 0.3s;
}

.burger:hover {
  background-color: var(--primary-color);
  color: white;
}

.menu {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 12px;
  box-shadow: var(--shadow);
  padding: 20px;
  min-width: 200px;
}

.menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu li {
  margin-bottom: 10px;
  cursor: pointer;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-bottom: 8px;
}

.username {
  font-weight: 600;
  font-size: 16px;
  color: var(--text-color);
  text-align: center;
}
.logout {
  color:darkred;
}

/* Estilos para el Panel de Administrador */
.admin-panel-container {
  margin-top: 40px;
  background: rgba(255, 0, 0, 0.9);
  padding: 20px;
  border-radius: 12px;
  box-shadow: var(--shadow);
}

.admin-actions button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 8px;
  margin: 10px 0;
  cursor: pointer;
}

.admin-actions button:hover {
  background-color: var(--secondary-color);
}

.admin-panel {
  cursor: pointer;
  font-size: 18px;
  color: var(--primary-color);
  font-weight: 600;
  margin-top: 20px;
}

.admin-panel:hover {
  text-decoration: underline;
}

/* Modal */
.admin-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.admin-modal {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: slideUp 0.3s ease;
}

.modal-header {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.close-btn:hover {
  transform: scale(1.2);
}

.modal-section {
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.modal-section h3 {
  margin-top: 0;
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.btn {
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.btn-primary {
  background: #4f46e5;
  color: white;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-warning {
  background: #f59e0b;
  color: white;
}

.btn-secondary {
  background: #e5e7eb;
  color: #333;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.feedback {
  padding: 1rem;
  margin: 1rem;
  border-radius: 8px;
  text-align: center;
}

.feedback.success {
  background: #d1fae5;
  color: #065f46;
}

.feedback.error {
  background: #fee2e2;
  color: #b91c1c;
}

/* Animaciones */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
/*Formulario ADDUser*/
.tabs {
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.tabs button {
  padding: 12px 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: #64748b;
  transition: all 0.3s;
}

.tabs button.active {
  color: #4f46e5;
  border-bottom: 2px solid #4f46e5;
}

.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.2rem;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #334155;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #4f46e5;
  outline: none;
  box-shadow: #372f96 0 0 0 3px;
  transition: all 0.3s;
}

.addUserBtn{
  position: absolute;
  right: 0;
  top: 48px;
  transform: translateY(-50%);
  background: #4f46e5;
  color: white;
  padding: 10px 10px;
  border-radius: 10px;
  font-size: 0.8rem;
  cursor: pointer;
}

.addUserBtn:hover {
  background: #372f96;
  transition: all 0.3s;
  color: white;
}

.generate-btn {
  position: absolute;
  right: 0;
  top: 48px;
  transform: translateY(-50%);
  background: #e2e8f0;
  border: #05b64e 1px solid;
  color: #333;
  padding: 10px 10px;
  border-radius: 10px;
  font-size: 0.8rem;
  cursor: pointer;
}

.generate-btn:hover {
  background: #05b64e;
  transition: all 0.3s;
  color: white;
}

.form-actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1rem;
  margin: 1rem;
  text-align: right;
}

.feedback {
  margin-top: 1rem;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.9rem;
}

.feedback.success {
  background: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.feedback.error {
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
}
</style>
