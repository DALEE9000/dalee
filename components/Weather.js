export async function getWeather() {
  // Wrap geolocation in a promise
  const getPosition = () =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
      }
    });

  try {
    let url = '/api/weather';

    try {
      const position = await getPosition();
      const { latitude, longitude } = position.coords;

      console.log("Location:", latitude, longitude);

      url = `/api/weather?lat=${latitude}&lon=${longitude}`;
    } catch (geoError) {
        console.warn("Geolocation failed, using IP fallback:", geoError);
    }

    const response = await fetch(url);
    console.log("API response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    console.log("Weather data fetched:", data);

    return data;
  } catch (err) {
      console.error("Failed to fetch weather:", err);
    return null;
  }
}
