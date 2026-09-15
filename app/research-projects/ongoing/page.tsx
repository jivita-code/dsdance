import type { Metadata } from "next";
import { ResearchProjectIndex } from "@/components/content/research-project-index";

export const metadata: Metadata = { title: "Ongoing Projects" };
export const dynamic = "force-dynamic";
export default function OngoingProjectsPage() { return <ResearchProjectIndex title="Ongoing Projects" phase="ONGOING" image="/images/home/project-textile.png" />; }
