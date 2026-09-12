import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Blog } from "@/types/content";

export function BlogList({ items }: { items: Blog[] }) {
  if (!items.length) return <section className="emptyState"><p className="eyebrow gold">CONTENT COMING SOON</p><h2>Blogs</h2></section>;

  return <div className="listing">{items.map((blog, index) => <article className="listingCard" data-reveal="card" data-reveal-delay={String(index % 4)} key={blog.slug}>
    <Link className="listingMedia" href={`/blogs/${blog.slug}`}><Image src={blog.coverImageUrl || "/images/home/journal-editorial.png"} alt="" fill sizes="(max-width: 760px) 100vw, 42vw" /><span>{String(index + 1).padStart(2, "0")}</span></Link>
    <div className="listingCopy"><p className="eyebrow gold">Journal</p><h2>{blog.title}</h2><p>{blog.excerpt}</p><Link className="textLink" href={`/blogs/${blog.slug}`}>Read article <ArrowRight size={16} /></Link></div>
  </article>)}</div>;
}
