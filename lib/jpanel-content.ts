import { z } from "zod";
import type { Blog, Media, Project, ProjectPhase, ProjectType, SiteContent } from "@/types/content";

const projectSchema = z.object({
  id: z.string().optional(),
  slug: z.string().trim().min(1),
  title: z.string().trim().min(1),
  summary: z.string().nullable().optional(),
  content: z.record(z.unknown()).optional().default({}),
  media: z.array(z.unknown()).optional().default([]),
  coverImageUrl: z.string().nullable().optional(),
  projectUrl: z.string().nullable().optional(),
  contentType: z.unknown().optional(),
  projectPhase: z.unknown().optional(),
  publishedAt: z.string().nullable().optional(),
  displayOrder: z.number().int().optional(),
}).passthrough();

const blogSchema = z.object({
  slug: z.string().trim().min(1),
  title: z.string().trim().min(1),
  excerpt: z.string().nullable().optional(),
  content: z.record(z.unknown()).optional().default({}),
  coverImageUrl: z.string().nullable().optional(),
  coverVideoUrl: z.string().nullable().optional(),
  publishedAt: z.string().nullable().optional(),
}).passthrough();

const publicSiteSchema = z.object({
  projects: z.array(z.unknown()).optional().default([]),
  blogs: z.array(z.unknown()).optional().default([]),
}).passthrough();

const normalizeLabel = (value: unknown) => typeof value === "string"
  ? value.trim().toLowerCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ")
  : "";

export function mapProjectType(value: unknown): ProjectType {
  const label = normalizeLabel(value);
  if (label === "podcast" || label === "podcasts") return "PODCAST";
  if (["news", "event", "events", "news and event", "news and events", "news & event", "news & events"].includes(label)) return "EVENT";
  return "RESEARCH_PROJECT";
}

export function mapProjectPhase(value: unknown): ProjectPhase | null {
  const label = normalizeLabel(value);
  if (label === "past" || label === "past project") return "PAST";
  if (label === "ongoing" || label === "ongoing project") return "ONGOING";
  if (["future", "future project", "upcoming", "upcoming project"].includes(label)) return "UPCOMING";
  return null;
}

function safeHttpUrl(value: unknown, base?: string) {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = base
      ? new URL(value.replace(/^\/+/, ""), `${base.replace(/\/$/, "")}/`)
      : new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function normalizeMedia(value: unknown, apiBase: string): Media | null {
  const parsed = z.object({
    url: z.string(),
    type: z.string(),
    originalName: z.string().optional(),
    mimeType: z.string().optional(),
    size: z.number().optional(),
  }).safeParse(value);
  if (!parsed.success) return null;

  const type = normalizeLabel(parsed.data.type);
  if (type !== "image" && type !== "video") return null;
  const url = safeHttpUrl(parsed.data.url, apiBase);
  if (!url) return null;

  return { ...parsed.data, url, type } as Media;
}

function normalizeProject(value: unknown, apiBase: string): Project | null {
  const parsed = projectSchema.safeParse(value);
  if (!parsed.success) return null;
  const item = parsed.data;
  const contentType = mapProjectType(item.contentType ?? item.content.type);
  const projectPhase = mapProjectPhase(item.projectPhase ?? item.content.status);

  return {
    id: item.id,
    slug: item.slug,
    title: item.title,
    summary: item.summary,
    content: item.content,
    media: item.media.map((entry) => normalizeMedia(entry, apiBase)).filter((entry): entry is Media => Boolean(entry)),
    coverImageUrl: safeHttpUrl(item.coverImageUrl, apiBase),
    projectUrl: safeHttpUrl(item.projectUrl),
    contentType,
    projectPhase,
    tags: Array.isArray(item.content.tags) ? item.content.tags.filter((tag): tag is string => typeof tag === "string" && Boolean(tag.trim())) : [],
    publishedAt: item.publishedAt,
    displayOrder: item.displayOrder ?? 0,
  };
}

function normalizeBlog(value: unknown, apiBase: string): Blog | null {
  const parsed = blogSchema.safeParse(value);
  if (!parsed.success) return null;
  const item = parsed.data;
  return {
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    content: item.content,
    coverImageUrl: safeHttpUrl(item.coverImageUrl, apiBase),
    coverVideoUrl: safeHttpUrl(item.coverVideoUrl, apiBase),
    publishedAt: item.publishedAt,
  };
}

export function normalizeJPanelContent(value: unknown, apiBase: string): SiteContent {
  const parsed = publicSiteSchema.safeParse(value);
  if (!parsed.success) throw new Error("JPanel returned an invalid public-site response.");

  return {
    projects: parsed.data.projects
      .map((item) => normalizeProject(item, apiBase))
      .filter((item): item is Project => Boolean(item))
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)),
    blogs: parsed.data.blogs
      .map((item) => normalizeBlog(item, apiBase))
      .filter((item): item is Blog => Boolean(item)),
  };
}
