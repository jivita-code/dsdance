export type Media = { url: string; type: "image" | "video"; originalName?: string };
export type ProjectType = "RESEARCH_PROJECT" | "PODCAST" | "EVENT";
export type Project = { id?: string; slug: string; title: string; summary?: string | null; content: Record<string, unknown>; media: Media[]; coverImageUrl?: string | null; projectUrl?: string | null; contentType: ProjectType; projectPhase?: "PAST" | "ONGOING" | "UPCOMING" | null; tags?: string[]; publishedAt?: string | null; displayOrder?: number };
export type Blog = { slug: string; title: string; excerpt?: string | null; content: Record<string, unknown>; coverImageUrl?: string | null; publishedAt?: string | null };
export type SiteContent = { projects: Project[]; blogs: Blog[] };

const asset = "https://dsdanceresearchlab.com/wp-content/uploads/2025/07/";
const seed: SiteContent = {
  projects: [
    { slug: "tusker-eye", title: "Tusker Eye", summary: "Exploring human–elephant relationships through movement research and visual storytelling.", content: { body: "Tusker Eye explores the relationship between human communities, elephants, and the stories that movement can carry.", timeline: "Past project", locations: ["Sri Lanka"] }, media: [{ url: `${asset}31099cf23990aaf40c6b479304870206.jpg`, type: "image" }], coverImageUrl: `${asset}31099cf23990aaf40c6b479304870206.jpg`, contentType: "RESEARCH_PROJECT", projectPhase: "PAST", tags: ["research", "Sri Lanka"], displayOrder: 1 },
    { slug: "dye-with-movements", title: "Dye With Movements", summary: "An experimental study of natural dyeing and embodied practices in textile and performance.", content: { body: "An experimental study of natural dyeing and embodied practices in textile and performance.", timeline: "Past project", locations: ["Sri Lanka"] }, media: [{ url: `${asset}59de322c07fe834a0978a8a0a0717eb0.jpg`, type: "image" }], coverImageUrl: `${asset}59de322c07fe834a0978a8a0a0717eb0.jpg`, contentType: "RESEARCH_PROJECT", projectPhase: "PAST", tags: ["research", "textile"], displayOrder: 2 },
    { slug: "ability-visible", title: "Ability Visible", summary: "Investigating visibility, representation and accessibility in dance and performative arts.", content: { body: "Investigating visibility, representation and accessibility in dance and performative arts.", timeline: "Past project", locations: ["Sri Lanka"] }, media: [{ url: `${asset}1273a11e5ccb2104e28c7d1326f60e4d.jpg`, type: "image" }], coverImageUrl: `${asset}1273a11e5ccb2104e28c7d1326f60e4d.jpg`, contentType: "RESEARCH_PROJECT", projectPhase: "PAST", tags: ["accessibility", "research"], displayOrder: 3 },
    { slug: "sri-lankan-dance-masks", title: "Sri Lankan Dance Masks: A Cultural and Artistic Legacy", summary: "An ongoing inquiry into dance masks, cultural memory, artistic practice and legacy.", content: { body: "An ongoing inquiry into dance masks, cultural memory, artistic practice and legacy.", timeline: "Ongoing", locations: ["Sri Lanka", "United Kingdom"] }, media: [{ url: `${asset}c46abc145df3b0d78b3b6d4b3d03f092.jpg`, type: "image" }], coverImageUrl: `${asset}c46abc145df3b0d78b3b6d4b3d03f092.jpg`, contentType: "RESEARCH_PROJECT", projectPhase: "ONGOING", tags: ["culture", "research"], displayOrder: 4 },
    { slug: "dance-connect", title: "Dance Connect", summary: "A conversation space for dance, research and performative practice.", content: { body: "A conversation space for dance, research and performative practice.", links: { spotify: "https://creators.spotify.com/pod/profile/ds-dance-research-lab" } }, media: [], contentType: "PODCAST", tags: ["podcast"], displayOrder: 1 },
    { slug: "movement-workshop", title: "MELT Movement Workshop", summary: "A forthcoming workshop connecting movement, reflection and research practice.", content: { body: "A forthcoming workshop connecting movement, reflection and research practice.", startDate: "2026", location: "Sri Lanka" }, media: [], contentType: "EVENT", tags: ["workshop", "event"], displayOrder: 1 }
  ],
  blogs: [{ slug: "why-i-dance", title: "Why I Dance…", excerpt: "A reflection on movement, research and the reasons dance continues to matter.", content: { body: "Why I Dance…" }, publishedAt: "2025-08-21" }]
};

export const staticPages = {
  about: { title: "Who We Are", body: "Welcome to DS Dance Research Lab (DSDRL), an international platform where movement becomes knowledge and dance transcends performance. We are a dynamic bridge connecting Sri Lanka and the United Kingdom, exploring artistic practices across both cultures and beyond. DSDRL is dedicated to fostering innovation in dance and performance, creating a space for rigorous research, critical dialogue, and creative experimentation.." },
  founder: { title: "Founder", body: "Dhanushka Seneviratne\n\nDance has always been more than movement; it is memory, resistance, ritual, and renewal. As a traditional Sri Lankan dancer and researcher, I have witnessed how dance can carry the weight of history while opening doors to innovation. DS Dance Research Lab was born from a desire to honour this duality to preserve the wisdom of our past while boldly exploring the possibilities of our future." },
  advisory: { title: "Advisory Committee", body: "Dr Sharon Phelan\nBryony Kummer-Seddon\nDr Ravibandhu Vidhyapathi\nDr S.A.N. Perera\nDulanga Gunarathna" },
  vision: "To be a leading global hub that redefines the boundaries of dance and performative practices through interdisciplinary inquiry, inspiring a deeper understanding of their impact on society.",
  mission: "We explore the intersection of dance and performative practices through scientific and academic research, critical dialogue, and creative experimentation. Our work spans education, choreography, visual and public art, technology, dance science, dance health and wellness, cultural identity, and emerging trends."
};

function normalizeProject(value: any): Project {
  return { ...value, content: value?.content && typeof value.content === "object" ? value.content : {}, media: Array.isArray(value?.media) ? value.media : [], contentType: value?.contentType || "RESEARCH_PROJECT", tags: Array.isArray(value?.tags) ? value.tags : [] };
}
export async function getContent(): Promise<SiteContent> {
  // The public site deliberately runs from this reviewed local dataset until
  // the client approves a separate JPanel integration.
  if (process.env.CMS_ENABLED !== "true") return seed;
  const base = process.env.JPANEL_API_URL?.replace(/\/$/, "");
  const slug = process.env.JPANEL_SITE_SLUG;
  if (!base || !slug) return seed;
  try {
    const response = await fetch(`${base}/public/sites/${slug}`, { next: { revalidate: 60 } });
    if (!response.ok) return seed;
    const value = await response.json();
    return { projects: Array.isArray(value.projects) && value.projects.length ? value.projects.map(normalizeProject) : seed.projects, blogs: Array.isArray(value.blogs) && value.blogs.length ? value.blogs : seed.blogs };
  } catch { return seed; }
}
export const text = (value: unknown) => typeof value === "string" ? value : "";
