# TaskFlow

Aplicación móvil de gestión de tareas con React Native y Expo. Cada usuario tiene sus propias tareas y su foto de perfil, sincronizadas en la nube con Firebase.

## Características

- Registro e inicio de sesión con email y contraseña (Firebase Auth)
- Sesión persistente: al reabrir la app seguís logueado
- Crear, completar, ver detalle y eliminar tareas (Firestore, en tiempo real)
- Tareas separadas por usuario
- Perfil con foto tomada de la galería (expo-image-picker), guardada en Firebase Storage
- Estado global con Redux Toolkit
- Navegación con Bottom Tabs (Tareas, Perfil) y Stack (lista, detalle, formulario, login)

## Requisitos

- Node.js 20 o superior
- App **Expo Go** instalada en tu teléfono (Android o iOS)
- Un proyecto de Firebase con Authentication, Firestore y Storage habilitados

## Instalación

```bash
npm install
```

### Configurar Firebase

1. Copiá el archivo de ejemplo:
   ```bash
   cp src/config/firebaseConfig.example.js src/config/firebaseConfig.js
   ```
2. En Firebase Console → Configuración del proyecto → Tus apps, copiá el objeto `firebaseConfig` y reemplazá los valores en `src/config/firebaseConfig.js`.
3. Habilitá **Authentication → Email/Password**.
4. Creá la base de datos **Firestore** y pegá estas reglas en *Rules*:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /tasks/{taskId} {
         allow read, update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
         allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
       }
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```
5. Habilitá **Storage** y pegá estas reglas en *Rules*:
   ```
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /avatars/{file} {
         allow read: if request.auth != null;
         allow write: if request.auth != null && file == request.auth.uid + '.jpg';
       }
     }
   }
   ```

`src/config/firebaseConfig.js` no se sube al repositorio (está en `.gitignore`), por eso hay que crearlo en cada copia del proyecto.

### Ejecutar

```bash
npx expo start
```

Escaneá el código QR con Expo Go (Android) o con la cámara (iOS). Para ver cambios en vivo, dejá la terminal abierta.

## Estructura

```
src/
├── components/     Componentes reutilizables (TaskItem, TaskForm, ProfileCard, ...)
├── config/         Inicialización de Firebase (Auth, Firestore, Storage)
├── constants/      Paleta de colores, degradados y espaciados
├── navigation/     Navegadores: Auth, Tabs y Stack de tareas
├── screens/        Pantallas
├── services/       Acceso a Firestore (tareas) y Storage (avatar)
└── store/          Redux Toolkit: store y slices de auth y tareas
```

## Modelo de datos

```
tasks/{taskId}
├── userId        (string)  uid del dueño
├── title         (string)
├── description   (string)
├── category      (string)  Personal | Trabajo | Estudio
├── completed     (boolean)
└── createdAt     (string, ISO 8601)

users/{uid}
└── avatarUrl     (string)  URL de la foto en Storage

Storage: avatars/{uid}.jpg
```

## Capturas

<!-- Agregar capturas o un GIF del flujo: login, lista de tareas, detalle y perfil -->

## Build y publicación

Para compartir la app con Expo Go hay que publicar una actualización:

```bash
npx eas-cli@latest login
npx eas-cli@latest init
npx eas-cli@latest update --branch production --message "Entrega final"
```

El link de Expo Go queda en `https://expo.dev/@<tu-usuario>/taskflow-app`.
