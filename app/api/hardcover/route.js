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
          query MultiFetch {
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
                  image {
                    url
                  } 
                }
              }
            }
          }
        `,
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
query Lists {
  me {
    lists {
      id
      name
    }
  }
}

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
}

{
  "data": {
    "me": [
      {
        "lists": [
          {
            "id": 167772,
            "name": "Anthropology"
          },
          {
            "id": 167687,
            "name": "Books I Own"
          },
          {
            "id": 167755,
            "name": "Books On Subjects In My Head 24 7"
          },
          {
            "id": 167784,
            "name": "Economics Central Banking"
          },
          {
            "id": 167794,
            "name": "Economics Commodities"
          },
          {
            "id": 167707,
            "name": "Economics General"
          },
          {
            "id": 167684,
            "name": "Economics History"
          },
          {
            "id": 167820,
            "name": "Economics History Business"
          },
          {
            "id": 167793,
            "name": "Economics International Trade"
          },
          {
            "id": 167803,
            "name": "Economics Labor"
          },
          {
            "id": 167757,
            "name": "Economics Money And Finance"
          },
          {
            "id": 167806,
            "name": "Economics Monopoly"
          },
          {
            "id": 167818,
            "name": "Economics National China"
          },
          {
            "id": 167817,
            "name": "Economics National Korea"
          },
          {
            "id": 167780,
            "name": "Economics National United States"
          },
          {
            "id": 167786,
            "name": "Economics Race"
          },
          {
            "id": 167800,
            "name": "Economics Textbook"
          },
          {
            "id": 167775,
            "name": "Economics Textbook Econometrics"
          },
          {
            "id": 167805,
            "name": "Economics Textbook Finance"
          },
          {
            "id": 167767,
            "name": "Economics Theory"
          },
          {
            "id": 167792,
            "name": "Geography"
          },
          {
            "id": 167712,
            "name": "History American"
          },
          {
            "id": 167690,
            "name": "History Biography"
          },
          {
            "id": 167787,
            "name": "History Britain"
          },
          {
            "id": 167704,
            "name": "History Cambodia"
          },
          {
            "id": 167756,
            "name": "History China"
          },
          {
            "id": 167754,
            "name": "History Cold War"
          },
          {
            "id": 167812,
            "name": "History France"
          },
          {
            "id": 167753,
            "name": "History Germany"
          },
          {
            "id": 167795,
            "name": "History Greece"
          },
          {
            "id": 167809,
            "name": "History India"
          },
          {
            "id": 167723,
            "name": "History Indigenous"
          },
          {
            "id": 167716,
            "name": "History Indonesia"
          },
          {
            "id": 167747,
            "name": "History Israel Palestine"
          },
          {
            "id": 167801,
            "name": "History Italy"
          },
          {
            "id": 167815,
            "name": "History Japan"
          },
          {
            "id": 167761,
            "name": "History Korea"
          },
          {
            "id": 167724,
            "name": "History New York"
          },
          {
            "id": 167810,
            "name": "History Persia"
          },
          {
            "id": 167802,
            "name": "History Philippines"
          },
          {
            "id": 167769,
            "name": "History Region Africa"
          },
          {
            "id": 167771,
            "name": "History Region Central Asia"
          },
          {
            "id": 167706,
            "name": "History Region E S And Se Asia"
          },
          {
            "id": 167733,
            "name": "History Region Europe"
          },
          {
            "id": 167714,
            "name": "History Region Latin America"
          },
          {
            "id": 167741,
            "name": "History Region Middle East"
          },
          {
            "id": 167743,
            "name": "History Roman"
          },
          {
            "id": 167779,
            "name": "History Russia Ussr"
          },
          {
            "id": 167766,
            "name": "History Singapore"
          },
          {
            "id": 167814,
            "name": "History Spain"
          },
          {
            "id": 167734,
            "name": "History Vietnam"
          },
          {
            "id": 167688,
            "name": "History World"
          },
          {
            "id": 167689,
            "name": "History World War I"
          },
          {
            "id": 167695,
            "name": "History World War Ii"
          },
          {
            "id": 167789,
            "name": "Journalistic Nonfiction"
          },
          {
            "id": 167774,
            "name": "Law"
          },
          {
            "id": 167822,
            "name": "Law Water Rights"
          },
          {
            "id": 167758,
            "name": "Lego"
          },
          {
            "id": 167799,
            "name": "Literature African"
          },
          {
            "id": 167729,
            "name": "Literature American"
          },
          {
            "id": 167813,
            "name": "Literature Argentinian"
          },
          {
            "id": 167698,
            "name": "Literature British"
          },
          {
            "id": 167798,
            "name": "Literature Fantasy"
          },
          {
            "id": 167751,
            "name": "Literature French"
          },
          {
            "id": 167782,
            "name": "Literature German"
          },
          {
            "id": 167765,
            "name": "Literature Greek"
          },
          {
            "id": 167760,
            "name": "Literature Irish"
          },
          {
            "id": 167752,
            "name": "Literature Italian"
          },
          {
            "id": 167791,
            "name": "Literature Japanese"
          },
          {
            "id": 167783,
            "name": "Literature Malaysian"
          },
          {
            "id": 167797,
            "name": "Literature Norwegian"
          },
          {
            "id": 167796,
            "name": "Literature Roman"
          },
          {
            "id": 167763,
            "name": "Literature Russian"
          },
          {
            "id": 167816,
            "name": "Literature Spanish"
          },
          {
            "id": 167692,
            "name": "Mathematics Science And Technology"
          },
          {
            "id": 167776,
            "name": "Memoir"
          },
          {
            "id": 167785,
            "name": "Miscellaneous"
          },
          {
            "id": 167691,
            "name": "Music"
          },
          {
            "id": 167732,
            "name": "Other"
          },
          {
            "id": 167682,
            "name": "Owned"
          },
          {
            "id": 167804,
            "name": "Philosophy 16th Century"
          },
          {
            "id": 167770,
            "name": "Philosophy 17th Century"
          },
          {
            "id": 167742,
            "name": "Philosophy 18th Century"
          },
          {
            "id": 167759,
            "name": "Philosophy 19th Century"
          },
          {
            "id": 167717,
            "name": "Philosophy 20th Century"
          },
          {
            "id": 167807,
            "name": "Philosophy 21st Century"
          },
          {
            "id": 167790,
            "name": "Philosophy Antiquity"
          },
          {
            "id": 167745,
            "name": "Philosophy General"
          },
          {
            "id": 167696,
            "name": "Politics America"
          },
          {
            "id": 167750,
            "name": "Politics Asia"
          },
          {
            "id": 167721,
            "name": "Politics Climate Change And Energy"
          },
          {
            "id": 167737,
            "name": "Politics Colonialism Imperialism"
          },
          {
            "id": 167701,
            "name": "Politics Criminal Justice"
          },
          {
            "id": 167728,
            "name": "Politics Defense Natsec"
          },
          {
            "id": 167699,
            "name": "Politics Democracy And Organizing"
          },
          {
            "id": 167781,
            "name": "Politics Education"
          },
          {
            "id": 167778,
            "name": "Politics Feminism"
          },
          {
            "id": 167740,
            "name": "Politics Food"
          },
          {
            "id": 167808,
            "name": "Politics Genocide"
          },
          {
            "id": 167749,
            "name": "Politics Health Care"
          }
        ]
      }
    ]
  }
} */