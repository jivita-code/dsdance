import type { Metadata } from "next";
import { BlogList } from "@/components/content/blog-list";
import { PageHero } from "@/components/ui/page-hero";
import { getContent } from "@/lib/get-content";

export const metadata: Metadata = { title: "Blogs" };

export default async function BlogsPage() {
  const content = await getContent();
  return <><PageHero eyebrow="JOURNAL" title="Blogs" image="/images/home/journal-editorial.png" /><BlogList items={content.blogs} /></>;
}
