import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projectCover, projectMedia } from "@/components/content/content-images";
import { Gallery } from "@/components/gallery/gallery";
import { PageHero } from "@/components/ui/page-hero";
import { contentText } from "@/lib/get-content";
import type { Project } from "@/types/content";

export function ProjectDetail({ item, back }: { item: Project; back: string }) {
  const links = item.content.links && typeof item.content.links === "object"
    ? Object.entries(item.content.links as Record<string, unknown>).filter((entry): entry is [string, string] => typeof entry[1] === "string")
    : [];

  return <article className="detail">
    <Link className="back" data-reveal="text" href={back}><ArrowLeft size={16} /> Back</Link>
    <PageHero eyebrow={item.contentType.replace("_", " ")} title={item.title} body={item.summary || undefined} image={projectCover(item)} />
    <div className="detailBody"><p className="bodyCopy" data-reveal="text">{contentText(item.content.body)}</p>{item.projectUrl && <a className="goldButton" data-reveal="text" href={item.projectUrl} target="_blank" rel="noreferrer">Visit external project <ExternalLink size={16} /></a>}{links.length > 0 && <div className="externalLinks" data-reveal="text">{links.map(([name, href]) => <a key={name} href={href} target="_blank" rel="noreferrer">{name} <ExternalLink size={14} /></a>)}</div>}</div>
    <Gallery title={item.title} media={projectMedia(item)} />
  </article>;
}
