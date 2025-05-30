<template>
  <!-- Formulario de registro -->
  <form
    class="form-container"
    @submit.prevent="registro"
  >
    <!--Campo para ingresar el nombre-->
    <input
      v-model="nombre"
      type="text"
      placeholder="Nombre y apellido"
      class="input"
    >
    <!--Campo para ingresar el DNI-->
    <input
      v-model="dni"
      type="text"
      placeholder="DNI"
      class="input"
    >
    <!--Campo para ingresar la especialidad-->
    <input
      v-model="especialidad"
      type="text"
      placeholder="Especialidad"
      class="input"
    >
    <!-- Campo para ingresar correo electrónico -->
    <input
      v-model="email"
      type="email"
      placeholder="Correo electrónico"
      class="input"
    >
    <!-- Campo para ingresar la contraseña -->
    <input
      v-model="password"
      type="password"
      placeholder="Contraseña"
      class="input"
    >
    <!-- Campo para repetir la contraseña -->
    <input
      v-model="confirmPassword"
      type="password"
      placeholder="Repetir contraseña"
      class="input"
    >
    <!-- Botón para enviar el formulario de registro -->
    <button class="btn-primary">
      Registrarse
    </button>

    <!-- Mensaje de error y éxito -->
    <p
      v-if="errorMsg"
      style="color-red"
    >
      {{ errorMsg }}
    </p>
    <p
      v-if="successMsg"
      style="color-green"
    >
      {{ successMsg }}
    </p>
  </form>
</template>

<script setup>
// Importación de Vue, Supabase y definición de variables reactivas
import { ref } from 'vue'
import { supabase } from '@/supabase/supabaseClient.js'

const nombre = ref('')
const dni = ref('')
const especialidad = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMsg = ref('')
const successMsg = ref('')

const registro = async () => {
  errorMsg.value = ''
  successMsg.value = ''

  // Comprobamos que las contraseñas coinciden
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Las contraseñas no coinciden'
    return
  }

  console.log('Registrando con:', email.value, password.value)
  // Función para registrar al usuario en tabla usuarios.
  const { data: signUpData, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value
  })

  // Controlamos el error
  if (error) {
    errorMsg.value = error.message
    console.error('Error al registrar:', error.message)
    return
  }

  // Si el registro es exitoso, se guarda en la tabla profesores.
  const userID = signUpData?.user?.id
  if (userID) {
    const { error: insertError } = await supabase
      .from('profesores')
      .insert([{
        id: userID,
        email: email.value,
        nombre: nombre.value,
        dni: dni.value,
        especialidad: especialidad.value
      }])

    if (insertError) {
      errorMsg.value = 'Error al registrar en profesores.' + insertError.message
      console.error('error al insertar en profesores:', insertError.message)
      return
    }

    alert(successMsg.value = '¡Registro exitoso!. Por favor revisa tu correo.')
  }
}
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 12px;
  width: 90%;
  font-size: 16px;
  color: #333;
  background-color: #fff;
  transition: border-color 0.3s;
}

.input:focus {
  border-color: #ff7043;
  outline: none;
}

.btn-primary {
  background-color: #ff7043;
  color: white;
  font-weight: bold;
  padding: 12px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  width: 95%;
  font-size: 16px;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #2f855a;
}
</style>
