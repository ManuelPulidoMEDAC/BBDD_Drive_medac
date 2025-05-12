<template>
  <div class="background">
    <!-- Contenedor principal con el título y los selectores -->
    <h1 class="titulo">
      Selecciona tu ciclo, curso y asignatura
    </h1>

    <div class="container">
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

              <!-- ✅ Panel Admin visible si superadmin es true -->
              <li
                v-if="superadmin"
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

        <!-- Selector de asignatura MEJORADO -->
        <div
          v-if="asignaturas.length > 0"
          class="dropdown"
        >
          <label for="asignatura">Asignatura</label>
          <div class="asignatura-container">
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
            <button
              v-if="superadmin"
              class="add-resource-btn"
              title="Añadir nuevo recurso"
              @click="openAddResourceModal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line
                  x1="12"
                  y1="5"
                  x2="12"
                  y2="19"
                />
                <line
                  x1="5"
                  y1="12"
                  x2="19"
                  y2="12"
                />
              </svg>
            </button>
          </div>
        </div>
        <!-- Tarjetas de recursos -->
        <div
          v-if="recursosList.length > 0"
          class="recursos-grid"
        >
          <h2>Recursos disponibles para esta asignatura</h2>
          <div class="tarjetas-recursos">
            <div
              v-for="recurso in recursosList"
              :key="recurso.id"
              class="tarjeta-recurso"
            >
              <h3>{{ recurso.name }}</h3>
              <p>{{ recurso.description || 'Sin descripción' }}</p>
              <p><strong>Tipo:</strong> {{ recurso.type }}</p>

              <div class="recurso-actions">
                <a
                  v-if="recurso.type === 'enlace'"
                  :href="recurso.url"
                  target="_blank"
                  class="btn-ver"
                >
                  Ver enlace
                </a>

                <a
                  v-else
                  :href="recurso.url"
                  target="_blank"
                  class="btn-descargar"
                >
                  Descargar recurso
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal "+" para añadir recurso -->
      <div
        v-if="showAddResourceModal"
        class="resource-modal-overlay"
        @click.self="closeAddResourceModal"
      >
        <div class="resource-modal">
          <div class="modal-header">
            <h2>Añadir Nuevo Recurso</h2>
            <button
              class="close-btn"
              @click="closeAddResourceModal"
            >
              &times;
            </button>
          </div>
          <form
            class="resource-form"
            @submit.prevent="submitNewResource"
          >
            <div class="form-group">
              <label>Título del Recurso</label>
              <input
                v-model="newResource.name"
                type="text"
                required
                placeholder="Titulo del recurso"
              >
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Tipo de Recurso</label>
                <select
                  v-model="newResource.type"
                  required
                >
                  <option value="documento">
                    Documento
                  </option>
                  <option value="presentacion">
                    Presentación
                  </option>
                  <option value="video">
                    Video
                  </option>
                  <option value="enlace">
                    Enlace web
                  </option>
                </select>
              </div>

              <div
                v-if="newResource.type === 'enlace'"
                class="form-group"
              >
                <label>URL</label>
                <input
                  v-model="newResource.url"
                  type="url"
                  placeholder="https://ejemplo.com"
                >
              </div>
            </div>

            <div
              v-if="newResource.type !== 'enlace'"
              class="form-group"
            >
              <label>Archivo</label>
              <div class="file-upload">
                <label class="upload-area">
                  <input
                    type="file"
                    :required="newResource.type !== 'enlace'"
                    @change="handleFileUpload"
                  >
                  <span v-if="!newResource.file">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line
                        x1="12"
                        y1="3"
                        x2="12"
                        y2="15"
                      />
                    </svg>
                    <span>Selecciona un archivo</span>
                  </span>
                  <span
                    v-else
                    class="file-info"
                  >
                    {{ newResource.file.name }}
                  </span>
                </label>
              </div>
            </div>

            <div class="form-group">
              <label>Descripción (opcional)</label>
              <textarea
                v-model="newResource.description"
                placeholder="Breve descripción del recurso..."
                rows="3"
              />
            </div>

            <div class="form-actions">
              <button
                type="button"
                class="btn btn-secondary"
                @click="closeAddResourceModal"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="isUploading"
              >
                <span v-if="!isUploading">Guardar Recurso</span>
                <span
                  v-else
                  class="loading"
                >
                  <span class="spinner" /> Subiendo...
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
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
            <!--Grupo: Nombre -->
            <div class="form-group">
              <label for="nombre">Nombre:</label>
              <input
                v-model="newUser.nombre"
                type="nombre"
                placeholder="Inserte su nombre aquí"
                required
              >
            </div>

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
              <label for="especialidad">Especialidad:</label>
              <select
                v-model="newUser.especialidad"
                required
              >
                <option
                  value=""
                  disabled
                >
                  Seleccione una asignatura
                </option>
                <option
                  v-for="asignatura in asignaturasOpt"
                  :key="asignatura.id"
                  :value="asignatura.nombre"
                >
                  {{ asignatura.nombre }}
                </option>
              </select>
            </div>

            <!-- Grupo: Centro -->
            <div class="form-group">
              <label for="centro">Centro:</label>
              <select
                v-model="newUser.centro"
                required
              >
                <option
                  value=""
                  disabled
                >
                  Seleccione un centro
                </option>

                <option
                  v-for="centro in centros"
                  :key="centro.id"
                  :value="centro.id"
                >
                  {{ centro.nombre }}
                </option>
              </select>
            </div>
            <!-- Grupo: Admin -->
            <div class="form-group">
              <label for="superadmin">Rol de Administrador:</label>
              <select
                id="superadmin"
                v-model="newUser.superadmin"
                required
              >
                <option :value="true">
                  Administrador (acceso completo)
                </option>
                <option :value="false">
                  Profesor (acceso limitado)
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
            <ul class="userList">
              <li
                v-for="usuario in usuariosList"
                :key="usuario.id"
              >
                <span><strong>Nombre:</strong>{{ usuario.nombre }}</span>
                <span><strong>DNI:</strong> {{ usuario.dni }}</span>
                <span class="user-email"><strong>Email:</strong>{{ usuario.email }}</span>
              </li>
            </ul>
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
                @click="handleFileUpload"
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
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { supabase, supabaseAdmin } from '@/supabase/supabaseClient.js'

const router = useRouter()

// Estados de autenticación y usuario
const user = ref(null)
const superadmin = ref(false) // Detecta si el usuario es admin
const menuOpen = ref(false)
const adminModalOpen = ref(false) // ✅ AÑADIDO para controlar el modal del panel admin
const centros = ref([]) // variable para almacenar los centros de la bbdd
const asignaturasOpt = ref([])
const asignaturaSeleccionada = ref(null)
const usuariosList = ref([])
const recursosList = ref([]) // variable para almacenar los recursos de la bbdd

// Estados para gestión de recursos
const showAddResourceModal = ref(false)
const isUploading = ref(false)
const newResource = ref({
  name: '',
  type: 'documento',
  file: null,
  url: '',
  description: ''
})

// Estados para datos académicos
const ciclos = ref([])
const cursos = ref([])
const asignaturas = ref([])
const recursos = ref([])
const selectedCiclo = ref(null)
const selectedCurso = ref(null)
const selectedAsignatura = ref(null)

// Estados para gestión de usuarios (admin)
const activeTab = ref('addUser')
const tabs = [
  { id: 'addUser', label: 'Alta Usuario' },
  { id: 'manage', label: 'Gestión' }
]
const newUser = ref({
  name: '',
  email: '',
  dni: '',
  password: '',
  especialidad: '',
  centro: '',
  superadmin: false
})
const isLoading = ref(false)
const feedback = ref({ message: '', type: '' })

// Computed properties
const userImage = computed(() => {
  const name = user.value?.email || 'User'
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=64`
})

// Funciones de UI
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeAdminModal = () => {
  adminModalOpen.value = false
  activeTab.value = 'addUser'
  newUser.value = { email: '', password: '', role: 'user' }
  feedback.value = { message: '', type: '' }
}

// Funciones de autenticación
const logout = async () => {
  await supabase.auth.signOut()
  menuOpen.value = false
  router.push('/')
}

// Funciones para gestión de recursos
const openAddResourceModal = () => {
  if (!selectedAsignatura.value) {
    alert('Por favor, selecciona una asignatura primero')
    return
  }
  showAddResourceModal.value = true
}

const closeAddResourceModal = () => {
  showAddResourceModal.value = false
  newResource.value = {
    name: '',
    type: 'documento',
    file: null,
    url: '',
    description: ''
  }
}

const handleFileUpload = (event) => {
  newResource.value.file = event.target.files[0]
}

const submitNewResource = async () => {
  try {
    isUploading.value = true

    // Validación
    if (!newResource.value.name) {
      throw new Error('El nombre del recurso es obligatorio')
    }

    if (newResource.value.type === 'enlace' && !newResource.value.url) {
      throw new Error('La URL es obligatoria para recursos de tipo enlace')
    }

    if (newResource.value.type !== 'enlace' && !newResource.value.file) {
      throw new Error('Debes seleccionar un archivo')
    }

    // Subir a Supabase
    let filePath = ''

    if (newResource.value.type !== 'enlace') {
      const fileExt = newResource.value.file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      filePath = `recursos/${selectedAsignatura.value}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('recursos')
        .upload(filePath, newResource.value.file)

      if (uploadError) throw uploadError
    }

    // Guardar metadatos
    const { error: dbError } = await supabase
      .from('recursos')
      .insert([{
        nombre: newResource.value.name,
        tipo: newResource.value.type,
        asignatura_id: selectedAsignatura.value,
        url: newResource.value.type === 'enlace' ? newResource.value.url : null,
        path: newResource.value.type !== 'enlace' ? filePath : null,
        descripcion: newResource.value.description,
        subido_por: user.value.id
      }])

    if (dbError) throw dbError

    alert('Recurso añadido correctamente')
    closeAddResourceModal()
    loadRecursos()
  } catch (error) {
    console.error('Error al subir el recurso:', error)
    alert(`Error: ${error.message}`)
  } finally {
    isUploading.value = false
  }
}

// Funciones para carga de datos académicos
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

const loadRecursosList = async () => {
  const { data, error } = await supabase
    .from('recursos')
    .select('*')
    .eq('asignatura_id', asignaturaSeleccionada.value.id)

  if (error) {
    console.error('Error al cargar recursos:', error)
  } else {
    recursosList.value = data
  }
}

// Llama a la función cuando cambia la asignatura seleccionada
watch(asignaturaSeleccionada, () => {
  if (asignaturaSeleccionada.value) {
    loadRecursosList()
  }
}, { immediate: true })
// Funciones para gestión de usuarios (admin)
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

    // 2. Guardar usuario en la base de datos
    const { error: dbError } = await supabase
      .from('profesores')
      .insert({
        id: authData.user.id,
        nombre: newUser.value.nombre,
        email: newUser.value.email,
        dni: newUser.value.dni,
        especialidad: newUser.value.especialidad,
        profesor_centro: newUser.value.centro,
        superadmin: newUser.value.superadmin
      })

    if (dbError) throw dbError

    feedback.value = {
      message: `✅ Usuario ${newUser.value.email} creado`,
      type: 'success'
    }

    // Resetear formulario
    newUser.value = { nombre: '', email: '', password: '', dni: '', especialidad: '', centro: '', superadmin: false }
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

// Se encarga de cargar los centros desde la base de datos para seleccionar en el formulario.
const loadCentros = async () => {
  const { data, error } = await supabase.from('centros').select('*')
  if (error) console.error(error)
  else centros.value = data
}

// Se encarga de cargar las asignaturas desde la bbdd.
const asignaturasSelect = async () => {
  const { data, error } = await supabase.from('asignaturas').select('*')
  if (error) console.error(error)
  else asignaturasOpt.value = data
}

// Mostar la lista de usuarios.
const showUserList = async () => {
  const { data, error } = await supabase.from('profesores').select('*')
  if (error) console.error(error)
  else usuariosList.value = data
}
const removeUser = () => {
  console.log('Eliminar usuario')
}

// Inicialización
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

    if (profileError) {
      console.error('Error al obtener perfil: ', profileError)
    } else {
      superadmin.value = profile.superadmin
    }
  }

  await loadCiclos()
  await loadCentros()
  await asignaturasSelect()
  // Funcion para cargar los recursos de la bbdd.
  if (selectedAsignatura.value) {
    await loadRecursos()
  }
})

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
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  min-height: 100vh;
  padding: 20px;
}

.titulo{
  font-size: 36px;
  color: white;
  font-weight: 700;
  margin-bottom: 32px;
  text-align: center;
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
  background-color: #e2e8f0;
  box-shadow: 12px 12px 12px rgba(0, 0, 0, 0.15);
  background-color: #e2e8f0;
  box-shadow: 12px 12px 12px rgba(0, 0, 0, 0.15);
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
  padding-right: 20px;
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

/*Lista de usuarios*/
.userList{
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(280px, 1fr));
  gap: 10px;
  max-height: 400px;
  overflow-y: auto;
}
.userList li {
  background-color: rgba(255,255,255,0.95);
  padding: 16px;
  border-radius: 12px;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease,box-shadow 0.3 ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}
/* Estilos para el contenedor de asignatura */
.asignatura-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Estilos para el botón de añadir recurso */
.add-resource-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-resource-btn:hover {
  background-color: #45a049;
  transform: scale(1.1);
}

/* Estilos mejorados para el botón y modal */
.asignatura-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.add-resource-btn {
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
}

.add-resource-btn:hover {
  background: #3e8e41;
  transform: scale(1.1);
}

.add-resource-btn svg {
  width: 16px;
  height: 16px;
}

/* Estilos del modal mejorado */
.resource-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.resource-modal {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.modal-header {
  padding: 16px 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;
}

.resource-form {
  padding: 20px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-row .form-group {
  flex: 1;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #495057;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
}

.form-group textarea {
  min-height: 80px;
  resize: vertical;
}

.file-upload {
  margin-top: 8px;
}

.upload-area {
  display: block;
  border: 2px dashed #ced4da;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-area:hover {
  border-color: var(--primary-color);
  background: #f8f9fa;
}

.upload-area svg {
  margin-bottom: 8px;
  color: #6c757d;
}

.upload-area span {
  display: block;
  color: #6c757d;
}

.file-info {
  color: #495057;
  font-weight: 500;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary {
  background: #6c757d;
  color: white;
  border: none;
}

.btn-secondary:hover {
  background: #5a6268;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
  border: none;
}

.btn-primary:hover {
  background: var(--secondary-color);
}

.btn-primary:disabled {
  background: #a5d6a7;
  cursor: not-allowed;
}

.loading {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
.recursos-grid {
  margin-top: 2rem;
  text-align: center;
  cursor: pointer;
}

.tarjetas-recursos {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin-top: 1rem;
}

.tarjeta-recurso {
  background-color: #fff;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.recurso-actions {
  margin-top: 1rem;
}

.btn-ver,
.btn-descargar {
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  text-decoration: none;
}

.btn-ver:hover,
.btn-descargar:hover {
  background-color: #0056b3;
}

</style>
