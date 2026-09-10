import type { Metadata } from "next";
import { ResearchProjectIndex } from "@/components/content/research-project-index";

export const metadata: Metadata = { title: "Upcoming Projects" };
export default function UpcomingProjectsPage() { return <ResearchProjectIndex title="Upcoming Projects" phase="UPCOMING" image="/images/home/project-textile.png" />; }
