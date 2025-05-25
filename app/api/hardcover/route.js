import { NextResponse } from "next/server";

export async function GET(req) {
  const apiKey = process.env.HARDCOVER_API_KEY;

  const { searchParams } = new URL(req.url);
  const listIdParam = searchParams.get("listId");
  const listId = parseInt(listIdParam, 10);

  if (isNaN(listId)) {
    return NextResponse.json({ error: "Invalid listId" }, { status: 400 });
  }

  try {

    const response = await fetch("https://api.hardcover.app/v1/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query MultiFetch(
            $listId: Int!,
          ) {
            me {
              read: user_books(
                  where: { status_id: { _eq: 3 } },
                  order_by: { last_read_date: desc_nulls_last }
                ) {
                  id
                  last_read_date
                  book {
                    title
                    pages
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
               
              currentlyReading: user_books(
                  where: { status_id: { _eq: 2 } },
                  order_by: { updated_at: desc_nulls_last }
              ) {
                id
                last_read_date
                book {
                  title
                  pages
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

              category: lists(
                where: { 
                  list_books: { 
                      list_id: { _eq: $listId }
                      user_books: { status_id: { _eq: 3 } }
                  } 
                }
                
              ) {
                name
  							books_count
                list_books {
                  book {
                    title
                    pages
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

              myListsPart1: lists {
                  id
                  name
                }
              
              myListsPart2: lists(offset: 100) {
                  id
                  name
              }
              

            }
          }
        `,
        variables: { listId }
      }),
    });

    const text = await response.text();
    console.log("Response text:", text);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Hardcover API error", details: text },
        { status: response.status }
      );
    }

    const data = JSON.parse(text);
    return NextResponse.json(data);

  } catch (err) {
      console.error("ERROR:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}

/* 
Status queries

status_id: { _eq: 1 } want to read
2 currently reading
3 read


This query returns the joint condition of books that are BOTH on one of my lists, and have a specific status (read, currently reading, want to read)

query Anthropology {
  me {
    lists(where: { 
      id: { _eq: 167772 }
    }) {
      id
      name
      list_books {
        user_books(where: {
          status_id: { _eq: 1 }
          user_id: { _eq: 34855 }
        })  {
        	book {
            title
          }
        }
      }
    }
  }
}


query politicsAmerica: list_books(
  where: {
    list: {
      name: {_eq: "Politics America"}, 
      user_id: {_eq: 34855}
    }
  }
) {
  id
  book {
    title
    description
  }
}


This gives you the lists I have.

query Lists {
  me {
    lists {
      id
      name
    }
  }
}

This gives you all of the books in a given list. (by name of the list)

query MyOwned {
  list_books(
    where: {
      list: {
        name: {_eq: "Politics America"}, 
        user_id: {_eq: 34855}
      }
    }
  ) {
    id
    book {
      title
      description
    }
  }
} */