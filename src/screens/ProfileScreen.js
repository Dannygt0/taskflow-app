import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { logout, uploadAvatarAsync, loadAvatarAsync } from '../store/slices/authSlice';
import ProfileCard from '../components/ProfileCard';
import { colors } from '../constants/colors';
import { spacing, radius } from '../constants/spacing';

const DEFAULT_AVATAR = 'https://i.pravatar.cc/150?img=12';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const avatarUri = useSelector((state) => state.auth.avatarUri);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (user) dispatch(loadAvatarAsync(user.uid));
  }, [user, dispatch]);

  const handlePickAvatar = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permiso denegado', 'Necesitamos acceso a tus fotos para cambiar el avatar.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (result.canceled || !result.assets?.length) return;

      setIsUploading(true);
      await dispatch(uploadAvatarAsync({
        userId: user.uid,
        localUri: result.assets[0].uri,
      })).unwrap();
    } catch (error) {
      console.error('Error subiendo avatar:', error?.code, error?.message);
      Alert.alert('Error', 'No se pudo guardar la foto. Revisá tu conexión e intentá de nuevo.');
    } finally {
      setIsUploading(false);
    }
  };

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
        image={avatarUri ?? DEFAULT_AVATAR}
      />
      <TouchableOpacity
        style={[styles.avatarButton, isUploading && styles.buttonDisabled]}
        onPress={handlePickAvatar}
        disabled={isUploading}
        activeOpacity={0.8}
      >
        <Text style={styles.avatarButtonText}>
          {isUploading ? 'Guardando foto...' : 'Cambiar foto'}
        </Text>
      </TouchableOpacity>
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
  avatarButton: {
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  avatarButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
