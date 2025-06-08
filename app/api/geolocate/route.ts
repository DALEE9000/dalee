import { geolocation } from '@vercel/edge';
import { ipAddress } from '@vercel/edge';

export const runtime = 'edge';

export function GET(request: Request) {
  const geo = geolocation(request);
  const ip = ipAddress(request);

  const data = {
    geo,
    ip
  }

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}