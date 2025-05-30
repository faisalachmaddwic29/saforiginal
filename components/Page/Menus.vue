<template>
  <nav
    class="fixed w-full z-10 bottom-0 bg-white dark:bg-[#0F172A] shadow-[0px_-1px_0px_rgba(0,0,0,0.05)]"
  >
    <PageContainer>

        <ul class="flex justify-between items-center">
          <li
            v-for="menu in menus"
            :key="menu.label"
            class="flex-1 border-t-2"
            :class="isActive(menu.to) ? 'border-primary' : 'border-transparent'"
          >
            <NuxtLink
              :to="menu.to"
              class="cursor-pointer flex flex-col py-[8.5px] gap-[1px] items-center font-manrope"
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
            </NuxtLink>
          </li>
        </ul>
    </PageContainer>
  </nav>
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
