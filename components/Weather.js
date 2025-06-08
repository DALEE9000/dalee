export async function getWeather() {
  try {
    let geoData = null;
    let lat, lon, city, country, ip = null;

    // STEP 1: Try to get IP-based location
    const geoRes = await fetch('/api/geolocate');
    if (geoRes.ok) {
      geoData = await geoRes.json();
      lat = geoData.geo.latitude;
      lon = geoData.geo.longitude;
      city = geoData.geo.city;
      country = geoData.geo.country;
      zip = geoData.geo.postalCode
      ip = geoData.ip;

      console.log("Vercel Geolocation:", lat, lon, city, country, ip);
    } else {
      console.warn("Vercel Geolocation failed with status:", geoRes.status);
    }

    // STEP 2: Construct weather API URL
    let weatherUrl = `/api/weather`;

    if (country === 'US' || country === 'CA') {
      if (geoData.postal_code) {
        weatherUrl += `?zip=${geoData.postal_code}`;
        console.log("Using ZIP:", geoData.postal_code);
      } else if (lat && lon) {
        // fallback to lat/lon if zip is missing
        weatherUrl += `?lat=${lat}&lon=${lon}`;
        console.warn("ZIP not found, falling back to lat/lon");
      } else {
        console.warn("No location data, falling back to auto:ip");
      }
    } else if (lat && lon) {
      weatherUrl += `?lat=${lat}&lon=${lon}`;
      console.log("Using lat/lon:", lat, lon);
    } else {
      console.warn("No location data, falling back to auto:ip");
      // Leave weatherUrl unchanged for IP fallback
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