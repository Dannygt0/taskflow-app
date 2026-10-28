import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { spacing, radius } from '../constants/spacing';

export default function StatusBadge({ label }) {
  return (
    <View style={styles.badge}>
      <View style={styles.dot} />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.successLight,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.success,
    marginRight: spacing.sm,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.success,
  },
});