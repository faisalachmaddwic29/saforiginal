import { useState, onMounted } from '#imports'
import Shepherd from 'shepherd.js'
import 'shepherd.js/dist/css/shepherd.css'
import { localStorageInitTour } from '~/constants'

export const useTour = () => {
  const tourShown = useState<boolean>(localStorageInitTour, () => false)

  const startTour = () => {
    // kalau sudah pernah dijalankan, langsung return
    if (tourShown.value || localStorage.getItem(localStorageInitTour) === 'true') return

    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes:
          'shepherd-theme-custom shadow-xl bg-white dark:bg-gray-800 dark:text-gray-100 rounded-2xl p-4 text-sm',
        scrollTo: { behavior: 'smooth', block: 'center' },
        cancelIcon: { enabled: true },
      },
    })

    const navbarOffset = 70

    const scrollToWithOffset = (el: Element) => {
      const top = el.getBoundingClientRect().top + window.scrollY - navbarOffset
      window.scrollTo({ top, behavior: 'smooth' })
    }

    tour.addStep({
      id: 'search',
      text: 'Lakukan pencarian series dan event lebih mudah.',
      attachTo: { element: '#home-search', on: 'bottom' },
      when: {
        show: () => {
          const el = document.querySelector('#home-search')
          el?.classList.add('ring-1', 'size-[24px]', 'rounded-xl', 'transition')
        },
        hide: () => {
          const el = document.querySelector('#home-search')
          el?.classList.remove('ring-1', 'size-[24px]', 'rounded-xl', 'transition')
        }
      },
      buttons: [
        {
          text: 'Selanjutnya', action: tour.next, classes: '!bg-secondary text-white !text-sm rounded-md px-3 py-1 !hover:bg-primary',
        }
      ]
    })

    tour.addStep({
      id: 'kategori',
      text: 'Cari series dan event berdasarkan kategori.',
      attachTo: { element: '#kategori-section', on: 'top' },
      when: {
        show: () => {
          const el = document.querySelector('#kategori-section')
          if (el) scrollToWithOffset(el)
        },
      },
      buttons: [
        {
          text: 'Kembali',
          classes: '!bg-secondary text-white !text-sm rounded-md px-3 py-1 !hover:bg-primary',
          action: tour.back,
        },
        {
          text: 'Selanjutnya',
          classes: '!bg-secondary text-white !text-sm rounded-md px-3 py-1 !hover:bg-primary',
          action: tour.next,
        },
      ],
    })

    tour.addStep({
      id: 'event',
      text: 'Lihat event dan series rekomendasi untukmu.',
      attachTo: { element: '#event-rekomendasi', on: 'top' },
      when: {
        show: () => {
          const el = document.querySelector('#event-rekomendasi')
          if (el) scrollToWithOffset(el)
        },
      },
      buttons: [
        {
          text: 'Kembali',
          classes: '!bg-secondary text-white !text-sm rounded-md px-3 py-1 !hover:bg-primary',
          action: tour.back,
        },
        {
          text: 'Selesai',
          classes: '!bg-secondary text-white !text-sm rounded-md px-3 py-1 !hover:bg-primary',
          action: () => {
            tour.complete()
            localStorage.setItem(localStorageInitTour, 'true')
            tourShown.value = true
          },
        },
      ],
    })

    tour.start()
    tourShown.value = true
  }

  // saat halaman pertama kali dimount, ambil status dari localStorage
  onMounted(() => {
    const stored = localStorage.getItem(localStorageInitTour)
    if (stored === 'true') {
      tourShown.value = true
    }
  })

  return { startTour, tourShown }
}
