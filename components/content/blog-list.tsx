import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Blog } from "@/types/content";

export function BlogList({ items }: { items: Blog[] }) {
  if (!items.length) return <section className="emptyState"><p className="eyebrow gold">CONTENT COMING SOON</p><h2>Blogs</h2></section>;

  return <section className="archiveListing" aria-label="Blog archive"><div className="archiveProjectGrid">{items.map((blog, index) => <article className="archiveCard" data-reveal="card" data-reveal-delay={String(index % 4)} key={blog.slug}>
    <Link className="archiveCardLink" href={`/blogs/${blog.slug}`} aria-label={`Read article: ${blog.title}`}>
      <div className="archiveCardImage"><Image src={blog.coverImageUrl || "/images/home/journal-editorial.png"} alt="" fill sizes="(max-width: 680px) 100vw, (max-width: 1080px) 50vw, 33vw" /></div>
      <div className="archiveCardCopy"><p className="archiveCardStatus">Journal</p><h2>{blog.title}</h2>{blog.excerpt && <p>{blog.excerpt}</p>}<span className="archiveCardAction">Read article <ArrowRight size={16} aria-hidden="true" /></span></div>
    </Link>
  </article>)}</div></section>;
}
