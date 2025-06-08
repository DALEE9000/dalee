import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zip = searchParams.get("zip");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  const apiKey = process.env.WEATHER_API_KEY;

  // Priority: zip > lat/lon > auto:ip
  let q = "auto:ip";
  if (zip) {
    q = zip;
  } else if (lat && lon) {
    q = `${lat},${lon}`;
  }

  try {
    const responseCurrent = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(q)}`
    );

    const responseAstro = await fetch(
      `https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${encodeURIComponent(q)}`
    );

    if (!responseCurrent.ok || !responseAstro.ok) {
      throw new Error(`HTTP error: ${responseCurrent.status}, ${responseAstro.status}`);
    }

    const dataCurrent = await responseCurrent.json();
    const dataAstro = await responseAstro.json();

    return NextResponse.json({
      current: dataCurrent,
      astronomy: dataAstro
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}