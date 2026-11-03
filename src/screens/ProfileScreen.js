import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { logout } from '../store/slices/authSlice';
import ProfileCard from '../components/ProfileCard';
import { colors } from '../constants/colors';
import { spacing, radius } from '../constants/spacing';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi perfil</Text>
      <View style={styles.userInfo}>
        <Text style={styles.email}>{user?.email}</Text>
      </View>
      <ProfileCard
        name="Daniel Muñoz"
        role="Desarrollador Mobile"
        image="https://i.pravatar.cc/150?img=12"
      />
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.8}
      >
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
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
  userInfo: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  email: {
    fontSize: 14,
    color: colors.textMuted,
  },
  logoutButton: {
    marginTop: 'auto',
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.danger,
    alignItems: 'center',
  },
  logoutText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: 'bold',
  },
});