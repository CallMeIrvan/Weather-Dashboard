# weather-dashboard

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Environment dan API Key

Aplikasi ini menggunakan OpenWeatherMap Current Weather Data API.

1. Buat API key gratis di `https://openweathermap.org/api`.
2. Tambahkan ke file `.env` pada root proyek:

```
VITE_OWM_API_KEY=YOUR_API_KEY
```

Catatan: Gunakan prefix `VITE_` agar variabel tersedia di runtime Vite.

Setelah menambah/mengubah `.env`, lakukan restart dev server:

```sh
Ctrl+C lalu npm run dev
```

## Fitur

- Pencarian kota dan menampilkan suhu, kelembapan, dan ikon cuaca.
- Deteksi lokasi otomatis menggunakan Geolocation API (opsional diizinkan oleh pengguna).

## Struktur Kode Terkait Cuaca

- `src/services/weatherApi.js`: fungsi untuk fetch cuaca per kota/koordinat.
- `src/components/WeatherSearch.vue`: input pencarian kota.
- `src/components/WeatherCard.vue`: tampilan ringkas cuaca.
- `src/views/HomeView.vue`: integrasi pencarian dan geolokasi.
