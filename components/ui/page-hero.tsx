import Image from "next/image";
import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  image?: string;
  portrait?: string;
  beforeContent?: ReactNode;
  className?: string;
};

export function PageHero({ eyebrow, title, body, image = "/images/home/hero.png", portrait, beforeContent, className = "" }: PageHeroProps) {
  return <section className={`pageHero ${className}`}>
    <Image className="pageHeroImage" src={image} alt="" fill priority sizes="100vw" />
    <div className="pageHeroContent" data-load>
      {beforeContent}
      {portrait ? <div className="pageHeroIdentity">
        <div className="pageHeroPortrait"><Image src={portrait} alt="" fill priority sizes="(max-width: 600px) 72px, 104px" /></div>
        <div><p className="eyebrow gold">{eyebrow || "DS DANCE RESEARCH LAB"}</p><h1>{title}</h1></div>
      </div> : <><p className="eyebrow gold">{eyebrow || "DS DANCE RESEARCH LAB"}</p><h1>{title}</h1></>}
      {body && <p>{body}</p>}<span className="pageHeroRule" />
    </div>
    <p className="pageHeroMarker" aria-hidden="true">Movement · Research · Practice</p>
  </section>;
}
