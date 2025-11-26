<script setup>
import { computed } from 'vue'
import { getIconUrl } from '@/services/weatherApi'
import { useLanguageStore } from '@/stores/language'

const langStore = useLanguageStore()

const props = defineProps({
  weather: { type: Object, required: true },
  units: { type: String, default: 'metric' },
})

const cityName = computed(() => props.weather?.name || '')
const temperature = computed(() => Math.round(props.weather?.main?.temp ?? 0))
const humidity = computed(() => props.weather?.main?.humidity ?? 0)
const description = computed(() => props.weather?.weather?.[0]?.description || '')
const icon = computed(() => getIconUrl(props.weather?.weather?.[0]?.icon))
const windMs = computed(() => props.weather?.wind?.speed ?? 0)
const windLabel = computed(() => (props.units === 'imperial' ? 'mph' : 'km/h'))
const windValue = computed(() => {
  const speed = Number(windMs.value) || 0
  if (props.units === 'imperial') return Math.round(speed) // OWM imperial returns mph
  return Math.round(speed * 3.6) // m/s -> km/h
})
</script>

<template>
  <section class="wc-card card" v-if="weather">
    <header class="wc-header">
      <h2 class="wc-title">{{ cityName }}</h2>
      <p class="wc-desc">{{ description }}</p>
    </header>
    <div class="wc-body">
      <img v-if="icon" :src="icon" alt="Ikon cuaca" class="wc-icon" />
      <div class="wc-metrics">
        <div class="wc-temp">{{ temperature }}°C</div>
        <div class="wc-hum">{{ langStore.t.card.humidity }}: {{ humidity }}%</div>
        <div class="wc-wind">{{ langStore.t.card.wind }}: {{ windValue }} {{ windLabel }}</div>
      </div>
    </div>
  </section>
  <p v-else class="wc-empty">{{ langStore.t.card.empty }}</p>
</template>

<style scoped>
.wc-card {
  max-width: 640px;
  margin: 1rem auto;
  padding: 1.25rem;
  border-radius: 16px;
  backdrop-filter: blur(8px);
}
.wc-header {
  margin-bottom: 0.75rem;
}
.wc-title {
  margin: 0;
}
.wc-desc {
  margin: 0.25rem 0 0;
  text-transform: capitalize;
  opacity: 0.8;
}
.wc-body {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.wc-icon {
  width: 90px;
  height: 90px;
}
.wc-metrics {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.wc-temp {
  font-size: 2.25rem;
  font-weight: 700;
}
.wc-wind {
  opacity: 0.9;
}
.wc-empty {
  text-align: center;
  opacity: 0.7;
}
</style>
