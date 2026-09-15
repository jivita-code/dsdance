import { ProjectList } from "@/components/content/project-list";
import { PageHero } from "@/components/ui/page-hero";
import { getContent } from "@/lib/get-content";
import type { ProjectType } from "@/types/content";

type ProjectTypeIndexProps = {
  type: ProjectType;
  eyebrow: string;
  title: string;
  image: string;
  prefix: string;
};

export async function ProjectTypeIndex({ type, eyebrow, title, image, prefix }: ProjectTypeIndexProps) {
  const content = await getContent();
  const items = content.projects.filter((item) => item.contentType === type);
  return <><PageHero eyebrow={eyebrow} title={title} image={image} /><ProjectList items={items} prefix={prefix} emptyTitle={title} /></>;
}
