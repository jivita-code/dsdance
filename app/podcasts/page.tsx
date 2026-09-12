import type { Metadata } from "next";
import { ProjectTypeIndex } from "@/components/content/project-type-index";
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Podcasts" };
export default function PodcastsPage() { return <ProjectTypeIndex type="PODCAST" eyebrow="LISTEN" title="Podcasts" image="/images/home/podcast-editorial.png" prefix="/podcasts" />; }
