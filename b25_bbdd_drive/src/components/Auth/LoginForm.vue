<template>
  <!-- Formulario de inicio de sesión -->
  <form
    class="form-container"
    @submit.prevent="login"
  >
    <!-- Campo para el nombre de usuario -->
    <input
      v-model="username"
      type="text"
      placeholder="Usuario"
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
// Importación de Vue y definición de variables reactivas
import { ref } from 'vue'

// Definición del evento que se emitirá cuando el login sea exitoso
const emit = defineEmits(['login-success'])

// Variables reactivas para almacenar el nombre de usuario y la contraseña
const username = ref('')
const password = ref('')

// Función de inicio de sesión
function login () {
  // Compara las credenciales con valores estáticos
  if (username.value === 'usuario' && password.value === 'contraseña') {
    // Si las credenciales son correctas, emite un evento de éxito
    emit('login-success')
  } else {
    // Si las credenciales son incorrectas, muestra una alerta
    alert('Credenciales incorrectas')
  }
}
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
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
  border-radius: 4px;
  padding: 12px;
  width: 100%;
  font-size: 16px;
  color: #333;
  background-color: #fff;
  transition: border-color 0.3s ease;
}

.input:focus {
  border-color: #3182ce;
  outline: none;
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
</style>
