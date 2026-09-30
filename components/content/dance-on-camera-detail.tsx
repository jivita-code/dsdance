import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { projectCover, projectMedia } from "@/components/content/content-images";
import { orderedProjectContentEntries } from "@/components/content/project-detail";
import { ContentSections, hasContentValue, isSafeExternalUrl, StructuredValue } from "@/components/content/structured-content";
import { Gallery } from "@/components/gallery/gallery";
import { PageHero } from "@/components/ui/page-hero";
import { contentText } from "@/lib/get-content";
import type { Project } from "@/types/content";

function SubmitLink({ url, className = "" }: { url: string; className?: string }) {
  return <a className={"upcomingSubmit " + className} href={url} target="_blank" rel="noopener noreferrer" aria-label="Submit proposal (opens in a new tab)">Submit proposal <ArrowRight size={18} aria-hidden="true" /></a>;
}

export function DanceOnCameraDetail({ item }: { item: Project }) {
  const entries = orderedProjectContentEntries(item.content);
  const media = projectMedia(item);
  const body = item.content.body;
  const timeline = contentText(item.content.timeline);
  const phase = contentText(item.content.status) || item.projectPhase?.toLowerCase();
  const locations = Array.isArray(item.content.locations)
    ? item.content.locations.filter((value): value is string => typeof value === "string")
    : contentText(item.content.Locations || item.content.location)
      ? [contentText(item.content.Locations || item.content.location)]
      : [];
  const links = item.content.links && typeof item.content.links === "object" && !Array.isArray(item.content.links)
    ? Object.entries(item.content.links as Record<string, unknown>)
      .filter((entry): entry is [string, string] => typeof entry[1] === "string" && isSafeExternalUrl(entry[1]))
    : [];

  return <article className="upcomingPage">
    <div className="upcomingHeroWrap">
      <PageHero
        className="upcomingHero"
        eyebrow="RESEARCH PROJECT"
        title={item.title}
        body={item.summary || undefined}
        image={projectCover(item)}
      />
      <Link className="upcomingBack" href="/research-projects/upcoming"><ArrowLeft size={16} aria-hidden="true" /> Back to upcoming projects</Link>
    </div>

    <div className="siteShell upcomingMain">
      <div className="upcomingIntro">
        <section className="upcomingOverview" aria-labelledby="upcoming-overview-title">
          <p className="eyebrow gold" data-reveal="text">01 — Overview</p>
          <h2 id="upcoming-overview-title" data-reveal="text">About this project</h2>
          {item.summary && <p className="upcomingSummary" data-reveal="text">{item.summary}</p>}
          {hasContentValue(body) && <div className="upcomingBody bodyCopy" data-reveal="text"><StructuredValue value={body} /></div>}
        </section>

        <aside className="upcomingCallout" aria-label="Project details" data-reveal="text">
          <p className="eyebrow gold">Project details</p>
          {(phase || timeline || locations.length > 0 || Boolean(item.tags?.length)) && <dl>
            {phase && <div><dt>Status</dt><dd>{phase}</dd></div>}
            {timeline && <div><dt>Timeline</dt><dd>{timeline}</dd></div>}
            {locations.length > 0 && <div><dt>Location</dt><dd>{locations.map((location, index) => <span key={index}>{location}</span>)}</dd></div>}
            {item.tags?.length ? <div><dt>Focus</dt><dd>{item.tags.join(" · ")}</dd></div> : null}
          </dl>}
          {item.projectUrl && <SubmitLink url={item.projectUrl} />}
          {links.length > 0 && <div className="upcomingLinks">{links.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}<ExternalLink size={15} aria-hidden="true" /></a>)}</div>}
        </aside>
      </div>

      {entries.length > 0 && <section className="upcomingInformation" aria-labelledby="upcoming-information-title">
        <div className="upcomingInformationHeading">
          <p className="eyebrow gold">02 — Project information</p>
          <h2 id="upcoming-information-title">Explore the project</h2>
          {item.projectUrl && <SubmitLink url={item.projectUrl} className="upcomingRailSubmit" />}
        </div>
        <div className="upcomingInformationBody">
          {item.projectUrl && <div className="upcomingMobileAction"><SubmitLink url={item.projectUrl} /></div>}
          <ContentSections entries={entries} />
        </div>
      </section>}

      {media.length > 0 && <section className="upcomingGallery" aria-labelledby="upcoming-gallery-title">
        <div data-reveal="text"><p className="eyebrow gold">03 — Documentation</p><h2 id="upcoming-gallery-title">Project imagery</h2></div>
        <Gallery title={item.title} media={media} />
      </section>}
    </div>
  </article>;
}
