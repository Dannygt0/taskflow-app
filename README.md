# TaskFlow

Aplicación móvil de gestión de tareas desarrollada con React Native y Expo (Managed Workflow).

## Checkpoint 6: Estado global migrado a Redux Toolkit

### Objetivo
Centralizar la gestión del estado de tareas utilizando Redux Toolkit para sincronizar datos entre pantallas.

### Arquitectura Redux

**Store Structure:**
- `tasksSlice`: contiene el estado de tareas y filtros
  - `items`: array de tareas
  - `filter`: estado del filtro actual ('all', 'completed', 'pending')

**Reducers implementados:**
- `addTask(formData)`: agrega nueva tarea con ID único
- `toggleTaskStatus(taskId)`: marca/desmarca tarea como completada
- `deleteTask(taskId)`: elimina tarea del store
- `setFilter(filterType)`: actualiza filtro global

**Integración:**
- `App.js`: envuelto con `<Provider store={store}>`
- Todas las pantallas usan `useSelector` para leer estado
- `useDispatch` para ejecutar acciones

### Características

✅ Estado centralizado en Redux  
✅ Sincronización instantánea entre pantallas  
✅ Tareas persisten al navegar  
✅ Toggle de estado en pantalla de detalle  
✅ Eliminación de tareas desde detalle  
✅ Sin useState para datos de tareas  

## Checkpoint 5: Navegación consolidada con React Navigation

### Objetivo
Integrar una navegación profesional usando React Navigation con estructura anidada:
- **BottomTabNavigator**: navegación por pestañas (Tareas / Perfil)
- **NativeStackNavigator**: flujo de tareas dentro de la pestaña Home
  - TaskListScreen: lista de tareas
  - TaskDetailScreen: detalle de una tarea
  - TaskFormScreen: crear nueva tarea

### Arquitectura de Navegación

```
AppNavigator (NavigationContainer)
└── AppTabs (BottomTabNavigator)
    ├── Home (Tab)
    │   └── TaskListStack (NativeStackNavigator)
    │       ├── TaskList (initialRoute)
    │       ├── TaskDetail
    │       └── TaskForm
    └── Profile (Tab)
        └── ProfileScreen
```

### Características implementadas

1. **Navegación por Pestañas**: 
   - Pestaña "Tareas" con icono de home
   - Pestaña "Perfil" con icono de persona
   - Iconos dinámicos según el estado (enfocado/desenfocado)

2. **Flujo de Tareas**:
   - Seleccionar una tarea navega a TaskDetailScreen con parámetros
   - El detalle recibe el objeto completo de la tarea vía `route.params`
   - Botón "Volver" usa `navigation.goBack()`
   - Crear nueva tarea ejecuta `navigation.navigate('TaskForm')`

3. **Paso de Parámetros**:
   - `navigation.navigate('TaskDetail', { taskId, task })`
   - `useRoute()` para capturar los parámetros en TaskDetailScreen

4. **Interactividad**:
   - Tocar una tarea abre el detalle
   - Checkbox marca/desmarca sin navegar
   - Botones de navegación funcionan correctamente

### Estructura de carpetas

```
/src
  /navigation
    AppNavigator.js       ← Configuración principal de navegación
  /screens
    TaskListScreen.js     ← Lista con FlatList
    TaskDetailScreen.js   ← Detalle con parámetros
    TaskFormScreen.js     ← Formulario envuelto en Stack
    ProfileScreen.js      ← Perfil de usuario
  /components
    TaskForm.js           ← Formulario de creación
    TaskItem.js           ← Ítem de lista
    EmptyState.js         ← Estado vacío
    FormInput.js          ← Input controlado
    ProfileCard.js        ← Tarjeta de perfil
    StatusBadge.js        ← Badge de estado
  /constants
    colors.js             ← Paleta de colores
    spacing.js            ← Espaciados y radios
```

### Dependencias principales

- `@react-navigation/native` - Contenedor de navegación
- `@react-navigation/bottom-tabs` - Navegador de pestañas
- `@react-navigation/native-stack` - Stack Navigator
- `react-native-gesture-handler` - Manejo de gestos
- `react-native-reanimated` - Animaciones
- `@expo/vector-icons` - Iconos (Ionicons)

### Ejecutar localmente

```bash
git clone https://github.com/usuario/taskflow-app.git
cd taskflow-app
npm install
npx expo start

# Escanear con Expo Go o ejecutar en emulador
```

### Próximos pasos

- **Módulo 6 (Redux Toolkit)**: Centralizar estado de tareas en un store global
- **Módulo 7 (Firebase)**: Persistencia de datos y autenticación
- **Módulo 8 (Pulido final)**: Transiciones, cámara, preparación para producción

### Notas de desarrollo

- Las tareas se guardan en estado local (`useState`). Para persistencia permanente, usar Redux + Firebase en próximos módulos
- La navegación gestiona automáticamente el header nativo en iOS/Android
- Los parámetros se pasan explícitamente en cada `navigate()` para mayor control
- `useNavigation()` y `useRoute()` se usan en los componentes de pantalla para acceder a funciones de navegación
