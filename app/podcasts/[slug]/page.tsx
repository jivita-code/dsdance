import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/content/project-detail";
import { getContent } from "@/lib/get-content";

type PodcastPageProps = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PodcastPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent();
  const item = content.projects.find((project) => project.contentType === "PODCAST" && project.slug === slug);
  return { title: item?.title || "Podcast" };
}

export default async function PodcastPage({ params }: PodcastPageProps) {
  const { slug } = await params;
  const content = await getContent();
  const item = content.projects.find((project) => project.contentType === "PODCAST" && project.slug === slug);
  if (!item) notFound();
  const related = content.projects.filter((project) => project.contentType === "PODCAST" && project.slug !== item.slug).slice(0, 3);
  return <ProjectDetail item={item} back="/podcasts" related={related} />;
}
