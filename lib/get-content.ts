import { seedContent } from "@/data/seed-content";
import type { Project, SiteContent } from "@/types/content";

function normalizeProject(value: Partial<Project>): Project {
  return {
    ...value,
    slug: value.slug ?? "",
    title: value.title ?? "",
    content: value.content && typeof value.content === "object" ? value.content : {},
    media: Array.isArray(value.media) ? value.media : [],
    contentType: value.contentType ?? "RESEARCH_PROJECT",
    tags: Array.isArray(value.tags) ? value.tags : [],
  };
}

export async function getContent(): Promise<SiteContent> {
  // The public site deliberately runs from this reviewed local dataset until
  // the client approves a separate JPanel integration.
  if (process.env.CMS_ENABLED !== "true") return seedContent;

  const base = process.env.JPANEL_API_URL?.replace(/\/$/, "");
  const slug = process.env.JPANEL_SITE_SLUG;
  if (!base || !slug) return seedContent;

  try {
    const response = await fetch(`${base}/public/sites/${slug}`, { next: { revalidate: 60 } });
    if (!response.ok) return seedContent;

    const value = await response.json();
    return {
      projects: Array.isArray(value.projects) && value.projects.length ? value.projects.map(normalizeProject) : seedContent.projects,
      blogs: Array.isArray(value.blogs) && value.blogs.length ? value.blogs : seedContent.blogs,
    };
  } catch {
    return seedContent;
  }
}

export const contentText = (value: unknown) => typeof value === "string" ? value : "";
