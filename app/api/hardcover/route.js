import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.HARDCOVER_API_KEY;

  try {
    const response = await fetch("https://api.hardcover.app/v1/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query Read {
            me {
              user_books(
                where: { status_id: { _eq: 3 } },
                order_by: { last_read_date: desc_nulls_last }
              ) {
                id
                last_read_date
                book {
                  title
                  pages
                  book_series {
                    series {
                     name
                    }
                  }
                  description
                  image {
                    url
                  }
                  release_date
                  rating
                  slug
                  contributions {
                    author {
                      name
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    });

    const text = await response.text();
    console.log("📦 Response text:", text);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Hardcover API error", details: text },
        { status: response.status }
      );
    }

    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (err) {
    console.error("🔥 ERROR:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}