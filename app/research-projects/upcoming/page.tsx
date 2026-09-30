import type { Metadata } from "next";
import { UpcomingProjectIndex } from "@/components/content/upcoming-project-index";

export const metadata: Metadata = { title: "Upcoming Projects" };
export const dynamic = "force-dynamic";
export default function UpcomingProjectsPage() { return <UpcomingProjectIndex />; }
