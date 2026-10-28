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

