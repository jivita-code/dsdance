import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projectCover } from "@/components/content/content-images";
import type { Project } from "@/types/content";

export function ProjectList({ items, prefix }: { items: Project[]; prefix: string }) {
  if (!items.length) return <section className="emptyState"><p className="eyebrow gold">DS DANCE RESEARCH LAB</p><h2>Research Projects</h2></section>;

  return <div className="listing">{items.map((item, index) => <article className="listingCard" data-reveal="card" data-reveal-delay={String(index % 4)} key={item.slug}>
    <Link className="listingMedia" href={`${prefix}/${item.slug}`}><Image src={projectCover(item)} alt="" fill sizes="(max-width: 760px) 100vw, 42vw" /><span>{String(index + 1).padStart(2, "0")}</span></Link>
    <div className="listingCopy"><p className="eyebrow gold">{item.projectPhase || item.contentType.replace("_", " ")}</p><h2>{item.title}</h2><p>{item.summary}</p><Link className="textLink" href={`${prefix}/${item.slug}`}>Read more <ArrowRight size={16} /></Link></div>
  </article>)}</div>;
}
