import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projectCover } from "@/components/content/content-images";
import { PageHero } from "@/components/ui/page-hero";
import { upcomingFestival } from "@/content/upcoming";
import { getContent } from "@/lib/get-content";

const phases = [
  { label: "All projects", href: "/research-projects" },
  { label: "Ongoing", href: "/research-projects/ongoing" },
  { label: "Past", href: "/research-projects/past" },
  { label: "Upcoming", href: "/research-projects/upcoming" },
] as const;

function googleFormUrl(value: string | undefined) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    if (url.hostname === "forms.gle" || (url.hostname === "docs.google.com" && url.pathname.startsWith("/forms/"))) {
      return url.toString();
    }
  } catch {
    return null;
  }
  return null;
}

function SubmitButton({ url }: { url: string | null }) {
  const label = <>Submit your proposal <ArrowRight size={18} aria-hidden="true" /></>;
  return url
    ? <a className="upcomingSubmit" href={url} target="_blank" rel="noopener noreferrer" aria-label="Submit your proposal in Google Forms (opens in a new tab)">{label}</a>
    : <button className="upcomingSubmit isDisabled" type="button" disabled aria-describedby="submission-status">{label}</button>;
}

export async function UpcomingProjectIndex() {
  const content = await getContent();
  const projects = content.projects.filter((item) => item.contentType === "RESEARCH_PROJECT" && item.projectPhase === "UPCOMING");
  const otherProjects = projects.filter((item) => item.slug !== "dance-on-camera");
  const submissionUrl = googleFormUrl(process.env.UPCOMING_SUBMISSION_URL);
  const festival = upcomingFestival;

  return (
    <main className="upcomingPage">
      <PageHero
        className="upcomingHero"
        eyebrow={festival.eyebrow}
        title={festival.title}
        body={festival.introduction}
        image="/images/home/hero-archive-reference.png"
      />

      <section className="upcomingMain" aria-labelledby="upcoming-title">
        <div className="siteShell">
          <nav className="upcomingPhaseNav" aria-label="Research project phases">
            {phases.map((phase) => <Link href={phase.href} aria-current={phase.label === "Upcoming" ? "page" : undefined} className={phase.label === "Upcoming" ? "isActive" : ""} key={phase.href}>{phase.label}</Link>)}
          </nav>

          <div className="upcomingIntro" id="festival">
            <div data-reveal="text">
              <p className="eyebrow gold">01 — The opportunity</p>
              <h2 id="upcoming-title">Dance on camera, across borders.</h2>
              <p>{festival.overview[0]}</p>
              <p>{festival.overview[1]}</p>
            </div>
            <aside className="upcomingCallout" aria-label="Submission at a glance" data-reveal="text">
              <p className="eyebrow gold">Stage 1 · Proposal call</p>
              <p className="upcomingCalloutDate">{festival.deadline}</p>
              <p className="upcomingCalloutTime">Submission deadline · {festival.deadlineTime}</p>
              <SubmitButton url={submissionUrl} />
              {!submissionUrl && <p id="submission-status" className="upcomingSubmissionStatus">The Google Form link has not been added yet.</p>}
            </aside>
          </div>

          <nav className="upcomingSectionNav" aria-label="Festival information">
            <a href="#dates-deadlines">Dates &amp; deadlines</a>
            <a href="#categories-fees">Categories &amp; fees</a>
            <a href="#submission-process">How to apply</a>
            <a href="#rules-terms">Rules &amp; terms</a>
          </nav>

          <div className="upcomingInformation">
            <div className="upcomingInformationMain">
              <section id="submission-process" className="upcomingInfoSection" aria-labelledby="process-title" data-reveal="text">
                <p className="eyebrow gold">02 — Take part</p>
                <h2 id="process-title">How to apply</h2>
                <div className="upcomingStages">
                  {festival.stages.map((stage, index) => <div className="upcomingStage" key={stage.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{stage.title}</h3><p>{stage.body}</p></div></div>)}
                </div>
              </section>

              <section id="rules-terms" className="upcomingInfoSection" aria-labelledby="rules-title" data-reveal="text">
                <p className="eyebrow gold">03 — Before you submit</p>
                <h2 id="rules-title">Rules &amp; terms</h2>
                <ul className="upcomingRules">{festival.rules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
              </section>
            </div>

            <aside className="upcomingFacts" aria-label="Festival dates and categories">
              <section id="dates-deadlines" aria-labelledby="dates-title" data-reveal="text">
                <p className="eyebrow gold">At a glance</p>
                <h2 id="dates-title">Dates &amp; deadlines</h2>
                <dl>
                  <div><dt>Proposal deadline</dt><dd>{festival.deadline}<small>{festival.deadlineTime}</small></dd></div>
                  <div><dt>Festival screenings</dt><dd>{festival.screeningDate}</dd></div>
                  <div><dt>Locations</dt><dd>{festival.locations.map((location) => <span key={location}>{location}</span>)}</dd></div>
                </dl>
              </section>

              <section id="categories-fees" aria-labelledby="categories-title" data-reveal="text">
                <p className="eyebrow gold">The open call</p>
                <h2 id="categories-title">Categories &amp; fees</h2>
                <p className="upcomingFactLabel">Eligible work</p>
                <p>Original short screen dance films, up to 10 minutes. We welcome proposals exploring:</p>
                <ul className="upcomingApproaches">{festival.approaches.map((approach) => <li key={approach}>{approach}</li>)}</ul>
                <div className="upcomingFee"><span>Submission fee</span><strong>Not announced</strong></div>
                <p className="upcomingFactNote">The announcement does not state a fee. No payment is requested on this website.</p>
              </section>
            </aside>
          </div>

          <div className="upcomingClosing" data-reveal="text">
            <div><p className="eyebrow gold">Move the story forward</p><h2>Ready to share your vision?</h2><p>Begin with a short proposal. For questions about the festival, email <a href={"mailto:" + festival.contact}>{festival.contact}</a>.</p></div>
            <div><SubmitButton url={submissionUrl} />{!submissionUrl && <p>The submission form link is coming soon.</p>}</div>
          </div>
        </div>
      </section>

      {otherProjects.length > 0 && <section className="upcomingMore" aria-labelledby="upcoming-more-title"><div className="siteShell"><div className="upcomingMoreHeading" data-reveal="text"><p className="eyebrow gold">Beyond the festival</p><h2 id="upcoming-more-title">More upcoming projects</h2></div><div className="upcomingMoreGrid">{otherProjects.map((item, index) => <article className="upcomingMoreCard" data-reveal="card" data-reveal-delay={String(index % 4)} key={item.slug}><Link href={"/research-projects/" + item.slug} aria-label={"View project: " + item.title}><div className="upcomingMoreImage"><Image src={projectCover(item)} alt="" fill sizes="(max-width: 680px) 100vw, 50vw" /></div><div className="upcomingMoreCopy"><p className="eyebrow gold">Upcoming project</p><h3>{item.title}</h3>{item.summary && <p>{item.summary}</p>}<span>Explore project <ExternalLink size={15} aria-hidden="true" /></span></div></Link></article>)}</div></div></section>}
    </main>
  );
}
