import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { spacing, radius } from '../constants/spacing';

// Ítem de la lista: tocar la tarjeta abre el detalle,
// tocar el círculo marca o desmarca la tarea como completada.
export default function TaskItem({ task, onPress, onToggle }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <TouchableOpacity
        style={[styles.checkbox, task.completed ? styles.checkboxChecked : null]}
        onPress={onToggle}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        {task.completed ? <Text style={styles.checkmark}>✓</Text> : null}
      </TouchableOpacity>

      <View style={styles.info}>
        <Text
          style={[styles.title, task.completed ? styles.titleCompleted : null]}
          numberOfLines={1}
        >
          {task.title}
        </Text>
        <Text style={styles.category}>{task.category}</Text>
      </View>

      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.sm + 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  checkmark: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  category: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  chevron: {
    fontSize: 26,
    color: colors.textMuted,
    marginLeft: spacing.sm,
  },
});