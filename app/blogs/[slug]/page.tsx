import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { contentText, getContent } from "@/lib/get-content";

type BlogPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent();
  const blog = content.blogs.find((item) => item.slug === slug);
  return { title: blog?.title || "Blog" };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const content = await getContent();
  const blog = content.blogs.find((item) => item.slug === slug);
  if (!blog) notFound();
  return <article className="detail"><Link className="back" data-reveal="text" href="/blogs"><ArrowLeft size={16} /> All blogs</Link><PageHero eyebrow="JOURNAL" title={blog.title} body={blog.excerpt || undefined} image={blog.coverImageUrl || "/images/home/journal-editorial.png"} /><p className="bodyCopy" data-reveal="text">{contentText(blog.content.body)}</p></article>;
}
