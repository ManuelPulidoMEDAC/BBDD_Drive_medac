module.exports = {
  // Marca este archivo como la raíz de la configuración ESLint
  root: true,

  // Entorno en el que se ejecuta el código (node para herramientas como Vite)
  env: {
    node: true,
  },

  // Reglas predefinidas que extiende esta configuración
  extends: [
    'eslint:recommended', // Reglas recomendadas por ESLint
    'plugin:vue/vue3-recommended', // Buenas prácticas para Vue 3
    'standard' // Estilo de código JavaScript estándar
  ],

  // Configura el parser para aceptar sintaxis moderna de ECMAScript
  parserOptions: {
    ecmaVersion: 2020, // Soporta ES2020
    sourceType: 'module', // Usa imports/exports
  },

  // Reglas personalizadas
  rules: {
    'vue/multi-word-component-names': 'off', // Permite nombres de componentes de una sola palabra
    'no-undef': 'off' // Desactiva errores por variables no definidas (puede ser útil si usas refs globales como `user`)
  },

  // Configuración para que ESLint entienda los alias personalizados
  settings: {
    'import/resolver': {
      alias: {
        // ULTRA IMPORTANTEEEEE Asigna el alias "@" a la carpeta "./src"
        map: [['@', './src']],
        // Extensiones que puede resolver con ese alias
        extensions: ['.js', '.vue']
      }
    }
  },
  plugins: ['import'], // Plugin para resolver imports
}
