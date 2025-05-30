<template>
  <div
    class="bg-white text-[#1E293B] dark:bg-[#0F172A] dark:text-white min-h-dvh w-screen antialiased flex flex-col"
  >
    <header
      class="fixed w-full top-0 bg-white/80 dark:bg-[#0F172A]/80 shadow-[0px_2px_4px_rgba(0,0,0,0.1)] h-[70px] max-h-[70px] backdrop-filter backdrop-blur"
    >
      <PageContainer class="flex items-center justify-between px-4 py-5">
        <NuxtLink to="/">
          <NuxtImg src="/images/logos/logo.svg" alt="Logo" class="h-[30px]" />
        </NuxtLink>
        <NuxtLink to="/search" class="w-6 h-6">
          <Icon name="iconamoon:search" class="text-2xl text-[#627086]" />
        </NuxtLink>
      </PageContainer>
    </header>

    <main class="flex-1 w-full pb-[56px] pt-[70px]">
      <div class="max-w-container mx-auto">
        <slot />
      </div>
    </main>

    <div
      class="fixed w-full left-0 bottom-0 bg-white dark:bg-[#0F172A] shadow-[0px_-1px_0px_rgba(0,0,0,0.05)]"
    >
      <PageContainer>
        <nav>
          <ul class="flex justify-between items-center">
            <li
              v-for="menu in menus"
              :key="menu.label"
              class="flex-1 py-[8.5px] border-t-2"
              :class="isActive(menu.to) ? 'border-primary' : 'border-transparent'"
            >
              <NuxtLink
                :to="menu.to"
                class="flex flex-col gap-[1px] items-center font-manrope"
                :class="{
                  'text-primary': isActive(menu.to),
                  'text-[#94A3B8]': !isActive(menu.to),
                }"
              >
                <NuxtImg
                  :src="isActive(menu.to) ? menu.icon_active : menu.icon"
                  class="h-6 w-6"
                />
                <p class="text-xs font-semibold">{{ menu.label }}</p>
                <!-- <div v-if="isActive(menu.to)" class="mt-1 h-[2px] w-6 bg-[#8B693D] rounded-full"></div> -->
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </PageContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const menus = ref([
  {
    label: "Home",
    to: "/",
    icon: "/images/menus/home-outline.svg",
    icon_active: "/images/menus/home.svg",
  },
  {
    label: "Event",
    to: "/event",
    icon: "/images/menus/calendar-outline.svg",
    icon_active: "images/menus/calendar.svg",
  },
  {
    label: "Merchandise",
    to: "/merchandise",
    icon: "/images/menus/shopping-bag-outline.svg",
    icon_active: "/images/menus/shopping-bag.svg",
  },
  {
    label: "Event Saya",
    to: "/event-saya",
    icon: "/images/menus/ticket-outline.svg",
    icon_active: "/images/menus/ticket.svg",
  },
  {
    label: "Akun",
    to: "/akun",
    icon: "/images/menus/person-circle-outline.svg",
    icon_active: "/images/menus/person-circle.svg",
  },
]);

const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + "/");
};
</script>
