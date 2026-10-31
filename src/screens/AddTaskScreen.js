import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
} from 'react-native';
import FormInput from '../components/FormInput';
import { colors } from '../constants/colors';
import { spacing, radius } from '../constants/spacing';

const CATEGORIES = ['Personal', 'Trabajo', 'Estudio'];
const MIN_TITLE_LENGTH = 5;
const MIN_DESCRIPTION_LENGTH = 10;

// Recibe los valores del formulario y devuelve un objeto con los errores.
// Si el objeto está vacío, el formulario es válido.
function validateForm({ title, description, category }) {
  const errors = {};
  const cleanTitle = title.trim();
  const cleanDescription = description.trim();

  if (!cleanTitle) {
    errors.title = 'El título es obligatorio.';
  } else if (cleanTitle.length < MIN_TITLE_LENGTH) {
    errors.title = `El título debe tener al menos ${MIN_TITLE_LENGTH} caracteres.`;
  }

  if (!cleanDescription) {
    errors.description = 'La descripción es obligatoria.';
  } else if (cleanDescription.length < MIN_DESCRIPTION_LENGTH) {
    errors.description = `La descripción debe tener al menos ${MIN_DESCRIPTION_LENGTH} caracteres.`;
  }

  if (!CATEGORIES.includes(category)) {
    errors.category = 'Selecciona una categoría.';
  }

  return errors;
}

export default function AddTaskScreen() {
  // Componentes controlados: cada campo tiene su propio estado
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);

  // touched: el usuario ya salió del campo al menos una vez
  // submitted: el usuario ya intentó guardar
  const [touched, setTouched] = useState({ title: false, description: false });
  const [submitted, setSubmitted] = useState(false);

  const errors = validateForm({ title, description, category });
  const hasErrors = Object.keys(errors).length > 0;

  // El error de un campo solo se muestra si el usuario interactuó con él
  // o si ya intentó enviar el formulario
  const getError = (field) =>
    touched[field] || submitted ? errors[field] : undefined;

  // Tras un intento fallido, el botón queda deshabilitado hasta corregir los errores
  const isSaveDisabled = submitted && hasErrors;

  const markTouched = (field) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory(CATEGORIES[0]);
    setTouched({ title: false, description: false });
    setSubmitted(false);
  };

  const handleAddTask = () => {
    setSubmitted(true);
    if (hasErrors) return;

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      category,
      createdAt: new Date().toISOString(),
    };

    // Simulación de API: más adelante esto irá a Redux y Firebase
    console.log('Nueva tarea capturada:', newTask);
    Alert.alert('Éxito', 'Tarea capturada localmente');
    resetForm();
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Nueva tarea</Text>
        <Text style={styles.subtitle}>Completa los datos para crear tu tarea.</Text>

        <FormInput
          label="Título"
          placeholder="Ej: Preparar presentación"
          value={title}
          onChangeText={setTitle}
          onBlur={() => markTouched('title')}
          error={getError('title')}
          autoCapitalize="sentences"
          keyboardType="default"
          returnKeyType="done"
          maxLength={60}
        />

        <FormInput
          label="Descripción"
          placeholder="Describe qué hay que hacer"
          value={description}
          onChangeText={setDescription}
          onBlur={() => markTouched('description')}
          error={getError('description')}
          autoCapitalize="sentences"
          multiline
          maxLength={300}
        />

        <Text style={styles.label}>Categoría</Text>
        <View style={styles.categoryRow}>
          {CATEGORIES.map((item) => {
            const isSelected = item === category;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.chip, isSelected ? styles.chipSelected : null]}
                onPress={() => setCategory(item)}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.chipText, isSelected ? styles.chipTextSelected : null]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {submitted && errors.category ? (
          <Text style={styles.errorText}>{errors.category}</Text>
        ) : null}

        <TouchableOpacity
          style={[styles.button, isSaveDisabled ? styles.buttonDisabled : null]}
          onPress={handleAddTask}
          disabled={isSaveDisabled}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Guardar tarea</Text>
        </TouchableOpacity>

        {isSaveDisabled ? (
          <Text style={styles.helperText}>Corrige los errores para poder guardar.</Text>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xl * 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textMuted,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  chip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  chipTextSelected: {
    color: colors.surface,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginBottom: spacing.md,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
  },
  helperText: {
    color: colors.danger,
    fontSize: 13,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});