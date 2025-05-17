En este documento se procede a explicar el funcionamiento del proyecto.

El proyecto b25_bbdd_drive consta de 2 vistas(views) principales (LogingPage y LandingPage.)

1.LogingPage.vue permite a los usuarios iniciar sesión mediante una interfaz sencilla con pestañas;
Una vez el usuario ha sido logeado el sistema diferencia entre 2 tipos de usuario (Admin y profesor),
en base al tipo de usuario el componente LogingPage.vue mostrará consumo o consulta de recursos y/o Panel ADMIN.

En LogingPage tenemos las siguiente funciones:

activeTab: controla la pestaña activa. Por defecto es 'login'.

activeTabComponent: retorna el componente correspondiente a la pestaña activa.

handleLoginClick(): cambia la pestaña a login y recarga la página.

handleLoginSuccess(): redirige al usuario a la vista 'Landing' tras iniciar sesión.

tabClass(tab): devuelve clases dinámicas para estilizar la pestaña activa.

2.El componente LandingPage.vue nos permite mediante la selección de curso/año/asignatura consumir o consultar un recurso
almacenados en SUPABASE mediante URLs.
 es la página principal del sistema una vez que el usuario ha iniciado sesión correctamente. 
 Desde aquí se gestiona la interacción con los recursos educativos, ciclos, cursos y asignaturas, 
 así como la administración de usuarios (en caso de ser superadmin).
También podemos crear recursos desde una interfaz sencilla.

En caso de ser ADMIN tendremos disponible un panel de control donde podemos Añadir,editar y borrar users,
añadir,editar y borrar recursos.

📌 Características principales
🔐 Autenticación
Verifica si hay un usuario autenticado al montar el componente.

Detecta si el usuario tiene privilegios de superadmin.

Permite cerrar sesión (logout).

📂 Gestión de recursos
Subida de recursos por tipo: documento, enlace, etc.

Validación de campos antes de guardar.

Subida de archivos a Supabase Storage.

Inserción de metadatos en la base de datos recursos.

Modal de formulario para añadir recursos.

Carga dinámica de recursos según asignatura seleccionada.

🧑‍🏫 Gestión de usuarios (solo para superadmin)
Añadir nuevos usuarios a la plataforma.

Generar contraseñas aleatorias.

Alta en Supabase Auth y posterior inserción en la tabla profesores.

Feedback visual de errores o éxito en el alta.

Carga dinámica de centros educativos y asignaturas.

Visualización de lista de usuarios (gestión pendiente de eliminar usuarios).

📚 Datos académicos
Carga de:

Ciclos formativos

Cursos

Asignaturas

Selección dinámica que filtra en cascada:
Ciclo → Curso → Asignatura

Recarga de recursos según la asignatura seleccionada.

🧠 Variables y estados destacados
Variable	Descripción
user	Objeto con información del usuario autenticado
superadmin	Booleano que indica si el usuario tiene permisos de admin
selectedCiclo, selectedCurso, selectedAsignatura	Estados reactivos para filtros académicos
newUser	Objeto con datos del nuevo usuario a registrar
newResource	Objeto con datos del recurso que se va a subir
recursosList	Lista de recursos ya existentes para una asignatura
showAddResourceModal	Booleano que controla la visibilidad del modal de recursos

En LandingPage tenemos las siguientes funciones:

generatePassword(): genera una contraseña segura aleatoria.

toggleMenu() y closeAdminModal(): control de interfaz para menú y modales.

handleFileUpload(): carga el archivo al estado antes de enviarlo.

submitNewResource(): función que gestiona todo el flujo de subida de un recurso.

handleAddUser(): flujo de alta de usuarios en Supabase Auth y base de datos.

