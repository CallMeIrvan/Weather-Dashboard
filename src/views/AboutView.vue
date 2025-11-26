<script setup>
import { useLanguageStore } from '@/stores/language'
const langStore = useLanguageStore()
</script>

<template>
  <div class="about container">
    <div class="glass-card about-card">
      <div class="about-header">
        <div class="icon-wrapper">🌤️</div>
        <h1>{{ langStore.t.about.title }}</h1>
        <p class="subtitle">{{ langStore.t.about.subtitle }}</p>
      </div>

      <div class="features-grid">
        <div class="feature-item">
          <h3>{{ langStore.t.about.features.realtime.title }}</h3>
          <p>{{ langStore.t.about.features.realtime.desc }}</p>
        </div>
        <div class="feature-item">
          <h3>{{ langStore.t.about.features.global.title }}</h3>
          <p>{{ langStore.t.about.features.global.desc }}</p>
        </div>
        <div class="feature-item">
          <h3>{{ langStore.t.about.features.auto.title }}</h3>
          <p>{{ langStore.t.about.features.auto.desc }}</p>
        </div>
        <div class="feature-item">
          <h3>{{ langStore.t.about.features.ui.title }}</h3>
          <p>{{ langStore.t.about.features.ui.desc }}</p>
        </div>
      </div>

      <div class="tech-stack">
        <h4>{{ langStore.t.about.builtWith }}</h4>
        <div class="tags">
          <span class="tag">Vue 3</span>
          <span class="tag">Vite</span>
          <span class="tag">CSS3</span>
          <span class="tag">OpenWeatherMap</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.about-card {
  max-width: 700px;
  width: 100%;
  text-align: center;
}

.about-header {
  margin-bottom: 3rem;
}

.icon-wrapper {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: inline-block;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

h1 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--color-text-muted);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
  text-align: left;
}

.feature-item {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.06);
}

.feature-item h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.feature-item p {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.tech-stack h4 {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}

.tags {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.4rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid var(--glass-border);
}
</style>
