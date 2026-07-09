import { NextResponse } from "next/server";

// Substack RSS (currently redirects to www.thealphabetagency.com/feed —
// fetch follows it, so this keeps working if the custom domain changes)
const FEED_URL = "https://alphabetagency.substack.com/feed";

// Pull one tag's text out of an RSS <item> block, unwrapping CDATA
function tagText(block: string, name: string): string {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  if (!m) return "";
  return decodeEntities(
    m[1].replace(/^\s*<!\[CDATA\[/, "").replace(/\]\]>\s*$/, "").trim()
  );
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#8217;/g, "’");
}

export async function GET() {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) {
      throw new Error(`Feed error: ${res.status}`);
    }
    const xml = await res.text();

    const posts = xml
      .split("<item>")
      .slice(1)
      .map((chunk) => {
        const block = chunk.split("</item>")[0];
        return {
          title: tagText(block, "title"),
          description: tagText(block, "description"),
          link: tagText(block, "link"),
          pubDate: tagText(block, "pubDate"),
          image: block.match(/<enclosure[^>]*url="([^"]+)"/)?.[1] ?? null,
        };
      })
      .filter((p) => p.title && p.link);

    return NextResponse.json(
      { posts },
      {
        headers: {
          // Same content for everyone — let the CDN serve it
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (err) {
    console.error("substack feed failed:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
