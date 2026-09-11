import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { organizationalContent } from "@/content/organizational";

export const metadata: Metadata = { title: "Advisory Committee" };

export default function AdvisoryCommitteePage() {
  return (
    <article className="advisoryPage">
      <PageHero eyebrow="WHO WE ARE" title="Advisory Committee" image="/images/home/journal-editorial.png" />
      <section className="advisoryIntroduction" aria-label="Advisory committee profiles">
        <p className="eyebrow" data-reveal="text">05 — PERSPECTIVES</p>
      </section>
      <div className="advisoryProfiles">
        {organizationalContent.advisoryCommittee.map((person, index) => (
          <article className="advisoryProfile" key={person.name}>
            <div className="advisoryPortrait" data-reveal="image">
              <Image src={person.image} alt={person.alt} fill sizes="(max-width: 860px) calc(100vw - 48px), 42vw" />
            </div>
            <div className="advisoryCopy">
              <p className="eyebrow" data-reveal="text">{String(index + 1).padStart(2, "0")} — ADVISORY COMMITTEE</p>
              <h2 data-reveal="text">{person.name}</h2>
              {person.paragraphs.map((paragraph, paragraphIndex) => <p data-reveal="text" key={paragraphIndex}>{paragraph}</p>)}
            </div>
          </article>
        ))}
      </div>
    </article>
  );
}
