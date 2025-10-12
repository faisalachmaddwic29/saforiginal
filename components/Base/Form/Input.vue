<template>
  <div class="relative flex flex-col">
    <label v-if="labelText" :for="id" class="mb-1 font-bold text-sm">
      {{ labelText }}
      <span v-if="isRequiredLabel" class="text-red-500 ms-1">*</span>
    </label>

    <div class="relative">
      <input
        :id="id"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :value="displayValue"
        :class="computedClasses"
        :disabled="disabled"
        :readonly="readOnly"
        :autocomplete="autoComplete ? 'off' : ''"
        @focus="handleFocus"
        @input="handleInput"
        @keypress="handleKeypress"
        @blur="handleBlur"
      />
      <div v-if="isIcon" :class="['absolute top-1/2 mt-0.5 transform -translate-y-1/2 text-xl text-subtle', iconPosition === 'left' ? 'left-3' : 'right-3']">
        <slot name="icon">{{ icon }}</slot>
      </div>
    </div>

    <FormMessageError v-if="error" :message="error" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  modelValue: { type: [String, Number], default: '' },
  disabled: { type: Boolean, default: false },
  readOnly: { type: Boolean, default: false },
  isIcon: { type: Boolean, default: false },
  icon: { type: String, default: '' },
  iconPosition: { type: String, default: 'left' },
  className: { type: String, default: '' },
  labelText: { type: String, default: '' },
  error: { type: String, default: undefined },
  id: { type: String, default: '' },
  name: { type: String, default: '' },
  autoComplete: { type: Boolean, default: false },
  isRequiredLabel: { type: Boolean, default: false },
  isNumber: { type: Boolean, default: false },
  isCurrency: { type: Boolean, default: false },
  /** 🔥 Tambahan: bisa aktifkan auto-select pas focus */
  isSelected: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue', 'blur']);

const baseClasses =
  'w-full font-manrope text-sm md:text-base ring-none placeholder-[#C5C5C5] dark:placeholder-[rgba(197,197,197,0.2)] border border-[#C5C5C5] dark:border-[rgba(197,197,197,0.2)] transition duration-300 ease-in-out rounded-lg outline-none focus:border-[var(--primary)] dark:focus:border-[var(--primary)] px-4 py-3 appearance-none';

const computedClasses = computed(() => {
  const classes = [
    baseClasses,
    props.disabled ? 'cursor-not-allowed' : '',
    props.readOnly ? 'bg-gray-100 cursor-default' : '',
    props.isIcon && (props.iconPosition === 'left' ? 'pl-10' : 'pr-10'),
    props.icon && (props.iconPosition === 'left' ? 'pl-10' : 'pr-10'),
    props.error ? '!border-red-500 !focus:ring-red-200 !focus:border-red-500' : '',
    props.className,
  ];
  return classes.filter(Boolean).join(' ');
});

// ===== Logic tambahan =====
let textSelected = false; // tracking seleksi text

const handleFocus = (event: FocusEvent) => {
  const input = event.target as HTMLInputElement;

  if (props.isSelected) {
    input.select(); // auto-select text saat fokus
    textSelected = true;
  } else {
    textSelected = false;
  }
};

const handleBlur = (event: FocusEvent) => {
  textSelected = false;
  emit('blur', event);
};

// format angka ke 1.000.000
const formatCurrency = (val: string | number) => {
  if (!val) return '';
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// value tampil di input
const displayValue = computed(() => {
  if (props.isCurrency && props.modelValue !== '') {
    return formatCurrency(props.modelValue.toString().replace(/\D/g, ''));
  }
  return props.modelValue;
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value = target.value;

  // kalau text di-select semua, langsung replace total value
  if (textSelected) {
    value = value.slice(-1); // ambil karakter terakhir yang diketik
    textSelected = false;
  }

  if (props.isCurrency) {
    // Ambil hanya angka
    let rawValue = value.replace(/\D/g, '');

    // ❌ Hapus angka nol di depan (kecuali nilainya benar-benar 0)
    rawValue = rawValue.replace(/^0+(?!$)/, '');

    emit('update:modelValue', rawValue);
    target.value = formatCurrency(rawValue);
    return;
  }

  if (props.isNumber) {
    value = value.replace(/[^0-9]/g, '');
  }

  emit('update:modelValue', value);
};

const handleKeypress = (event: KeyboardEvent) => {
  if (props.isNumber || props.isCurrency) {
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter'];
    const isNumber = /^[0-9]$/.test(event.key);
    if (!isNumber && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
};
</script>
