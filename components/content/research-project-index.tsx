import Link from "next/link";
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
  const filters = [
    { label: "All projects", href: "/research-projects", value: undefined },
    { label: "Ongoing", href: "/research-projects/ongoing", value: "ONGOING" },
    { label: "Past", href: "/research-projects/past", value: "PAST" },
    { label: "Upcoming", href: "/research-projects/upcoming", value: "UPCOMING" },
  ] as const;

  return <><PageHero eyebrow="RESEARCH" title={title} body={phase ? undefined : "Discover our diverse initiatives that blend dance, research, and education."} image={image} /><section className="researchListing" aria-label="Research project archive"><div className="researchListingIntro"><div><p className="eyebrow gold">Explore the archive</p><h2>{phase ? `${title}` : "Research projects"}</h2></div><nav className="researchProjectFilters" aria-label="Filter research projects by status">{filters.map((filter) => <Link className={`researchProjectFilter ${filter.value === phase ? "isActive" : ""}`} aria-current={filter.value === phase ? "page" : undefined} href={filter.href} key={filter.href}>{filter.label}</Link>)}</nav></div><ProjectList items={projects} prefix="/research-projects" emptyTitle={title} layout="research-grid" /></section></>;
}
