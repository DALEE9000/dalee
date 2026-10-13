// app/sitemap.ts
import { MetadataRoute } from "next";
import { textbooks } from "@/components/mathematics/books";
import { getProblemIndex, flattenProblems } from "@/components/mathematics/solutionsHtml";

const baseUrl = "https://www.davidalee.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // one URL per rendered problem, for books that have a tex2html build
  const problemPages = (
    await Promise.all(
      textbooks.map(async (book) => {
        const index = await getProblemIndex(book.slug);
        return index
          ? flattenProblems(index).map((p) => ({
              path: `/nerd-corner/${book.slug}/${p.slug}`,
              changeFrequency: "monthly",
              priority: 0.6,
            }))
          : [];
      }),
    )
  ).flat();

  const staticPages = [
    {
      path: "",
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      path: "/about",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/research",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/nerd-corner",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...textbooks.map((book) => ({
      path: `/nerd-corner/${book.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    ...problemPages,
    {
      path: "/library",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/writing",
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      path: "/hireme",
      changeFrequency: "monthly",
      priority: 0.8,
    }
  ];

  return staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency as MetadataRoute.Sitemap[number]["changeFrequency"],
    priority: page.priority,
  }));
}