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
  } catch (_) {}
  return null;
}

export async function getWeather() {
  // Return cached data if it's still fresh
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

  try {
    let geoData, lat, lon, country, zip = null;

    // STEP 1: Try to get IP-based location
    const geoRes = await fetch('/api/geolocate');
    if (geoRes.ok) {
      geoData = await geoRes.json();
      lat = geoData.geo.latitude;
      lon = geoData.geo.longitude;
      country = geoData.geo.country;
      zip = geoData.geo.postalCode;
    }

    // STEP 2: Construct weather API URL
    let weatherUrl = `/api/weather`;

    if (country === 'US' || country === 'CA') {
      if (zip) {
        weatherUrl += `?zip=${zip}`;
      } else if (lat && lon) {
        weatherUrl += `?lat=${lat}&lon=${lon}`;
      }
    } else if (lat && lon) {
      weatherUrl += `?lat=${lat}&lon=${lon}`;
    }

    // STEP 3: Fetch weather
    const weatherRes = await fetch(weatherUrl);
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