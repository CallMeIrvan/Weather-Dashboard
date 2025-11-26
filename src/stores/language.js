import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', () => {
  const currentLang = ref(localStorage.getItem('lang') || 'id') // 'id' | 'en'

  const translations = {
    id: {
      nav: {
        home: 'Beranda',
        about: 'Tentang',
        theme: 'Tema',
        lang: 'Bahasa',
      },
      home: {
        heroTitle: 'Prakiraan Cuaca',
        heroSubtitle: 'Cek cuaca di kotamu atau lokasi saat ini',
        useLocation: 'Lokasi Saya',
        save: 'Simpan',
        savedLocations: 'Lokasi Tersimpan',
        hint: '👋 Mulai dengan mencari nama kota di atas!',
        loading: 'Mengambil data cuaca...',
        error: 'Gagal mengambil data',
      },
      about: {
        title: 'Tentang WeatherDash',
        subtitle: 'Teman cuaca yang modern dan akurat.',
        features: {
          realtime: {
            title: '⚡ Data Real-time',
            desc: 'Data cuaca akurat dari OpenWeatherMap API.',
          },
          global: {
            title: '🌍 Pencarian Global',
            desc: 'Cari kondisi cuaca di kota mana saja di dunia.',
          },
          auto: {
            title: '📍 Lokasi Otomatis',
            desc: 'Deteksi satu klik untuk melihat cuaca di tempatmu.',
          },
          ui: {
            title: '🎨 UI Modern',
            desc: 'Desain Glassmorphism cantik dengan mode gelap/terang.',
          },
        },
        builtWith: 'Dibuat dengan',
      },
      search: {
        placeholder: 'Cari kota (mis. Jakarta)',
        btn: 'Cari',
      },
      card: {
        humidity: 'Kelembapan',
        wind: 'Angin',
        empty: 'Tidak ada data.',
      },
    },
    en: {
      nav: {
        home: 'Home',
        about: 'About',
        theme: 'Theme',
        lang: 'Language',
      },
      home: {
        heroTitle: 'Weather Forecast',
        heroSubtitle: 'Check the weather in your city or current location',
        useLocation: 'My Location',
        save: 'Save',
        savedLocations: 'Saved Locations',
        hint: '👋 Start by searching for a city above!',
        loading: 'Fetching weather data...',
        error: 'Failed to fetch data',
      },
      about: {
        title: 'About WeatherDash',
        subtitle: 'A modern, precise weather companion.',
        features: {
          realtime: {
            title: '⚡ Real-time Data',
            desc: 'Accurate weather data powered by OpenWeatherMap API.',
          },
          global: {
            title: '🌍 Global Search',
            desc: 'Find weather conditions for any city worldwide instantly.',
          },
          auto: {
            title: '📍 Auto Location',
            desc: 'One-click detection to see weather right where you are.',
          },
          ui: {
            title: '🎨 Modern UI',
            desc: 'Beautiful Glassmorphism design with dark/light mode support.',
          },
        },
        builtWith: 'Built with',
      },
      search: {
        placeholder: 'Search city (e.g. London)',
        btn: 'Search',
      },
      card: {
        humidity: 'Humidity',
        wind: 'Wind',
        empty: 'No data.',
      },
    },
  }

  function setLang(lang) {
    currentLang.value = lang
    localStorage.setItem('lang', lang)
  }

  function cycleLang() {
    setLang(currentLang.value === 'id' ? 'en' : 'id')
  }

  const t = computed(() => translations[currentLang.value])

  return { currentLang, setLang, cycleLang, t }
})
