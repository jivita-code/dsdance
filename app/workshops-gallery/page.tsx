import type { Metadata } from "next";
import { projectMedia } from "@/components/content/content-images";
import { Gallery } from "@/components/gallery/gallery";
import { PageHero } from "@/components/ui/page-hero";
import { getContent } from "@/lib/get-content";

export const metadata: Metadata = { title: "Workshops & Gallery" };
export const dynamic = "force-dynamic";

export default async function WorkshopsGalleryPage() {
  const content = await getContent();
  const projects = content.projects.filter((item) => item.contentType === "RESEARCH_PROJECT" && item.media.length);
  return <>
    <PageHero eyebrow="ARCHIVE" title="Workshops & Gallery" body="A visual record of our projects, practices and collaborations." image="/images/home/workshop-editorial.png" />
    {projects.length ? <section className="galleryPage">{projects.map((item, index) => <article key={item.slug}><div className="galleryHeading" data-reveal="text"><span>{String(index + 1).padStart(2, "0")}</span><h2>{item.title}</h2></div><Gallery title={item.title} media={projectMedia(item)} /></article>)}</section> : <section className="emptyState"><p className="eyebrow gold">CONTENT COMING SOON</p><h2>Workshops & Gallery</h2></section>}
  </>;
}
