import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { projectCover, projectMedia } from "@/components/content/content-images";
import { orderedProjectContentEntries } from "@/components/content/project-detail";
import { hasContentValue, isSafeExternalUrl, StructuredValue } from "@/components/content/structured-content";
import { Gallery } from "@/components/gallery/gallery";
import { PageHero } from "@/components/ui/page-hero";
import { contentText } from "@/lib/get-content";
import type { Project } from "@/types/content";

type ProjectSection = {
  id: string;
  label: string;
  value: unknown;
  kind: "default" | "feature" | "steps" | "list";
};

function sectionKind(label: string): ProjectSection["kind"] {
  const name = label.toLowerCase();
  if (/submission process|application process|how to apply/.test(name)) return "steps";
  if (/rules|terms|locations|venues|eligibility/.test(name)) return "list";
  if (/call for entries|submit.*proposal|categories|fees/.test(name)) return "feature";
  return "default";
}

function sectionPriority(label: string) {
  const name = label.toLowerCase();
  if (/festival overview|^context$|^overview$/.test(name)) return 0;
  if (/call for entries/.test(name)) return 1;
  if (/categories|fees/.test(name)) return 2;
  if (/submission process|application process|how to apply/.test(name)) return 3;
  if (/rules|terms|eligibility/.test(name)) return 4;
  if (/screening locations|venues/.test(name)) return 5;
  if (/submit.*proposal/.test(name)) return 6;
  return 7;
}

function projectSections(content: Record<string, unknown>): ProjectSection[] {
  const entries = orderedProjectContentEntries(content);
  const isFestival = entries.some(([label]) => /festival overview|call for entries|submission process/i.test(label));
  const ordered = isFestival
    ? entries.map((entry, index) => ({ entry, index })).sort((a, b) => sectionPriority(a.entry[0]) - sectionPriority(b.entry[0]) || a.index - b.index).map(({ entry }) => entry)
    : entries;

  return ordered.map(([label, value], index) => ({
    id: "project-section-" + (index + 1),
    label,
    value,
    kind: sectionKind(label),
  }));
}

function ProjectLink({ url, label, className = "" }: { url: string; label: string; className?: string }) {
  return <a className={"upcomingSubmit " + className} href={url} target="_blank" rel="noopener noreferrer" aria-label={label + " (opens in a new tab)"}>{label} <ArrowRight size={18} aria-hidden="true" /></a>;
}

function InlineLinks({ text, proposalUrl }: { text: string; proposalUrl?: string }) {
  return <>{text.split(/(https?:\/\/[^\s]+|www\.[^\s]+|[\w.+-]+@[\w.-]+\.[a-z]{2,})/gi).map((part, index) => {
    if (/^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i.test(part)) return <a className="upcomingInlineLink" href={"mailto:" + part} key={index}>{part}</a>;
    const href = part.toLowerCase().startsWith("www.") ? "https://" + part : part;
    if (href === proposalUrl && isSafeExternalUrl(href)) return <ProjectLink url={href} label="Submit proposal" className="upcomingProposalLink" key={index} />;
    return isSafeExternalUrl(href)
      ? <a className="upcomingInlineLink" href={href} target="_blank" rel="noopener noreferrer" key={index}>{part}<ExternalLink size={13} aria-hidden="true" /></a>
      : part;
  })}</>;
}

function ProjectText({ value, proposalUrl }: { value: string; proposalUrl?: string }) {
  return <>{value.trim().split(/(?:\r?\n\s*)+|[ \t]{2,}/).map((paragraph, index) => paragraph.trim() && <p key={index}><InlineLinks text={paragraph.trim()} proposalUrl={proposalUrl} /></p>)}</>;
}

function ProjectFieldValue({ section }: { section: ProjectSection }) {
  const value = section.value;
  if (typeof value !== "string") return <StructuredValue value={value} />;

  const proposalUrl = /submit.*proposal/i.test(section.label)
    ? value.match(/https?:\/\/[^\s]+|www\.[^\s]+/gi)?.map((url) => url.toLowerCase().startsWith("www.") ? "https://" + url : url).find(isSafeExternalUrl)
    : undefined;
  if (section.kind === "steps") {
    const stages = value.trim().split(/(?=Stage\s+\d+\s*[—–:-])/gi).map((part) => part.trim()).filter(Boolean);
    if (stages.length > 0 && stages.every((part) => /^Stage\s+\d+\s*[—–:-]/i.test(part))) {
      return <ol className="upcomingStages">{stages.map((part, index) => {
        const match = part.match(/^Stage\s+(\d+)\s*[—–:-]\s*/i);
        const body = match ? part.slice(match[0].length) : part;
        return <li className="upcomingStage" key={index}><span>{String(match?.[1] || index + 1).padStart(2, "0")}</span><div><ProjectText value={body} /></div></li>;
      })}</ol>;
    }
  }

  const markers = value.match(/[●•👉]\s*/g);
  if (markers && markers.length >= 2) {
    const parts = value.split(/[●•👉]\s*/).map((part) => part.trim()).filter(Boolean);
    const hasPreamble = !/^\s*[●•👉]/.test(value);
    return <>{hasPreamble && parts[0] && <div className="upcomingFieldPreamble"><ProjectText value={parts[0]} proposalUrl={proposalUrl} /></div>}<ul className="upcomingBulletList">{parts.slice(hasPreamble ? 1 : 0).map((part, index) => <li key={index}><InlineLinks text={part} proposalUrl={proposalUrl} /></li>)}</ul></>;
  }

  return <ProjectText value={value} proposalUrl={proposalUrl} />;
}

export function UpcomingProjectDetail({ item }: { item: Project }) {
  const sections = projectSections(item.content);
  const projectSignals = [item.title, item.summary, ...(item.tags ?? []), ...sections.map((section) => section.label)]
    .filter(Boolean)
    .join(" ");
  const actionLabel = /submit.*proposal|call for entries/i.test(projectSignals)
    ? "Submit proposal"
    : /dance researchers?|research community|researchers['’]? community|scholars?/i.test(projectSignals)
      ? "Join the community"
      : /emerging artists?|artist platform|register|application|open call|festival/i.test(projectSignals)
        ? "Register"
        : "Visit project";
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
      <PageHero className="upcomingHero" eyebrow="UPCOMING PROJECT" title={item.title} body={item.summary || undefined} image={projectCover(item)} beforeContent={
        <Link className="upcomingBack" href="/research-projects/upcoming"><ArrowLeft size={16} aria-hidden="true" /> Back to upcoming projects</Link>
      } />
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
          <p className="eyebrow gold">At a glance</p>
          {(phase || timeline || locations.length > 0 || Boolean(item.tags?.length)) && <dl>
            {phase && <div><dt>Status</dt><dd>{phase}</dd></div>}
            {timeline && <div><dt>{/deadline/i.test(timeline) ? "Dates & deadlines" : "Timeline"}</dt><dd className="upcomingCalloutTimeline">{timeline.replace(/\s+/g, " ").trim()}</dd></div>}
            {locations.length > 0 && <div><dt>Location</dt><dd>{locations.map((location, index) => <span key={index}>{location}</span>)}</dd></div>}
            {item.tags?.length ? <div><dt>Focus</dt><dd>{item.tags.join(" · ")}</dd></div> : null}
          </dl>}
          {item.projectUrl && <ProjectLink url={item.projectUrl} label={actionLabel} />}
          {links.length > 0 && <div className="upcomingLinks">{links.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}<ExternalLink size={15} aria-hidden="true" /></a>)}</div>}
        </aside>
      </div>

      {sections.length > 0 && <section className="upcomingInformation" aria-labelledby="upcoming-information-title">
        <div className="upcomingInformationHeading">
          <p className="eyebrow gold">02 — Project information</p>
          <h2 id="upcoming-information-title">Explore the project</h2>
          <nav className="upcomingSectionNav" aria-label="On this page">{sections.map((section, index) => <a href={"#" + section.id} key={section.id}><span>{String(index + 1).padStart(2, "0")}</span>{section.label}</a>)}</nav>
          {item.projectUrl && <ProjectLink url={item.projectUrl} label={actionLabel} className="upcomingRailSubmit" />}
        </div>
        <div className="upcomingInformationBody">
          {item.projectUrl && <div className="upcomingMobileAction"><ProjectLink url={item.projectUrl} label={actionLabel} /></div>}
          <div className="upcomingFieldList">{sections.map((section, index) => <section className={"upcomingField upcomingField--" + section.kind} id={section.id} aria-labelledby={section.id + "-title"} data-reveal="text" key={section.id}>
            <div className="upcomingFieldHeading"><span>{String(index + 1).padStart(2, "0")}</span><h3 id={section.id + "-title"}>{section.label}</h3></div>
            <div className="upcomingFieldBody"><ProjectFieldValue section={section} /></div>
          </section>)}</div>
        </div>
      </section>}

      {media.length > 0 && <section className="upcomingGallery" aria-labelledby="upcoming-gallery-title">
        <div data-reveal="text"><p className="eyebrow gold">03 — Documentation</p><h2 id="upcoming-gallery-title">Project imagery</h2></div>
        <Gallery title={item.title} media={media} />
      </section>}
    </div>
  </article>;
}
