<template>
  <nav class="fixed z-1 bg-background inset-x-0 w-full bottom-0 shadow-[0px_-2px_4px_rgba(0,0,0,0.05)]">
    <AppContainer>
      <ul class="flex justify-between items-center">
        <li
          v-for="menu in menus"
          :key="menu.label"
          class="flex-1 border-t-2 relative overflow-hidden"
          :class="[
            isActive(menu.to) ? 'border-secondary' : 'border-transparent',
            isActive(menu.to)
              ? 'before:content-[\'\'] before:absolute before:w-[72px] before:h-[72px] before:rounded-full before:m-auto before:top-[-70%] before:inset-x-0 before:bg-primary before:filter before:blur-xl before:opacity-30 before:pointer-events-none'
              : '',
          ]"
        >
          <NuxtLink
            :to="menu.to"
            class="cursor-pointer z-10 flex flex-col py-[8.5px] gap-[1px] items-center font-manrope"
            :class="{
              'text-primary': isActive(menu.to),
              'text-menu': !isActive(menu.to),
            }"
          >
            <NuxtImg :src="isActive(menu.to) ? menu.icon_active : menu.icon" class="h-6 w-6" />
            <p class="text-xs font-semibold">{{ menu.label }}</p>
          </NuxtLink>
        </li>
      </ul>
    </AppContainer>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();

const menus = ref([
  {
    label: 'Home',
    to: '/',
    icon: '/images/menus/home-outline.svg',
    icon_active: '/images/menus/home.svg',
  },
  {
    label: 'Event',
    to: '/event',
    icon: '/images/menus/calendar-outline.svg',
    icon_active: 'images/menus/calendar.svg',
  },
  // {
  //   label: "Merchandise",
  //   to: "/merchandise",
  //   icon: "/images/menus/shopping-bag-outline.svg",
  //   icon_active: "/images/menus/shopping-bag.svg",
  // },
  {
    label: 'Event Saya',
    to: '/my-event',
    icon: '/images/menus/ticket-outline.svg',
    icon_active: '/images/menus/ticket.svg',
  },
  {
    label: 'Akun',
    to: '/account',
    icon: '/images/menus/person-circle-outline.svg',
    icon_active: '/images/menus/person-circle.svg',
  },
]);

const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/');
};
</script>
