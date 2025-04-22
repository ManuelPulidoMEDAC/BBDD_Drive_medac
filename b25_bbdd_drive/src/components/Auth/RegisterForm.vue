<template>
  <!-- Formulario de registro -->
  <form class="form-container">
    <!-- Campo para ingresar correo electrónico -->
    <input
      type="email"
      placeholder="Correo electrónico"
      class="input"
    >
    <!-- Campo para ingresar la contraseña -->
    <input
      type="password"
      placeholder="Contraseña"
      class="input"
    >
    <!-- Campo para repetir la contraseña -->
    <input
      type="password"
      placeholder="Repetir contraseña"
      class="input"
    >
    <!-- Botón para enviar el formulario de registro -->
    <button class="btn-primary">
      Registrarse
    </button>
  </form>
</template>

<script setup>
// No es necesario importar nada, ya que no estamos utilizando ninguna librería o funcionalidad adicional
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 12px;
  width: 100%;
  font-size: 16px;
  color: #333;
  background-color: #fff;
  transition: border-color 0.3s;
}

.input:focus {
  border-color: #38a169;
  outline: none;
}

.btn-primary {
  background-color: #38a169;
  color: white;
  font-weight: bold;
  padding: 12px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #2f855a;
}
</style>
