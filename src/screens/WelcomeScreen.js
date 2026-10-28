import { View, Text, StyleSheet } from 'react-native';
import StatusBadge from '../components/StatusBadge';
import { colors } from '../theme/colors';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TaskFlow</Text>
      <Text style={styles.subtitle}>Checkpoint 1: Estructura Base</Text>
      <StatusBadge label="Estructura base lista" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 24,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.textLight,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMuted,
    marginTop: 8,
  },
});