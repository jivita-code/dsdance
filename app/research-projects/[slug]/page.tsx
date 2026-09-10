import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetail } from "@/components/content/project-detail";
import { getContent } from "@/lib/get-content";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent();
  const item = content.projects.find((project) => project.contentType === "RESEARCH_PROJECT" && project.slug === slug);
  return { title: item?.title || "Research Project" };
}

export default async function ResearchProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const content = await getContent();
  const item = content.projects.find((project) => project.contentType === "RESEARCH_PROJECT" && project.slug === slug);
  if (!item) notFound();
  return <ProjectDetail item={item} back="/research-projects" />;
}
