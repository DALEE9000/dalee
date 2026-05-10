export const runtime = 'edge';

function toRawGithubUrl(url: string): string {
  return url.replace(
    /github\.com\/([^/]+\/[^/]+)\/blob\/(.*)/,
    'raw.githubusercontent.com/$1/$2'
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawUrl = searchParams.get('url');

  if (!rawUrl) {
    return new Response('Missing url parameter', { status: 400 });
  }

  // Only allow public HTTPS URLs — blocks requests to internal/local services
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return new Response('Invalid URL', { status: 400 });
  }

  if (parsed.protocol !== 'https:') {
    return new Response('Only HTTPS URLs are supported', { status: 400 });
  }

  const fetchUrl = toRawGithubUrl(rawUrl);

  const upstream = await fetch(fetchUrl);

  if (!upstream.ok) {
    return new Response('Failed to fetch PDF', { status: upstream.status });
  }

  return new Response(upstream.body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline',
    },
  });
}
