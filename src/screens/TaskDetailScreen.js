import { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  StyleSheet,
} from 'react-native';
import { colors } from '../constants/colors';
import { spacing, radius } from '../constants/spacing';

// Convierte la fecha ISO a formato dd/mm/aaaa hh:mm
function formatDate(isoString) {
  const date = new Date(isoString);
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}

export default function TaskDetailScreen({ task, onBack, onDelete }) {
  // En Android, el botón físico "atrás" también vuelve a la lista
  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onBack();
      return true;
    });
    return () => subscription.remove();
  }, [onBack]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
        <Text style={styles.backText}>‹ Volver</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <View
          style={[
            styles.statusBadge,
            task.completed ? styles.statusDone : styles.statusPending,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              task.completed ? styles.statusTextDone : styles.statusTextPending,
            ]}
          >
            {task.completed ? 'Completada' : 'Pendiente'}
          </Text>
        </View>

        <Text style={styles.title}>{task.title}</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Categoría</Text>
          <Text style={styles.value}>{task.category}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Creada</Text>
          <Text style={styles.value}>{formatDate(task.createdAt)}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.description}>{task.description}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(task.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteText}>Eliminar tarea</Text>
      </TouchableOpacity>
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
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  backText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm + 4,
    borderRadius: radius.full,
    marginBottom: spacing.md,
  },
  statusPending: {
    backgroundColor: colors.background,
  },
  statusDone: {
    backgroundColor: colors.successLight,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
  statusTextPending: {
    color: colors.textMuted,
  },
  statusTextDone: {
    color: colors.success,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm + 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
  value: {
    fontSize: 14,
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginTop: spacing.sm,
  },
  deleteButton: {
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.danger,
    alignItems: 'center',
  },
  deleteText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: 'bold',
  },
});