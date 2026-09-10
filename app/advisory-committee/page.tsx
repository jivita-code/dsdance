import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { organizationalContent } from "@/content/organizational";

export const metadata: Metadata = { title: "Advisory Committee" };

export default function AdvisoryCommitteePage() {
  return <article className="staticPage">
    <PageHero title="Advisory Committee" image="/images/home/journal-editorial.png" />
    <section className="peopleGrid">{organizationalContent.advisoryCommittee.map((person, index) => <article data-reveal="card" data-reveal-delay={String(index % 4)} key={person}><span>{String(index + 1).padStart(2, "0")}</span><h2>{person}</h2></article>)}</section>
  </article>;
}
