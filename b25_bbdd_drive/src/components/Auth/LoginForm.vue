<template>
  <!-- Formulario de inicio de sesión -->
  <form
    class="form-container"
    @submit.prevent="login"
  >
    <!-- Campo para el nombre de usuario -->
    <input
      v-model="email"
      type="text"
      placeholder="Correo electrónico"
      class="input"
      required
    >
    <!-- Campo para la contraseña -->
    <input
      v-model="password"
      type="password"
      placeholder="Contraseña"
      class="input"
      required
    >
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
import { ref, onMounted } from 'vue'

// Importamos el cliente de Supabase
import { supabase } from '@/supabase/supabaseClient'

// Definición del evento que se emitirá cuando el login sea exitoso
const emit = defineEmits(['login-success'])

// Variables reactivas para almacenar el nombre de usuario y la contraseña
const email = ref('')
const password = ref('')
const errorMsg = ref('') // Variable para recordar mensaje de inicio de sesion
const remember = ref(false) // Variable para recordar los credenciales de inicio de sesion

// Función de inicio de sesión
async function login () {
  // Parte del login que permita almacenar credenciales para iniciar sesión
  if (remember.value) {
    localStorage.setItem('email', this.email)
    localStorage.setItem('password', this.password)
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

  // Bloque que carga los credenciales del localstorage para recordar credenciales
  onMounted(() => {
    const savedEmail = localStorage.getItem('email')
    const savedPassword = localStorage.getItem('password')

    if (savedEmail && savedPassword) {
      email.value = savedEmail
      password.value = savedPassword
      remember.value = true
    }
  })
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
</style>
