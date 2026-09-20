import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projectCover } from "@/components/content/content-images";
import type { Project } from "@/types/content";

type ProjectListProps = {
  items: Project[];
  prefix: string;
  emptyTitle?: string;
  layout?: "editorial" | "research-grid" | "archive-grid";
};

function phaseLabel(item: Project) {
  return item.projectPhase ? `${item.projectPhase[0]}${item.projectPhase.slice(1).toLowerCase()} project` : item.contentType.replace("_", " ");
}

export function ProjectList({ items, prefix, emptyTitle = "Research Projects", layout = "editorial" }: ProjectListProps) {
  if (!items.length) return <section className="emptyState"><p className="eyebrow gold">CONTENT COMING SOON</p><h2>{emptyTitle}</h2></section>;

  if (layout === "research-grid") return <div className="researchProjectGrid">{items.map((item, index) => <article className="researchProjectCard" data-reveal="card" data-reveal-delay={String(index % 4)} key={item.slug}>
    <Link className="researchProjectLink" href={`${prefix}/${item.slug}`} aria-label={`View project: ${item.title}`}>
      <div className="researchProjectImage"><Image src={projectCover(item)} alt="" fill sizes="(max-width: 680px) 100vw, (max-width: 1080px) 50vw, 33vw" /></div>
      <div className="researchProjectCopy"><p className="researchProjectStatus">{phaseLabel(item)}</p><h2>{item.title}</h2>{item.summary && <p className="researchProjectSummary">{item.summary}</p>}<span className="researchProjectAction">View project <ArrowRight size={16} aria-hidden="true" /></span></div>
    </Link>
  </article>)}</div>;

  if (layout === "archive-grid") return <section className="archiveListing" aria-label={emptyTitle}><div className="archiveProjectGrid">{items.map((item, index) => <article className="archiveCard" data-reveal="card" data-reveal-delay={String(index % 4)} key={item.slug}>
    <Link className="archiveCardLink" href={`${prefix}/${item.slug}`} aria-label={`Listen to ${item.title}`}>
      <div className="archiveCardImage"><Image src={projectCover(item)} alt="" fill sizes="(max-width: 680px) 100vw, (max-width: 1080px) 50vw, 33vw" /></div>
      <div className="archiveCardCopy"><p className="archiveCardStatus">{phaseLabel(item)}</p><h2>{item.title}</h2>{item.summary && <p>{item.summary}</p>}<span className="archiveCardAction">Listen now <ArrowRight size={16} aria-hidden="true" /></span></div>
    </Link>
  </article>)}</div></section>;

  return <div className="listing">{items.map((item, index) => <article className="listingCard" data-reveal="card" data-reveal-delay={String(index % 4)} key={item.slug}>
    <Link className="listingMedia" href={`${prefix}/${item.slug}`}><Image src={projectCover(item)} alt="" fill sizes="(max-width: 760px) 100vw, 42vw" /><span>{String(index + 1).padStart(2, "0")}</span></Link>
    <div className="listingCopy"><p className="eyebrow gold">{phaseLabel(item)}</p><h2>{item.title}</h2><p>{item.summary}</p><Link className="textLink" href={`${prefix}/${item.slug}`}>Read more <ArrowRight size={16} /></Link></div>
  </article>)}</div>;
}
