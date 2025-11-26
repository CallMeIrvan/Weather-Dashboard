<script setup>
import { ref } from 'vue'
import WeatherSearch from '@/components/WeatherSearch.vue'
import WeatherCard from '@/components/WeatherCard.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'
import { fetchWeatherByCity, fetchWeatherByCoords } from '@/services/weatherApi'
import { useLanguageStore } from '@/stores/language'

const langStore = useLanguageStore()
const weather = ref(null)
const loading = ref(false)
const errorMessage = ref('')
const units = ref(localStorage.getItem('units') || 'metric') // 'metric' | 'imperial'
const favorites = ref(JSON.parse(localStorage.getItem('favorites') || '[]'))

async function handleSearch(city) {
  errorMessage.value = ''
  loading.value = true
  try {
    weather.value = await fetchWeatherByCity(city, units.value)
  } catch (err) {
    errorMessage.value = err?.message || langStore.t.home.error
  } finally {
    loading.value = false
  }
}

async function detectLocation() {
  errorMessage.value = ''
  if (!('geolocation' in navigator)) {
    errorMessage.value = langStore.t.home.geolocationNotSupported
    return
  }
  loading.value = true
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      try {
        const { latitude, longitude } = pos.coords
        weather.value = await fetchWeatherByCoords(latitude, longitude, units.value)
      } catch (err) {
        errorMessage.value = err?.message || langStore.t.home.error
      } finally {
        loading.value = false
      }
    },
    () => {
      loading.value = false
      errorMessage.value = langStore.t.home.locationPermissionDenied
    },
    { enableHighAccuracy: true, timeout: 8000 },
  )
}

function toggleUnits() {
  units.value = units.value === 'metric' ? 'imperial' : 'metric'
  localStorage.setItem('units', units.value)
}

function addFavorite() {
  if (!weather.value?.name) return
  const name = weather.value.name
  if (!favorites.value.includes(name)) {
    favorites.value.push(name)
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }
}

async function pickFavorite(name) {
  await handleSearch(name)
}
</script>

<template>
  <main class="home container">
    <div class="hero-section">
      <h2 class="hero-title">{{ langStore.t.home.heroTitle }}</h2>
      <p class="hero-subtitle">{{ langStore.t.home.heroSubtitle }}</p>
    </div>

    <div class="search-container glass-card">
      <WeatherSearch @search="handleSearch" class="main-search" />

      <div class="actions-toolbar">
        <button
          class="glass-btn action-btn"
          @click="detectLocation"
          :title="langStore.t.home.useLocation"
        >
          📍 <span class="btn-text">{{ langStore.t.home.useLocation }}</span>
        </button>
        <button class="glass-btn action-btn" @click="toggleUnits" title="Ganti Satuan">
          🌡️ <span class="btn-text">{{ units === 'imperial' ? '°F' : '°C' }}</span>
        </button>
        <button
          class="glass-btn action-btn"
          @click="addFavorite"
          :disabled="!weather"
          :title="langStore.t.home.save"
        >
          ★ <span class="btn-text">{{ langStore.t.home.save }}</span>
        </button>
      </div>
    </div>

    <div v-if="favorites.length" class="favorites-section">
      <h3 class="section-title">{{ langStore.t.home.savedLocations }}</h3>
      <div class="favorites-grid">
        <button
          class="glass-btn fav-chip"
          v-for="name in favorites"
          :key="name"
          @click="pickFavorite(name)"
        >
          {{ name }}
        </button>
      </div>
    </div>

    <div class="content-area">
      <p v-if="!loading && !weather && !errorMessage" class="hint glass-card">
        {{ langStore.t.home.hint }}
      </p>

      <div v-if="errorMessage" class="error-banner glass-card">⚠️ {{ errorMessage }}</div>

      <div v-if="loading" class="loading-container">
        <div class="spinner"></div>
        <p>{{ langStore.t.home.loading }}</p>
      </div>

      <SkeletonCard v-if="loading" />

      <transition name="slide-up">
        <WeatherCard v-if="weather && !loading" :weather="weather" :units="units" />
      </transition>
    </div>
  </main>
</template>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 1rem;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #fff 0%, #cbd5e1 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

[data-theme='light'] .hero-title {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  color: var(--color-text-muted);
  font-size: 1.1rem;
}

.search-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
}

.actions-toolbar {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  font-size: 0.95rem;
  font-family: 'Space Grotesk', monospace;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
}

.favorites-section {
  text-align: center;
}

.section-title {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  opacity: 0.8;
  font-weight: 600;
}

.favorites-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.fav-chip {
  padding: 0.5rem 1rem;
  border-radius: 100px;
  font-size: 0.9rem;
}

.content-area {
  min-height: 200px;
}

.hint {
  text-align: center;
  color: var(--color-text-muted);
  font-size: 1.1rem;
}

.error-banner {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  text-align: center;
}

.loading-container {
  text-align: center;
  margin: 2rem 0;
  color: var(--color-text-muted);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: var(--color-primary);
  animation: spin 1s ease-in-out infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 640px) {
  .home {
    padding: 0 1rem;
  }
  .hero-title {
    font-size: 2rem;
  }
  .search-container {
    padding: 1.5rem;
  }
  .btn-text {
    display: none;
  }
  .actions-toolbar {
    gap: 0.5rem;
  }
  .action-btn {
    padding: 0.5rem 0.8rem;
  }
}
</style>
