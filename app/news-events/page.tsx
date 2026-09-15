import type { Metadata } from "next";
import { ProjectTypeIndex } from "@/components/content/project-type-index";
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "News & Events" };
export default function NewsEventsPage() { return <ProjectTypeIndex type="EVENT" eyebrow="WHAT'S ON" title="News & Events" image="/images/home/workshop-editorial.png" prefix="/news-events" />; }
