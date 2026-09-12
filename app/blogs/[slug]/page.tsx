import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetail } from "@/components/content/blog-detail";
import { getContent } from "@/lib/get-content";

type BlogPageProps = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";

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
  const related = content.blogs.filter((item) => item.slug !== blog.slug).slice(0, 3);

  return <BlogDetail blog={blog} related={related} />;
}
