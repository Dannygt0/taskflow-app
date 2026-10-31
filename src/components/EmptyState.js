import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { spacing, radius } from '../constants/spacing';

// Se muestra cuando la lista de tareas está vacía
export default function EmptyState({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📝</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: radius.lg,
    padding: spacing.xl,
  },
  icon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  message: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
});