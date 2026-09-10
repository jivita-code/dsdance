"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Media } from "@/types/content";

export function Gallery({ title, media }: { title: string; media: Media[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (active === null) return;
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowLeft") setActive((active - 1 + media.length) % media.length);
      if (event.key === "ArrowRight") setActive((active + 1) % media.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, media.length]);

  if (!media.length) return null;
  const shown = active === null ? null : media[active];

  return <>
    <div className="galleryGrid">{media.map((item, index) => <button className="galleryTile" data-reveal="card" data-reveal-delay={String(index % 4)} key={`${item.url}-${index}`} onClick={() => setActive(index)}><img src={item.url} alt={`${title} — image ${index + 1}`} loading="lazy" /><span>View image</span></button>)}</div>
    {shown && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${title} image viewer`}><button className="lightboxClose" aria-label="Close gallery" onClick={() => setActive(null)}><X /></button><button aria-label="Previous image" onClick={() => setActive((active! - 1 + media.length) % media.length)}><ChevronLeft /></button><figure><img src={shown.url} alt={`${title} — enlarged image ${(active || 0) + 1}`} /><figcaption>{String((active || 0) + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")}</figcaption></figure><button aria-label="Next image" onClick={() => setActive((active! + 1) % media.length)}><ChevronRight /></button></div>}
  </>;
}
