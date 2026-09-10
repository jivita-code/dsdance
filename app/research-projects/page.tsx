import type { Metadata } from "next";
import { ResearchProjectIndex } from "@/components/content/research-project-index";

export const metadata: Metadata = { title: "Research Projects" };
export default function ResearchProjectsPage() { return <ResearchProjectIndex title="Research Projects" image="/images/home/project-heritage.png" />; }
