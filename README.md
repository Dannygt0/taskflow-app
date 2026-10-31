\# TaskFlow



Aplicación móvil de gestión de tareas desarrollada con React Native y Expo (Managed Workflow).



\## Checkpoint 2: Pantallas iniciales y tarjeta de perfil



Pantallas visualizadas en el emulador:



\- ProfileScreen: muestra mi perfil usando el componente ProfileCard.

\- HomeScreen: muestra el encabezado de tareas y reutiliza ProfileCard con distintos datos (sección Equipo).



El componente ProfileCard recibe por props name, role e image, y no contiene datos fijos.



\## Estructura



\- src/components: componentes reutilizables (ProfileCard, StatusBadge)

\- src/screens: pantallas (HomeScreen, ProfileScreen)

\- src/constants: colores y espaciados globales

\- src/assets: imágenes y fuentes locales



\## Ejecutar localmente



&#x20;   git clone https://github.com/Dannygt0/taskflow-app.git

&#x20;   cd taskflow-app

&#x20;   npm install

&#x20;   npx expo start



\## Checkpoint 3: Formulario de creación de tareas



Rama de trabajo: feature/add-task-form



\- AddTaskScreen: formulario con título, descripción y categoría.

\- Componentes controlados con useState (value + onChangeText).

\- Validaciones: título obligatorio (mín. 5 caracteres), descripción obligatoria (mín. 10 caracteres) y categoría seleccionada por defecto.

\- Los errores aparecen debajo de cada campo después de tocar el campo o intentar guardar.

\- El borde del input cambia de color en foco o con error.

\- Al guardar, se muestra un Alert, se imprime la tarea en consola y el formulario se limpia.

\- KeyboardAvoidingView evita que el teclado tape los campos.

