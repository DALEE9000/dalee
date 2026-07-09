import { NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zip = searchParams.get("zip");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  const apiKey = process.env.WEATHER_API_KEY;

  // Priority: zip > lat/lon > Vercel geolocation headers > auto:ip
  let q = "auto:ip";
  if (zip) {
    q = zip;
  } else if (lat && lon) {
    q = `${lat},${lon}`;
  } else {
    // Geolocate right here from the request headers — saves the client a
    // round-trip to /api/geolocate before it can ask for weather
    const geo = geolocation(request);
    if ((geo.country === "US" || geo.country === "CA") && geo.postalCode) {
      q = geo.postalCode;
    } else if (geo.latitude && geo.longitude) {
      q = `${geo.latitude},${geo.longitude}`;
    }
    // No headers (local dev) — auto:ip lets weatherapi geolocate the caller
  }

  try {
    const [responseCurrent, responseAstro] = await Promise.all([
      fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(q)}`
      ),
      fetch(
        `https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${encodeURIComponent(q)}`
      ),
    ]);

    if (!responseCurrent.ok || !responseAstro.ok) {
      throw new Error(`HTTP error: ${responseCurrent.status}, ${responseAstro.status}`);
    }

    const [dataCurrent, dataAstro] = await Promise.all([
      responseCurrent.json(),
      responseAstro.json(),
    ]);

    return NextResponse.json({
      current: dataCurrent,
      astronomy: dataAstro
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
