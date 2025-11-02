<template>
  <div class="relative px-4 py-5 w-full">
    <div class="">
      <div class="flex flex-col gap-8 text-title text-sm">
        <NuxtLink to="/account/change-email" class="flex justify-between gap-3 items-center">
          <p class="text-base text-title">Email</p>
          <div class="flex gap-2 items-center">
            <p class="text-base text-title font-semibold">{{ user?.email }}</p>
            <Icon name="material-symbols-light:arrow-forward-ios-rounded" class="w-6 h-6 text-lg" />
          </div>
        </NuxtLink>
        <NuxtLink to="/account/change-phone" class="flex justify-between gap-3 items-center">
          <p class="text-base text-title">No Hanphone</p>
          <div class="flex gap-2 items-center">
            <p class="text-base text-title font-semibold">{{ maskingPhone(user?.phone ?? '') }}</p>
            <Icon name="material-symbols-light:arrow-forward-ios-rounded" class="w-6 h-6 text-lg" />
          </div>
        </NuxtLink>
        <NuxtLink to="/account/change-password" class="flex justify-between gap-3 items-center">
          <p class="text-base text-title">Password</p>
          <Icon name="material-symbols-light:arrow-forward-ios-rounded" class="w-6 h-6 text-lg" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const title = 'Keamanan & Akun';

definePageMeta({
  layout: 'detail',
  middleware: 'auth',
  isPaddingTop: true,
  isPaddingBottom: true,
  title: title,
});

useSeoMeta({
  title: title,
});

const authStore = useAuthStore();

onMounted(async () => {
  if (!authStore.user) {
    // Pulihkan user dari cookie jika hilang
    await authStore.getUser();
  }
});
const user = computed(() => authStore.user);
</script>
