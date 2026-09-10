import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/content/project-detail";
import { getContent } from "@/lib/get-content";

type EventPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent();
  const item = content.projects.find((project) => project.contentType === "EVENT" && project.slug === slug);
  return { title: item?.title || "News & Event" };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const content = await getContent();
  const item = content.projects.find((project) => project.contentType === "EVENT" && project.slug === slug);
  if (!item) notFound();
  return <ProjectDetail item={item} back="/news-events" />;
}
