<template>
  <div class="relative flex flex-col">
    <label v-if="labelText" :for="id" class="mb-1 font-bold text-sm"> {{ labelText }}<span v-if="isRequiredLabel" class="text-red-500 ms-1">*</span> </label>
    <div class="relative">
      <input
        :id="id"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :class="computedClasses"
        :disabled="disabled"
        :readonly="readOnly"
        :autocomplete="autoComplete ? 'off' : ''"
        @input="handleInput"
        @keypress="handleKeypress"
        @blur="$emit('blur', $event)"
      />
      <div v-if="isIcon" :class="['absolute top-1/2 mt-0.5 transform -translate-y-1/2 text-xl text-subtle', iconPosition === 'left' ? 'left-3' : 'right-3']">
        <slot name="icon">{{ icon }}</slot>
      </div>
    </div>
    <!-- Error message -->
    <FormMessageError v-if="error" :message="error" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  modelValue: { type: String, default: '' }, // Ganti dari 'value' ke 'modelValue'
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

// Handle input untuk filtering angka
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value = target.value;

  if (props.isNumber) {
    // Hanya izinkan angka
    value = value.replace(/[^0-9]/g, '');
  }

  emit('update:modelValue', value);
};

// Handle keypress untuk mencegah karakter non-angka
const handleKeypress = (event: KeyboardEvent) => {
  if (props.isNumber) {
    // Izinkan: angka (0-9), backspace, delete, tab, escape, enter
    const allowedKeys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter'];
    const isNumber = /^[0-9]$/.test(event.key);

    if (!isNumber && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
};
</script>
