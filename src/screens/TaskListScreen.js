import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import EmptyState from '../components/EmptyState';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';

export default function TaskListScreen() {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
    navigation.navigate('TaskList');
  };

  const handleSelectTask = (task) => {
    navigation.navigate('TaskDetail', { taskId: task.id, task });
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
  };

  const pendingCount = tasks.filter((task) => !task.completed).length;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.content}
        data={tasks}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onPress={() => handleSelectTask(item)}
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
