<template>
  <div class="container">
    <!-- Título principal de la página -->
    <h1>Bienvenido</h1>

    <!-- Tarjeta que contiene las pestañas de Login y Registro -->
    <div class="card">
      <div class="tabs">
        <!-- Botón para activar la pestaña de Login -->
        <button
          :class="tabClass('login')"
          class="tab-button"
          @click="activeTab = 'login'"
        >
          Login
        </button>

        <!-- Botón para activar la pestaña de Registro -->
        <button
          :class="tabClass('register')"
          class="tab-button"
          @click="activeTab = 'register'"
        >
          Registro
        </button>
      </div>

      <!-- Se muestra el componente correspondiente (Login o Registro) según la pestaña activa -->
      <component
        :is="activeTabComponent"
        @login-success="handleLoginSuccess"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import LoginForm from '@/components/Auth/LoginForm.vue'
import RegisterForm from '@/components/Auth/RegisterForm.vue'

const activeTab = ref('login') // Estado que mantiene la pestaña activa (Login o Registro)

const activeTabComponent = computed(() =>
  activeTab.value === 'login' ? LoginForm : RegisterForm
) // Computed property que cambia el componente mostrado según la pestaña activa

const router = useRouter() // Instancia del enrutador de Vue para la navegación

// Función que maneja el éxito del login y redirige al usuario
function handleLoginSuccess () {
  router.push({ name: 'Landing' }) // Redirige al usuario a la página de aterrizaje tras un login exitoso
}

// Función para aplicar clases dinámicas a los botones de las pestañas
function tabClass (tab) {
  return activeTab.value === tab ? 'tab-button-active' : 'tab-button'
}
</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 0 16px;
  min-height: 100vh;
  background: linear-gradient(135deg, #4b6bfb, #ff7043);
}

h1 {
  font-size: 48px;
  color: white;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 32px;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  animation: fadeInDown 1s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  background-color: white;
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 420px;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 24px;
}

.tab-button {
  padding: 14px 30px;
  border: none;
  background-color: #e4e7ef;
  color: #222;
  font-weight: 600;
  font-size: 16px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.tab-button:hover {
  background-color: #d4d9e4;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.tab-button-active {
  background-color: #4b6bfb;
  color: white;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.input {
  padding: 16px;
  border: 2px solid #d1d9e6;
  border-radius: 8px;
  width: 100%;
  font-size: 16px;
  margin-bottom: 16px;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

.input:focus {
  border-color: #4b6bfb;
  outline: none;
  box-shadow: 0 0 12px rgba(75, 107, 251, 0.2);
}

.btn-primary {
  background-color: #4b6bfb;
  color: white;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 90%;
  transition: all 0.8s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.btn-primary:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(2px);
}
</style>
