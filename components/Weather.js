const CACHE_KEY = 'weather_cache';
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

// Synchronous read — safe to use as a useState lazy initializer
export function getCachedWeather() {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        return data;
      }
    }
  } catch (_) {
    // sessionStorage unavailable (SSR, private browsing restrictions, etc.)
  }
  return null;
}

export async function getWeather() {
  // Return cached data if it's still fresh
  const cached = getCachedWeather();
  if (cached) return cached;

  try {
    // Geolocation happens server-side in the route (from Vercel's request
    // headers), so a single round-trip gets us localized weather
    const weatherRes = await fetch('/api/weather');
    if (!weatherRes.ok) {
      throw new Error(`Weather API error: ${weatherRes.status}`);
    }

    const weatherData = await weatherRes.json();

    // Cache result for 10 minutes
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: weatherData, timestamp: Date.now() }));
    } catch (_) {
      // sessionStorage full or unavailable
    }

    return weatherData;

  } catch (err) {
    console.error("getWeather failed:", err);
    return null;
  }
}
