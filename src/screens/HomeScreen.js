import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ProfileCard from '../components/ProfileCard';
import StatusBadge from '../components/StatusBadge';
import { colors } from '../constants/colors';
import { spacing, radius } from '../constants/spacing';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>TaskFlow</Text>
      <Text style={styles.subtitle}>Mis tareas</Text>
      <StatusBadge label="Pantallas iniciales listas" />

      <View style={styles.emptyBox}>
        <Text style={styles.emptyText}>
          Aún no tienes tareas. Pronto podrás crearlas desde aquí.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Equipo</Text>
      <ProfileCard
        name="Ana López"
        role="Diseñadora UX"
        image="https://i.pravatar.cc/150?img=5"
      />
      <ProfileCard
        name="Carlos Pérez"
        role="Product Manager"
        image="https://i.pravatar.cc/150?img=33"
      />
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textMuted,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  emptyBox: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: radius.md,
    padding: spacing.lg,
    marginVertical: spacing.lg,
  },
  emptyText: {
    color: colors.textMuted,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.md,
  },
});