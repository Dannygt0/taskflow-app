import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import EmptyState from '../components/EmptyState';
import TaskDetailScreen from './TaskDetailScreen';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';

export default function HomeScreen() {
  // Lista de tareas (empieza vacía para mostrar el estado vacío)
  const [tasks, setTasks] = useState([]);
  // Tarea seleccionada: si tiene valor, se muestra el detalle en lugar de la lista
  const [selectedTask, setSelectedTask] = useState(null);

  const handleAddTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setSelectedTask(null);
  };

  // Navegación simulada: con una tarea seleccionada, se oculta
  // el formulario y la lista, y se muestra el detalle
  if (selectedTask) {
    return (
      <TaskDetailScreen
        task={selectedTask}
        onBack={() => setSelectedTask(null)}
        onDelete={handleDeleteTask}
      />
    );
  }

  const pendingCount = tasks.filter((task) => !task.completed).length;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* El formulario va como encabezado de la FlatList para evitar
          anidar listas dentro de un ScrollView */}
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.content}
        data={tasks}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onPress={() => setSelectedTask(item)}
            onToggle={() => handleToggleTask(item.id)}
          />
        )}
        ListHeaderComponent={
          <View>
            <Text style={styles.appTitle}>TaskFlow</Text>
            <TaskForm onAddTask={handleAddTask} />
            <View style={styles.listHeader}>
              <Text style={styles.sectionTitle}>Mis tareas</Text>
              {tasks.length > 0 ? (
                <Text style={styles.counter}>{pendingCount} pendiente(s)</Text>
              ) : null}
            </View>
          </View>
        }
        // Renderizado condicional: se muestra solo cuando tasks.length === 0
        ListEmptyComponent={
          <EmptyState message="¡No tienes tareas pendientes! Empieza por crear una arriba." />
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xl * 2,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.lg,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  counter: {
    fontSize: 14,
    color: colors.textMuted,
  },
});