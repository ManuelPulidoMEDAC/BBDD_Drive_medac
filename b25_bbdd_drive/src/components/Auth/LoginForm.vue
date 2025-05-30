<template>
  <!-- Formulario de inicio de sesión -->
  <form
    class="form-container"
    @submit.prevent="login"
  >
    <!-- Campo para el nombre de usuario -->
    <div class="password-input-wrapper">
      <input
        v-model="email"
        type="text"
        placeholder="Correo electrónico"
        class="input"
        required
      >
    </div>

    <div class="password-input-wrapper">
      <!-- Campo para la contraseña -->
      <input
        v-model="password"
        :type="passwordFieldType"
        placeholder="Contraseña"
        class="input"
        required
      >

      <!--Este div actuara para cambiar la visibilidad -->
      <div
        class="password-toggle"
        @mousedown="showPassword"
        @mouseup="hidePassword"
        @touchstart="showPassword"
        @touchend="hidePassword"
      >
        <i :class="passwordIcon" /> <!-- Icono para mostrar contraseña -->
      </div>
    </div>
    <!-- Checkbox para recordar la contraseña y el correo -->
    <div class="remember">
      <label class="custom-checkbox">
        <input
          id="remember"
          v-model="remember"
          type="checkbox"
        >
        <span class="checkmark" />
        Recuerdame en este equipo
      </label>
    </div>

    <!-- Botón para enviar el formulario -->
    <button
      type="submit"
      class="btn-primary"
    >
      Iniciar sesión
    </button>
  </form>
</template>

<script setup>
// Importación de Vue
import { ref, onMounted, computed } from 'vue'

// Importamos el cliente de Supabase
import { supabase } from '@/supabase/supabaseClient'

// Definición del evento que se emitirá cuando el login sea exitoso
const emit = defineEmits(['login-success'])

// Variables reactivas para almacenar el nombre de usuario y la contraseña
const email = ref('')
const password = ref('')
const errorMsg = ref('') // Variable para recordar mensaje de inicio de sesion
const remember = ref(false) // Variable para recordar los credenciales de inicio de sesion
const passwordFieldType = ref('password') // Variable para altener la password

// Función de inicio de sesión
async function login () {
  const secret = 'password secreta'

  // Parte del login que permita almacenar credenciales para iniciar sesión
  if (remember.value) {
    const encryptedPassword = await encryptPassword(password.value, secret)

    localStorage.setItem('email', email.value)
    localStorage.setItem('password', encryptedPassword)
  } else {
    localStorage.removeItem('email')
    localStorage.removeItem('password')
  }

  // Parte de codigo para verificar que no se dejan campos vacios
  if (!email.value || !password.value) {
    errorMsg.value = 'Rellena los campos'
    alert(errorMsg.value)
    return
  }

  // Se intenta el inicio de sesion con los valores del v-model
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    // En caso de error mostramos los errores
    errorMsg.value = error.message
    alert('Credenciales incorrectas')
  } else {
    // Si las credenciales son correctas, emite un evento de éxito
    emit('login-success')
  }
}
// Bloque que carga los credenciales del localstorage para recordar credenciales
onMounted(async () => {
  const savedEmail = localStorage.getItem('email')
  const savedPassword = localStorage.getItem('password')
  const secret = 'password secreta'

  if (savedEmail && savedPassword) {
    const decryptedPassword = await decryptPassword(savedPassword, secret)
    email.value = savedEmail
    password.value = decryptedPassword
    remember.value = true
  }
})

// Funcion para mostrar contraseña al clickar
function showPassword () {
  passwordFieldType.value = 'text'
}

// Funcion para ocultar la contraseña despues del click
function hidePassword () {
  passwordFieldType.value = 'password'
}

// Funcion para que el icono de la contraseña se alterne
const passwordIcon = computed(() =>
  passwordFieldType.value === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash')

// Funcion para convertir nuestra string secreta
async function getKey (secret) {
  const encoder = new TextEncoder()
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  )

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('un_salt_unico'),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

// Funcion para cifrar la contraseña
async function encryptPassword (password, secret) {
  const encoder = new TextEncoder()
  const key = await getKey(secret)
  const iv = window.crypto.getRandomValues(new Uint8Array(12)) // 12 bytes IV para AES-GCM

  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    encoder.encode(password)
  )

  // Guardamos IV + cifrado en base64 para almacenarlo
  const buffer = new Uint8Array(encrypted)
  const result = {
    iv: Array.from(iv),
    data: Array.from(buffer)
  }
  return btoa(JSON.stringify(result)) // Convertir a base64 string para guardar
}

// Funcion para descifrar la contraseña
async function decryptPassword (encryptedData, secret) {
  const decoder = new TextDecoder()
  const key = await getKey(secret)

  const encryptedObj = JSON.parse(atob(encryptedData))
  const iv = new Uint8Array(encryptedObj.iv)
  const data = new Uint8Array(encryptedObj.data)

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    data
  )

  return decoder.decode(decrypted)
}

</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.input {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 12px;
  width: 90%;
  font-size: 16px;
  color: #333;
  background-color: #fff;
  transition: border-color 0.3s ease;
}

.input:focus {
  border-color: #3182ce;
  outline: none;
  overflow: hidden;
}

.btn-primary {
  background-color: #3182ce;
  color: white;
  font-weight: bold;
  padding: 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #2b6cb0;
}

.remember {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  font-size: 14px;
  color: #555;
  cursor: pointer;
  user-select: none;
}

.remember input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #3182ce;
  cursor: pointer;
}

.custom-checkbox {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  user-select: none;
  color: #333;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  margin: 0;
}

.checkmark {
  width: 18px;
  height: 18px;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 4px;
  display: inline-block;
  position: relative;
  transition: all 0.3s ease;
}

.custom-checkbox input:checked~.checkmark {
  background-color: #3182ce;
  border-color: #3182ce;
}

.checkmark::after {
  content: '';
  position: absolute;
  display: none;
  left: 5px;
  top: 1px;
  width: 4px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.custom-checkbox input:checked~.checkmark::after {
  display: block;
}

.custom-checkbox input:checked~.checkmark {
  background-color: #3182ce;
  border-color: #3182ce;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.password-toggle {
  cursor: pointer;
  font-size: 24px;
  margin-top: 5px;
}

.password-toggle:hover {
  opacity: 0.7;
}

.password-input-wrapper {
  position: relative;
  width: 100%;
}

.password-input-wrapper input {
  width: 100%;
  padding-right: 40px;
  box-sizing: border-box;
}

.password-toggle {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 20px;
  user-select: none;
}

.password-toggle:hover {
  opacity: 0.7;
}
</style>
