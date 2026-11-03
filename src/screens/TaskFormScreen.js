import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TaskForm from '../components/TaskForm';
import { colors } from '../constants/colors';
import { spacing, radius } from '../constants/spacing';

export default function TaskFormScreen() {
  const navigation = useNavigation();

  const handleAddTask = (newTask) => {
    // Aquí podrías hacer la lógica de agregar la tarea
    // Por ahora, simplemente navegamos de vuelta a la lista
    navigation.navigate('TaskList');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>‹ Cancelar</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Nueva Tarea</Text>
      </View>

      <View style={styles.formContainer}>
        <TaskForm onAddTask={handleAddTask} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xl * 2,
  },
  header: {
    marginBottom: spacing.xl,
  },
  backButton: {
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  backText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  formContainer: {
    marginBottom: spacing.xl,
  },
});
