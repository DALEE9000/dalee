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

  // Forward Range header so video seeking works
  const fetchHeaders: HeadersInit = {};
  const range = request.headers.get('range');
  if (range) fetchHeaders['Range'] = range;

  const upstream = await fetch(fetchUrl, { headers: fetchHeaders });

  if (!upstream.ok && upstream.status !== 206) {
    return new Response('Failed to fetch video', { status: upstream.status });
  }

  const responseHeaders: HeadersInit = {
    'Content-Type': 'video/mp4',
    'Content-Disposition': 'inline',
    'Accept-Ranges': 'bytes',
  };

  const contentRange = upstream.headers.get('Content-Range');
  const contentLength = upstream.headers.get('Content-Length');
  if (contentRange) responseHeaders['Content-Range'] = contentRange;
  if (contentLength) responseHeaders['Content-Length'] = contentLength;

  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}
