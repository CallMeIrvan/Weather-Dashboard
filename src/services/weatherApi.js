const BASE_URL = '/owm'
const API_KEY = import.meta.env.VITE_OWM_API_KEY

function getApiKey() {
  const fromEnv = API_KEY
  if (fromEnv && String(fromEnv).trim() !== '') return fromEnv
  try {
    const fromStorage =
      typeof window !== 'undefined' ? window.localStorage.getItem('VITE_OWM_API_KEY') : ''
    return fromStorage || ''
  } catch {
    return ''
  }
}

function assertApiKey() {
  const key = getApiKey()
  if (!key || String(key).trim() === '') {
    throw new Error(
      'API key OpenWeatherMap belum diset. Tambahkan VITE_OWM_API_KEY di file .env lalu restart dev server.',
    )
  }
}

function buildUrl(path, params) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost'
  const url = new URL(`${BASE_URL}${path}`, origin)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value))
    }
  })
  url.searchParams.set('appid', getApiKey() || '')
  url.searchParams.set('units', 'metric')
  return url.toString()
}

export async function fetchWeatherByCity(cityName, units = 'metric') {
  if (!cityName) throw new Error('City name is required')
  assertApiKey()
  const url = buildUrl('/data/2.5/weather', { q: cityName, units })
  const response = await fetch(url)
  if (!response.ok) {
    let message = 'Failed to fetch weather'
    try {
      const data = await response.json()
      message = data?.message ? `(${response.status}) ${data.message}` : message
    } catch {
      // ignore JSON parse error
    }
    throw new Error(message)
  }
  return response.json()
}

export async function fetchWeatherByCoords(latitude, longitude, units = 'metric') {
  if (latitude == null || longitude == null) throw new Error('Coordinates are required')
  assertApiKey()
  const url = buildUrl('/data/2.5/weather', { lat: latitude, lon: longitude, units })
  const response = await fetch(url)
  if (!response.ok) {
    let message = 'Failed to fetch weather'
    try {
      const data = await response.json()
      message = data?.message ? `(${response.status}) ${data.message}` : message
    } catch {
      // ignore JSON parse error
    }
    throw new Error(message)
  }
  return response.json()
}

export function getIconUrl(iconCode) {
  if (!iconCode) return ''
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}

// Geocoding API: city name to coordinates
export async function geocodeCity(query, limit = 5) {
  if (!query) return []
  assertApiKey()
  const url = buildUrl('/geo/1.0/direct', { q: query, limit })
  const response = await fetch(url)
  if (!response.ok) return []
  return response.json()
}
