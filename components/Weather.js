export async function getWeather() {
  try {
    let lat = null;
    let lon = null;

    // STEP 1: Try to get IP-based location
    const ipRes = await fetch('/api/ip');
    if (ipRes.ok) {
      const ipData = await ipRes.json();
      lat = ipData.location.latitude;
      lon = ipData.location.longitude;

      console.log("IP-based location:", lat, lon);
    } else {
      console.warn("IP API failed with status:", ipRes.status);
    }

    // STEP 2: Construct weather API URL
    let weatherUrl = `/api/weather`;
    if (lat && lon) {
      weatherUrl += `?lat=${lat}&lon=${lon}`;
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