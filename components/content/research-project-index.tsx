import { ProjectList } from "@/components/content/project-list";
import { PageHero } from "@/components/ui/page-hero";
import { getContent } from "@/lib/get-content";
import type { ProjectPhase } from "@/types/content";

type ResearchProjectIndexProps = {
  title: string;
  phase?: ProjectPhase;
  image: string;
};

export async function ResearchProjectIndex({ title, phase, image }: ResearchProjectIndexProps) {
  const content = await getContent();
  const projects = content.projects.filter((item) => item.contentType === "RESEARCH_PROJECT" && (!phase || item.projectPhase === phase));
  return <><PageHero eyebrow="RESEARCH" title={title} body={phase ? undefined : "Discover our diverse initiatives that blend dance, research, and education."} image={image} /><ProjectList items={projects} prefix="/research-projects" /></>;
}
