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




\## Checkpoint 4: Lista con detalle y estados vacíos



Rama de trabajo: feature/task-detail



\- HomeScreen guarda el arreglo de tareas y el estado selectedTask.

\- El formulario (TaskForm) agrega las tareas nuevas a la lista.

\- FlatList muestra las tareas; cada una se puede marcar como completada.

\- Estado vacío (EmptyState) cuando no hay tareas, mediante ListEmptyComponent.

\- Al tocar una tarea se muestra TaskDetailScreen (título, estado, categoría, fecha y descripción).

\- El botón "Volver" (y el botón atrás de Android) regresa a la lista.

\- El botón "Eliminar" borra la tarea y vuelve a la lista.

