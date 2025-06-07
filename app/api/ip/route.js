// /pages/api/ip.js  (or /app/api/ip/route.js in Next 13+)

export async function GET() {
  try {
    // ipapi.co JSON endpoint for IP-based location
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) {
      throw new Error(`ipapi.co responded with status ${res.status}`);
    }
    const data = await res.json();

    // Return only needed location info
    return new Response(JSON.stringify({
      location: {
        latitude: data.latitude,
        longitude: data.longitude,
        city: data.city,
        region: data.region,
        country: data.country_name,
      }
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("ipapi route error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}