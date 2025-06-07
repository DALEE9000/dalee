export async function getWeather() {
  try {
    const response = await fetch('/api/weather');
    if (!response.ok) {
      throw new Error(`HTTPS error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Failed to fetch weather:', err);
    return null;
  }
}