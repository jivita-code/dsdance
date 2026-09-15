import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { ContentSections, hasContentValue, isSafeExternalUrl, StructuredValue } from "@/components/content/structured-content";
import type { Blog } from "@/types/content";

function formatPublishedDate(value?: string | null) {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function blogLinks(content: Record<string, unknown>) {
  if (!content.links || typeof content.links !== "object") return [];

  return Object.entries(content.links as Record<string, unknown>).filter(
    (entry): entry is [string, string] => typeof entry[1] === "string" && isSafeExternalUrl(entry[1]),
  );
}

export function BlogDetail({ blog, related = [] }: { blog: Blog; related?: Blog[] }) {
  const publishedDate = formatPublishedDate(blog.publishedAt);
  const links = blogLinks(blog.content);
  const cover = blog.coverImageUrl || "/images/home/journal-editorial.png";
  const body = blog.content.body;
  const contentEntries = Object.entries(blog.content).filter(([key, value]) => !["body", "links"].includes(key.trim().toLowerCase()) && hasContentValue(value));

  return (
    <article className="detail blogDetail">
      <div className="detailHero">
        <PageHero eyebrow="JOURNAL" title={blog.title} body={blog.excerpt || undefined} image={cover} />
        <Link className="detailBack" href="/blogs">
          <ArrowLeft size={16} aria-hidden="true" /> All blogs
        </Link>
      </div>

      <section className="blogArticle">
        <aside className="blogMeta" data-reveal="text">
          <p className="eyebrow">JOURNAL ENTRY</p>
          {publishedDate && <div><span>Published</span><time dateTime={blog.publishedAt || undefined}>{publishedDate}</time></div>}
          {links.length > 0 && <div className="blogLinks"><span>Related links</span>{links.map(([label, href]) => <a href={href} key={label} rel="noreferrer" target="_blank">{label} <ExternalLink aria-hidden="true" size={14} /></a>)}</div>}
        </aside>

        <div className="blogCopy">
          {blog.excerpt && <p className="detailSummary" data-reveal="text">{blog.excerpt}</p>}
          {hasContentValue(body) && <div className="bodyCopy" data-reveal="text"><StructuredValue value={body} /></div>}
          {contentEntries.length > 0 && <ContentSections entries={contentEntries} />}
        </div>
      </section>

      {related.length > 0 && <section className="relatedBlogs"><div className="relatedBlogsHeading" data-reveal="text"><p className="eyebrow gold">CONTINUE READING</p><h2>More from the journal</h2></div><div className="relatedBlogsGrid">{related.map((item, index) => <Link className="relatedBlogCard" data-reveal="card" data-reveal-delay={String(index)} href={`/blogs/${item.slug}`} key={item.slug}><div><Image alt="" fill sizes="(max-width: 760px) 100vw, 30vw" src={item.coverImageUrl || "/images/home/journal-editorial.png"} /></div><p>Journal</p><h3>{item.title}</h3><span>Read article <ArrowRight aria-hidden="true" size={15} /></span></Link>)}</div></section>}
    </article>
  );
}
