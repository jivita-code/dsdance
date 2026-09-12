import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { projectCover, projectMedia } from "@/components/content/content-images";
import { ContentSections, hasContentValue, isSafeExternalUrl, StructuredValue } from "@/components/content/structured-content";
import { Gallery } from "@/components/gallery/gallery";
import { PageHero } from "@/components/ui/page-hero";
import { contentText } from "@/lib/get-content";
import type { Project } from "@/types/content";

const projectSectionOrder = [
  ["context", "Context"],
  ["methodology", "Methodology"],
  ["objectives", "Objectives"],
  ["artistic engagement", "Artistic Engagement"],
  ["community engagement", "Community Engagement"],
  ["site specific performance", "Site-Specific Performance"],
  ["sustainability and ecology", "Sustainability & Ecology"],
  ["collaborative research", "Collaborative Research"],
  ["public interaction", "Public Interaction"],
  ["collaborative contributions", "Collaborative Contributions"],
  ["project", "Project"],
  ["dance film", "Dance Film"],
  ["archival integration", "Archival Integration"],
  ["outputs", "Outputs"],
] as const;

function normalizedFieldName(value: string) {
  return value
    .trim()
    .replace(/:$/, "")
    .replace(/[‐‑–—-]/g, " ")
    .replace(/&/g, "and")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function orderedProjectContentEntries(content: Record<string, unknown>) {
  const controlFields = new Set(["type", "status", "timeline", "locations", "location", "tags", "body", "links"]);
  const knownSections = new Map<string, { label: string; order: number }>(projectSectionOrder.map(([field, label], index) => [field, { label, order: index }]));
  knownSections.set("dancefilm", { label: "Dance Film", order: 11 });
  knownSections.set("archival", { label: "Archival Integration", order: 12 });

  return Object.entries(content)
    .map(([field, value], index) => {
      const normalized = normalizedFieldName(field);
      const section = knownSections.get(normalized);
      return {
        field,
        value,
        index,
        include: !controlFields.has(normalized) && hasContentValue(value),
        label: section?.label || field.trim().replace(/:$/, "").replace(/\s+/g, " "),
        order: section?.order ?? 9.5,
      };
    })
    .filter((entry) => entry.include)
    .sort((a, b) => a.order - b.order || a.index - b.index)
    .map((entry) => [entry.label, entry.value] as [string, unknown]);
}

export function ProjectDetail({ item, back, related = [] }: { item: Project; back: string; related?: Project[] }) {
  const links = item.content.links && typeof item.content.links === "object"
    ? Object.entries(item.content.links as Record<string, unknown>).filter((entry): entry is [string, string] => typeof entry[1] === "string" && isSafeExternalUrl(entry[1]))
    : [];
  const timeline = contentText(item.content.timeline);
  const phase = contentText(item.content.status) || item.projectPhase?.toLowerCase();
  const locations = Array.isArray(item.content.locations)
    ? item.content.locations.filter((location): location is string => typeof location === "string")
    : contentText(item.content.Locations || item.content.location) ? [contentText(item.content.Locations || item.content.location)] : [];
  const media = projectMedia(item);
  const labels = item.contentType === "PODCAST"
    ? { eyebrow: "PODCAST", back: "Back to podcasts", heading: "About this podcast", related: "More podcasts" }
    : item.contentType === "EVENT"
      ? { eyebrow: "NEWS & EVENT", back: "Back to news & events", heading: "About this event", related: "More news & events" }
      : { eyebrow: "RESEARCH PROJECT", back: "Back to projects", heading: "About this project", related: "Other research projects" };
  const contentEntries = orderedProjectContentEntries(item.content);
  const body = item.content.body;

  return <article className="detail">
    <div className="detailHero">
      <PageHero eyebrow={labels.eyebrow} title={item.title} body={item.summary || undefined} image={projectCover(item)} />
      <Link className="detailBack" href={back}><ArrowLeft size={16} aria-hidden="true" /> {labels.back}</Link>
    </div>
    <section className="detailArticle">
      <div className="detailCopy">
        <p className="eyebrow" data-reveal="text">01 — OVERVIEW</p>
        <h2 data-reveal="text">{labels.heading}</h2>
        {item.summary && <p className="detailSummary" data-reveal="text">{item.summary}</p>}
        {hasContentValue(body) && <div className="bodyCopy" data-reveal="text"><StructuredValue value={body} /></div>}
        {contentEntries.length > 0 && <ContentSections entries={contentEntries} />}
      </div>
      <aside className="detailMeta" data-reveal="text">
        <p className="eyebrow">PROJECT DETAILS</p>
        <dl>
          {phase && <div><dt>Phase</dt><dd>{phase}</dd></div>}
          {timeline && <div><dt>Timeline</dt><dd>{timeline}</dd></div>}
          {locations.length > 0 && <div><dt>Location</dt><dd>{locations.join(", ")}</dd></div>}
          {item.tags?.length ? <div><dt>Focus</dt><dd>{item.tags.join(" · ")}</dd></div> : null}
        </dl>
        {(item.projectUrl || links.length > 0) && <div className="detailLinks"><p className="eyebrow">PROJECT LINKS</p>{item.projectUrl && <a className="textLink" href={item.projectUrl} target="_blank" rel="noreferrer">Visit external project <ExternalLink size={15} aria-hidden="true" /></a>}{links.map(([name, href]) => <a className="textLink" key={name} href={href} target="_blank" rel="noreferrer">{name} <ExternalLink size={15} aria-hidden="true" /></a>)}</div>}
      </aside>
    </section>
    {media.length > 0 && <section className="detailGallery"><div className="detailGalleryHeading" data-reveal="text"><p className="eyebrow">02 — DOCUMENTATION</p><h2>Project imagery</h2></div><Gallery title={item.title} media={media} /></section>}
    {related.length > 0 && <section className="relatedProjects"><div className="relatedProjectsHeading" data-reveal="text"><p className="eyebrow gold">CONTINUE EXPLORING</p><h2>{labels.related}</h2></div><div className="relatedProjectsGrid">{related.map((project, index) => <Link className="relatedProjectCard" data-reveal="card" data-reveal-delay={String(index)} href={`${back}/${project.slug}`} key={project.slug}><div><Image src={projectCover(project)} alt="" fill sizes="(max-width: 760px) 100vw, 30vw" /></div><p>{project.projectPhase || project.contentType.replace("_", " ")}</p><h3>{project.title}</h3><span>View details <ExternalLink size={14} aria-hidden="true" /></span></Link>)}</div></section>}
  </article>;
}
