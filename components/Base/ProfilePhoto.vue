<script setup lang="ts">

const props = defineProps<{
  name: string;
  imageUrl?: string | null // Optional URL foto profil
}>();


// Buat inisial nama
const initials = computed(() => initialName(props.name));
</script>

<template>
  <div
    class="size-15 md:size-17 aspect-square rounded-full border dark:border-blue-950 overflow-hidden flex justify-center items-center m-auto relative shadow-sm dark:shadow-blue-950"
  >
    <template v-if="props?.imageUrl">
			<!-- https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80&q=80 -->
			<NuxtImg
				:src="imageUrl ?? ''"
				alt="User profile"
				width="80"
				height="80"
				class="rounded-full object-cover"
			/>
    </template>
    <template v-else>
      <span class="font-poppins block font-medium uppercase tracking-wide text-xl text-secondary"
      >
        {{ initials }}
      </span>
    </template>
  </div>
</template>
