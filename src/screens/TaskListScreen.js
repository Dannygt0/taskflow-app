import { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { listenToUserTasks } from '../services/taskService';
import { setTasks, addTaskAsync } from '../store/slices/tasksSlice';
import { toggleTaskStatusAsync } from '../store/slices/tasksSlice';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import EmptyState from '../components/EmptyState';
import { colors, gradients } from '../constants/colors';
import { spacing } from '../constants/spacing';

export default function TaskListScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);
  const isLoading = useSelector((state) => state.tasks.isLoading);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) return;

    // Configurar listener en tiempo real
    const unsubscribe = listenToUserTasks(user.uid, (updatedTasks) => {
      dispatch(setTasks(updatedTasks));
    });

    return unsubscribe;
  }, [user, dispatch]);

  const handleSelectTask = (task) => {
    navigation.navigate('TaskDetail', { taskId: task.id });
  };

  const handleAddTask = (formData) => {
    if (!user) return;
    dispatch(addTaskAsync({ userId: user.uid, taskData: formData }));
  };

  const handleToggleTask = (task) => {
    dispatch(toggleTaskStatusAsync({
      taskId: task.id,
      currentStatus: task.completed,
    }));
  };

  const pendingCount = tasks.filter((task) => !task.completed).length;

  if (isLoading && tasks.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

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
            onToggle={() => handleToggleTask(item)}
          />
        )}
        ListHeaderComponent={
          <View>
            <LinearGradient
              colors={gradients.pop}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.titleBanner}
            >
              <Text style={styles.appTitle}>TaskFlow</Text>
            </LinearGradient>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  titleBanner: {
    borderRadius: 16,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignSelf: 'flex-start',
    marginBottom: spacing.lg,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
