<template>
  <div class="inline-block">
    <slot @click="handleShare" />

    <!-- Drawer Content -->
    <DrawerCustom v-model:open="showDrawer" title="All Share Menu" description="Kelola Share Menu" :show-indicator="true" classes="px-4">
      <AppContainer>
        <div class="flex flex-col gap-3.5 my-4 mx-auto justify-center">
          <h3 class="text-base font-bold">Bagikan melalui:</h3>

          <div class="flex flex-wrap justify-center gap-y-10 px-4 my-2 -mx-4">
            <template v-for="social in socials" :key="social.id">
              <div class="flex flex-col justify-start items-center cursor-pointer w-1/4" @click="handleSocialClick(social.name)">
                <NuxtImg :src="social.icon" class="size-10" />
                <p class="text-xs mt-3 text-center font-normal">{{ social.name }}</p>
              </div>
            </template>
          </div>
        </div>
      </AppContainer>
    </DrawerCustom>
  </div>
</template>

<script lang="ts" setup>
const showDrawer = ref(false);

const handleShare = () => {
  showDrawer.value = true;
};

const socials = [
  {
    id: 1,
    name: 'Salinan tautan',
    icon: '/images/share/salin.svg',
    link: 'https://wa.me/?text=',
  },
  {
    id: 2,
    name: 'WhatsApp',
    icon: '/images/share/wa.svg',
    link: 'https://wa.me/?text=',
  },
  // {
  // 	id: 3,
  // 	name: 'Instagram Stories',
  // 	icon: '/images/share/instagram.svg',
  // 	link: 'https://wa.me/?text='
  // },
  {
    id: 4,
    name: 'X',
    icon: '/images/share/x.svg',
    link: 'https://wa.me/?text=',
  },
  {
    id: 5,
    name: 'Facebook',
    icon: '/images/share/fb.svg',
    link: 'https://wa.me/?text=',
  },
  {
    id: 6,
    name: 'Line',
    icon: '/images/share/line.svg',
    link: 'https://wa.me/?text=',
  },
  {
    id: 7,
    name: 'Telegram',
    icon: '/images/share/telegram.svg',
    link: 'https://wa.me/?text=',
  },
];

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const shareTo = (platform: string) => {
  const url = `${window.location.href}?utm_source=Whatsapp&utm_medium=Referral&utm_campaign=Top_Desktop`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(`*${props.title}*`);

  const shareLinks: Record<string, string> = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%0A%0AKlik%20untuk%20lihat:%0A${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
  };

  window.open(shareLinks[platform], '_blank');
};

const handleSocialClick = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'salinan tautan':
      copyLink();
      break;
    case 'whatsapp':
      shareTo('whatsapp');
      break;
    case 'instagram stories':
      notify.info('Fitur sedang dalam pengembangan');
      break;
    case 'facebook':
      shareTo('facebook');
      break;
    case 'telegram':
      shareTo('telegram');
      break;
    case 'line':
      shareTo('line');
      break;
    case 'twitter':
    case 'x':
      shareTo('twitter');
      break;
    default:
      console.warn('Platform tidak dikenal:', platform);
  }
};

const copyLink = async () => {
  await navigator.clipboard.writeText(window.location.href);
  notify.success('Link berhasil disalin');
};

defineExpose({ handleShare });
</script>
