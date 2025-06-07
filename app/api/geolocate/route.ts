export async function GET(req: Request) {
  const headers = req.headers;

  const lat = headers.get('x-vercel-ip-latitude');
  const lon = headers.get('x-vercel-ip-longitude');
  const city = headers.get('x-vercel-ip-city');
  const country = headers.get('x-vercel-ip-country');

  return Response.json({ lat, lon, city, country });
}