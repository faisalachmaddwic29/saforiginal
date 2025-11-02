<script lang="ts" setup>

interface Props {
	fields: number,
	isError?: boolean
}

interface Emits {
	(e: "update:modelValue", value: string | null): void
}

// Mendefinisikan props
const props : Props = defineProps({
		fields: {
			type: Number,
			default: 6
		},
		isError: {
			type: Boolean,
			default: false
		}
});

// Mendefinisikan emitters
const emit : Emits = defineEmits(["update:modelValue"]);

// Data untuk menyimpan nilai dari setiap input
// const data : Data = ref<>(Array(props.fields).fill(null));

const data = ref<Array<string | null>>(Array(props.fields).fill(null));

// Memperbarui modelValue ketika data berubah
watch(
    data,
    (newVal) => {
        const otp = newVal.join("");
        if (otp.length === props.fields && !otp.includes("null")) {
            emit("update:modelValue", otp);
        } else {
            emit("update:modelValue", null);
        }
    },
    { deep: true }
);

// Menangani input OTP
const handleOtpInput = (e: Event, index: number) => {
    const input = e.target as HTMLInputElement;
    if (!input) return;
    if (input.value && index < props.fields - 1) {
        const nextInput = input.nextElementSibling as HTMLInputElement | null;
        nextInput?.focus();
    } else if (!input.value && index > 0) {
        const previousInput =
            input.previousElementSibling as HTMLInputElement | null;
        previousInput?.focus();
    }
};

// Menangani paste
const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData?.getData("text");
    if (pasteData && pasteData.length === props.fields) {
        pasteData.split("").forEach((char, index) => {
            data.value[index] = char;
        });
    }
};

// Fokus ke input pertama setelah mount
onMounted(() => {
    nextTick(() => {
        const firstInput = document.querySelector(".otp input");
        if (firstInput) {
            (firstInput as HTMLElement).focus();
        }
    });
});
</script>

<template>
    <div class="otp w-full flex gap-4 md:gap-8 justify-center flex-wrap">
        <input
            v-for="(field, index) in props.fields"
            :key="field + index"
            v-model="data[index]"
            type="text"
            maxlength="1"
            class="font-manrope text-bold text-2xl w-[36px] h-[40px] md:w-[46.5px] md:h-[50px] rounded-md border text-center focus:border-secondary focus:outline-none"
            :class="props.isError ? '!border-red-500' : 'border-[#C5C5C5]'"
            @input="handleOtpInput($event, index)"
						@paste="index === 0 && handlePaste($event)"
        >
    </div>
</template>
