import { geolocation } from '@vercel/functions';
 
export function GET(request: Request) {
  const details = geolocation(request);
  return Response.json(details);
}