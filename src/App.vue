<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, watchEffect } from 'vue'
import { useLanguageStore } from '@/stores/language'

const theme = ref(localStorage.getItem('theme') || 'auto') // 'light' | 'dark' | 'auto'
const langStore = useLanguageStore()

function applyTheme() {
  const root = document.documentElement
  root.removeAttribute('data-theme')
  if (theme.value === 'light') root.setAttribute('data-theme', 'light')
  if (theme.value === 'dark') root.setAttribute('data-theme', 'dark')
  localStorage.setItem('theme', theme.value)
}

function cycleTheme() {
  theme.value = theme.value === 'auto' ? 'light' : theme.value === 'light' ? 'dark' : 'auto'
}

watchEffect(applyTheme)
</script>

<template>
  <header class="app-header glass-card">
    <div class="header-content">
      <div class="brand-container">
        <div class="logo-bg">
          <span class="logo-emoji">🌤️</span>
        </div>
        <h1 class="brand">Weather<span class="brand-highlight">Dash</span></h1>
      </div>

      <nav class="nav">
        <RouterLink to="/" class="nav-link" active-class="active">{{
          langStore.t.nav.home
        }}</RouterLink>
        <RouterLink to="/about" class="nav-link" active-class="active">{{
          langStore.t.nav.about
        }}</RouterLink>

        <div class="divider"></div>

        <button class="theme-btn glass-btn" @click="langStore.cycleLang" aria-label="Ganti Bahasa">
          <span class="lang-flag">{{ langStore.currentLang === 'id' ? '🇮🇩' : '🇬🇧' }}</span>
        </button>

        <button class="theme-btn glass-btn" @click="cycleTheme" aria-label="Toggle tema">
          <span class="theme-emoji">{{
            theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '🌓'
          }}</span>
        </button>
      </nav>
    </div>
  </header>

  <main class="app-content">
    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </main>
</template>

.app-header { position: sticky; top: 1rem; z-index: 100; padding: 0.75rem 1.5rem; margin-bottom:
2rem; border-radius: 100px; /* Pill shape */ } .header-content { display: flex; align-items: center;
justify-content: space-between; } .brand-container { display: flex; align-items: center; gap:
0.75rem; } .logo-bg { width: 40px; height: 40px; background: linear-gradient(135deg,
var(--color-primary), var(--color-secondary)); border-radius: 50%; display: flex; align-items:
center; justify-content: center; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); } .logo-emoji {
font-size: 1.25rem; } .brand { font-size: 1.5rem; font-weight: 700; margin: 0; letter-spacing:
-0.5px; background: linear-gradient(to right, #fff, #cbd5e1); -webkit-background-clip: text;
-webkit-text-fill-color: transparent; } [data-theme='light'] .brand { background: linear-gradient(to
right, #1e293b, #475569); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.brand-highlight { color: var(--color-primary); -webkit-text-fill-color: var(--color-primary); }
.nav { display: flex; align-items: center; gap: 0.5rem; } .nav-link { padding: 0.5rem 1.25rem;
border-radius: 100px; font-weight: 500; color: var(--color-text-muted); transition: all 0.3s ease;
position: relative; } .nav-link:hover { color: var(--color-text); background: rgba(255, 255, 255,
0.1); } [data-theme='light'] .nav-link:hover { background: rgba(0, 0, 0, 0.05); } .nav-link.active {
color: #fff; background: var(--color-primary); box-shadow: 0 4px 12px rgba(79, 141, 248, 0.4); }
.divider { width: 1px; height: 24px; background: var(--glass-border); margin: 0 0.5rem; } .theme-btn
{ padding: 0.5rem; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items:
center; justify-content: center; } .lang-flag { font-size: 1.2rem; } /* Page Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; } .fade-enter-from,
.fade-leave-to { opacity: 0; } @media (max-width: 640px) { .app-header { top: 0.5rem; padding:
0.5rem 1rem; margin-bottom: 1.5rem; border-radius: 20px; } .brand-container { gap: 0.5rem; }
.logo-bg { width: 32px; height: 32px; } .logo-emoji { font-size: 1rem; } .brand { font-size: 1.1rem;
display: none; /* Hide text on very small screens if needed, or keep it */ } /* Show brand on
slightly larger mobile if space permits, or just keep icon */ @media (min-width: 380px) { .brand {
display: block; } } .nav { gap: 0.25rem; } .nav-link { padding: 0.4rem 0.75rem; font-size: 0.85rem;
} .divider { margin: 0 0.25rem; } .theme-btn { width: 32px; height: 32px; padding: 0.25rem; }
.lang-flag, .theme-emoji { font-size: 1rem; } }
