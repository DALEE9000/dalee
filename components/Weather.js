export async function getWeather() {
  try {
    let geoData = null;
    let lat, lon, city, country, ip = null;

    // STEP 1: Try to get IP-based location
    const geoRes = await fetch('/api/geolocate');
    if (geoRes.ok) {
      geoData = await geoRes.json();
      lat = geoData.latitude;
      lon = geoData.longitude;
      city = geoData.city;
      country = geoData.country;
      ip = geoData.ip;

      console.log("Vercel Geolocation:", lat, lon, city, country);
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