import type { Metadata } from "next";
import { ResearchProjectIndex } from "@/components/content/research-project-index";

export const metadata: Metadata = { title: "Past Projects" };
export const dynamic = "force-dynamic";
export default function PastProjectsPage() { return <ResearchProjectIndex title="Past Projects" phase="PAST" image="/images/home/project-textile.png" />; }
