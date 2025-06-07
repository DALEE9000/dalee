export async function getWeather() {
  try {
    let lat = null;
    let lon = null;

    // STEP 1: Try to get IP-based location
    const geoRes = await fetch('/api/geolocate');
    if (geoRes.ok) {
      const geoData = await geoRes.json();
      lat = geoData.lat;
      lon = geoData.lon;

      console.log("Vercel Geolocation:", lat, lon);
    } else {
      console.warn("Vercel Geolocation failed with status:", geoRes.status);
    }

    // STEP 2: Construct weather API URL
    let weatherUrl = `/api/weather`;
    if (lat && lon) {
      weatherUrl += `?lat=${lat}&lon=${lon}`;
      console.log('weaterurl', weatherUrl)
    } else {
      console.warn("Falling back to auto:ip");
      // Leave URL as default
    }

    // STEP 3: Fetch weather
    const weatherRes = await fetch(weatherUrl);
    if (!weatherRes.ok) {
      throw new Error(`Weather API error: ${weatherRes.status}`);
    }

    const weatherData = await weatherRes.json();
    console.log("Weather data fetched:", weatherData);
    return weatherData;

  } catch (err) {
    console.error("getWeather failed:", err);
    return null;
  }
}