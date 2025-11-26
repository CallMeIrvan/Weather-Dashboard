<script setup>
import { ref, watch } from 'vue'
import { geocodeCity } from '@/services/weatherApi'
import { useLanguageStore } from '@/stores/language'

const langStore = useLanguageStore()

const emit = defineEmits(['search'])

const query = ref('')
const suggestions = ref([])
const open = ref(false)

function submit() {
  const value = query.value.trim()
  if (value) emit('search', value)
}

function clear() {
  query.value = ''
  suggestions.value = []
  open.value = false
}

let debounceTimer
watch(query, async (val) => {
  if (!val) {
    suggestions.value = []
    open.value = false
    return
  }
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(async () => {
    try {
      const res = await geocodeCity(val, 5)
      suggestions.value = (res || []).map((r) => ({
        label: `${r.name}${r.state ? ', ' + r.state : ''}, ${r.country}`,
        q: `${r.name}`,
      }))
      open.value = suggestions.value.length > 0
    } catch {
      open.value = false
    }
  }, 300)
})

function pickSuggestion(item) {
  query.value = item.q
  open.value = false
  emit('search', item.q)
}
</script>

<template>
  <form @submit.prevent="submit" class="ws-form card">
    <input
      v-model="query"
      type="text"
      class="ws-input"
      :placeholder="langStore.t.search.placeholder"
      :aria-label="langStore.t.search.placeholder"
    />
    <button type="submit" class="ws-button">{{ langStore.t.search.btn }}</button>
    <button type="button" class="ws-clear" @click="clear" aria-label="Bersihkan">×</button>
  </form>
  <ul v-if="open" class="ws-suggest card">
    <li v-for="(s, i) in suggestions" :key="i" @click="pickSuggestion(s)">{{ s.label }}</li>
  </ul>
</template>

<style scoped>
.ws-form {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  backdrop-filter: blur(6px);
}
.ws-input {
  flex: 1;
  min-width: 220px;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  font-family: 'Space Grotesk', monospace;
  font-size: 1rem;
  letter-spacing: -0.5px;
  transition: all 0.3s ease;
}

.ws-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(79, 141, 248, 0.15);
  outline: none;
}
.ws-button {
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-background-soft);
  font-family: 'Space Grotesk', monospace;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ws-button:hover {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
  transform: translateY(-1px);
}
.ws-clear {
  padding: 0.6rem 0.9rem;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  background: transparent;
}
.ws-suggest {
  margin-top: 0.5rem;
  padding: 0.25rem;
  list-style: none;
}
.ws-suggest li {
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  cursor: pointer;
}
.ws-suggest li:hover {
  background: var(--color-background-mute);
}

@media (max-width: 640px) {
  .ws-form {
    flex-wrap: wrap;
  }

  .ws-input {
    min-width: 100%;
    order: 1;
  }

  .ws-button {
    flex: 1;
    order: 2;
  }

  .ws-clear {
    order: 3;
  }
}
</style>
