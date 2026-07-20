// app/sitemap.ts
import { MetadataRoute } from "next";
import { textbooks } from "@/components/mathematics/books";

const baseUrl = "https://www.davidalee.dev";

export default function sitemap(): MetadataRoute.Sitemap {
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