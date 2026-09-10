export type Media = {
  url: string;
  type: "image" | "video";
  originalName?: string;
};

export type ProjectType = "RESEARCH_PROJECT" | "PODCAST" | "EVENT";
export type ProjectPhase = "PAST" | "ONGOING" | "UPCOMING";

export type Project = {
  id?: string;
  slug: string;
  title: string;
  summary?: string | null;
  content: Record<string, unknown>;
  media: Media[];
  coverImageUrl?: string | null;
  projectUrl?: string | null;
  contentType: ProjectType;
  projectPhase?: ProjectPhase | null;
  tags?: string[];
  publishedAt?: string | null;
  displayOrder?: number;
};

export type Blog = {
  slug: string;
  title: string;
  excerpt?: string | null;
  content: Record<string, unknown>;
  coverImageUrl?: string | null;
  publishedAt?: string | null;
};

export type SiteContent = {
  projects: Project[];
  blogs: Blog[];
};
