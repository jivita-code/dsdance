import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projectCover, projectMedia } from "@/components/content/content-images";
import { Gallery } from "@/components/gallery/gallery";
import { PageHero } from "@/components/ui/page-hero";
import { contentText } from "@/lib/get-content";
import type { Project } from "@/types/content";

export function ProjectDetail({ item, back, related = [] }: { item: Project; back: string; related?: Project[] }) {
  const links = item.content.links && typeof item.content.links === "object"
    ? Object.entries(item.content.links as Record<string, unknown>).filter((entry): entry is [string, string] => typeof entry[1] === "string")
    : [];
  const timeline = contentText(item.content.timeline) || item.projectPhase?.toLowerCase();
  const locations = Array.isArray(item.content.locations)
    ? item.content.locations.filter((location): location is string => typeof location === "string")
    : contentText(item.content.location) ? [contentText(item.content.location)] : [];
  const media = projectMedia(item);

  return <article className="detail">
    <div className="detailHero">
      <PageHero eyebrow="RESEARCH PROJECT" title={item.title} body={item.summary || undefined} image={projectCover(item)} />
      <Link className="detailBack" href={back}><ArrowLeft size={16} aria-hidden="true" /> Back to projects</Link>
    </div>
    <section className="detailArticle">
      <div className="detailCopy">
        <p className="eyebrow" data-reveal="text">01 — PROJECT OVERVIEW</p>
        <h2 data-reveal="text">About this project</h2>
        {item.summary && <p className="detailSummary" data-reveal="text">{item.summary}</p>}
        <p className="bodyCopy" data-reveal="text">{contentText(item.content.body)}</p>
      </div>
      <aside className="detailMeta" data-reveal="text">
        <p className="eyebrow">PROJECT DETAILS</p>
        <dl>
          {timeline && <div><dt>Phase</dt><dd>{timeline}</dd></div>}
          {locations.length > 0 && <div><dt>Location</dt><dd>{locations.join(", ")}</dd></div>}
          {item.tags?.length ? <div><dt>Focus</dt><dd>{item.tags.join(" · ")}</dd></div> : null}
        </dl>
        {(item.projectUrl || links.length > 0) && <div className="detailLinks"><p className="eyebrow">PROJECT LINKS</p>{item.projectUrl && <a className="textLink" href={item.projectUrl} target="_blank" rel="noreferrer">Visit external project <ExternalLink size={15} aria-hidden="true" /></a>}{links.map(([name, href]) => <a className="textLink" key={name} href={href} target="_blank" rel="noreferrer">{name} <ExternalLink size={15} aria-hidden="true" /></a>)}</div>}
      </aside>
    </section>
    {media.length > 0 && <section className="detailGallery"><div className="detailGalleryHeading" data-reveal="text"><p className="eyebrow">02 — DOCUMENTATION</p><h2>Project imagery</h2></div><Gallery title={item.title} media={media} /></section>}
    {related.length > 0 && <section className="relatedProjects"><div className="relatedProjectsHeading" data-reveal="text"><p className="eyebrow gold">CONTINUE EXPLORING</p><h2>Other research projects</h2></div><div className="relatedProjectsGrid">{related.map((project, index) => <Link className="relatedProjectCard" data-reveal="card" data-reveal-delay={String(index)} href={`/research-projects/${project.slug}`} key={project.slug}><div><Image src={projectCover(project)} alt="" fill sizes="(max-width: 760px) 100vw, 30vw" /></div><p>{project.projectPhase || "RESEARCH PROJECT"}</p><h3>{project.title}</h3><span>View project <ExternalLink size={14} aria-hidden="true" /></span></Link>)}</div></section>}
  </article>;
}
