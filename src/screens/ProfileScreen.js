import { View, Text, StyleSheet } from 'react-native';
import ProfileCard from '../components/ProfileCard';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi perfil</Text>
      <ProfileCard
        name="Daniel Muñoz"
        role="Desarrollador Mobile"
        image="https://i.pravatar.cc/150?img=12"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    paddingTop: spacing.xl * 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.lg,
  },
});