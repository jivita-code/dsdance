import { seedContent } from "@/data/seed-content";
import { normalizeJPanelContent } from "@/lib/jpanel-content";
import type { SiteContent } from "@/types/content";

export async function getContent(): Promise<SiteContent> {
  if (process.env.CMS_ENABLED !== "true") return seedContent;

  const base = process.env.JPANEL_API_URL?.replace(/\/$/, "");
  const slug = process.env.JPANEL_SITE_SLUG;
  if (!base || !slug) throw new Error("JPanel content is enabled but its API URL or site slug is missing.");

  const response = await fetch(`${base}/public/sites/${encodeURIComponent(slug)}`, {
    headers: { accept: "application/json" },
    next: { revalidate: 60, tags: ["jpanel-content"] },
  });
  if (!response.ok) throw new Error(`JPanel content request failed with status ${response.status}.`);

  return normalizeJPanelContent(await response.json(), base);
}

export const contentText = (value: unknown) => typeof value === "string" ? value : "";
