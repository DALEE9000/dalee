import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const responseCurrent = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=auto:ip`
    );

    const responseAstro = await fetch(
      `https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=auto:ip`
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
};