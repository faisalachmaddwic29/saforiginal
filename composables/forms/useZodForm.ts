import { ref, computed, watch, onMounted, shallowRef, reactive, unref } from 'vue';
import type { Ref } from 'vue';

type ZodSchema = any;

export interface UseZodFormOptions<T> {
  initialValues: T;
}

export interface UseZodFormReturn<T> {
  values: Ref<T>;
  errors: Ref<Partial<Record<keyof T, string>>>;
  isValid: Ref<boolean>;
  formReady: Ref<boolean>;
  handleSubmit: (onSuccess: (values: T) => void | Promise<void>) => (e?: Event) => void;
  reset: (newValues?: Partial<T>) => void;
  setFieldValue: (field: keyof T, value: any) => void;
  reinitialize: (newSchemaFactory: (z: any) => ZodSchema, newInitialValues?: T) => Promise<void>;
}

/**
 * Fully reactive SSR-safe Zod form composable
 */
export function useZodForm<T extends Record<string, any>>(
  schemaFactory: Ref<((z: any) => ZodSchema)> | ((z: any) => ZodSchema),
  initialValues: Ref<T> | T
): UseZodFormReturn<T> {
  const values = ref<T>({ ...(unref(initialValues) as T) }) as Ref<T>;
  const errors: Ref<Partial<Record<keyof T, string>>> = ref({});
  const formReady = ref(false);
  const isValid = computed(() => Object.keys(errors.value).length === 0);

  const schemaRef = shallowRef(schemaFactory);
  let veeValidateHandleSubmit: any = null;
  let veeSetFieldValue: any = null;
  let destroyWatchers: (() => void)[] = [];

  const resolveInitialValues = () => unref(initialValues) as T;
  const resolveSchemaFactory = () => (typeof schemaFactory === 'function' ? schemaFactory : unref(schemaFactory));

  const initForm = async () => {
    if (!import.meta.client) return;

    try {
      const [{ z }, { useForm }, { toTypedSchema }] = await Promise.all([
        import('zod'),
        import('vee-validate'),
        import('@vee-validate/zod'),
      ]);

      const schema = resolveSchemaFactory()(z);
      const initVals = { ...resolveInitialValues() };

      const { defineField, handleSubmit, errors: formErrors, setFieldValue: _setFieldValue } = useForm({
        validationSchema: toTypedSchema(schema),
        initialValues: initVals,
      });

      // Cleanup watchers lama
      destroyWatchers.forEach((stop) => stop());
      destroyWatchers = [];

      // Bind fields
      const fields: Record<string, any> = reactive({});
      for (const key in initVals) {
        const [field] = defineField(key);
        fields[key] = field;

        values.value[key] = field.value;
        const stop = watch(field, (val) => (values.value[key] = val));
        destroyWatchers.push(stop);
      }

      // Watch errors
      const stopErrors = watch(
        () => formErrors.value,
        (newErrors: Partial<Record<keyof T, string>>) => {
          errors.value = Object.assign({}, newErrors);
        },
        { deep: true }
      );
      destroyWatchers.push(stopErrors);

      veeValidateHandleSubmit = handleSubmit;
      veeSetFieldValue = _setFieldValue;

      formReady.value = true;
      console.info('✅ Zod form initialized/reactive');
    } catch (err) {
      console.error('❌ Failed to initialize form:', err);
      formReady.value = true;
    }
  };

  onMounted(() => initForm());

  // Auto reinit saat schemaFactory / initialValues berubah
  watch([() => resolveSchemaFactory(), () => resolveInitialValues()], () => {
    initForm();
  }, { deep: true });

  const handleSubmit = (onSuccess: (values: T) => void | Promise<void>) => {
    return (e?: Event) => {
      e?.preventDefault();
      if (veeValidateHandleSubmit) {
        veeValidateHandleSubmit(async (validatedValues: T) => {
          await onSuccess(validatedValues);
        })();
      } else {
        console.warn('⚠️ Form submitted without Zod validation');
        onSuccess(values.value);
      }
    };
  };

  const setFieldValue = (field: keyof T, value: any) => {
    values.value[field] = value;
    if (veeSetFieldValue) veeSetFieldValue(field as string, value);
  };

  const reset = (newValues?: Partial<T>) => {
    values.value = { ...resolveInitialValues(), ...newValues } as T;
    errors.value = {};
    formReady.value = true;
  };

  const reinitialize = async (newSchemaFactory: (z: any) => ZodSchema, newInitialValues?: T) => {
    schemaRef.value = newSchemaFactory;
    if (newInitialValues) initialValues = newInitialValues as unknown as Ref<T>;
    await initForm();
  };

  return {
    values,
    errors,
    isValid,
    formReady,
    handleSubmit,
    setFieldValue,
    reset,
    reinitialize,
  };
}
