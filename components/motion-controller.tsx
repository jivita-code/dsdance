"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const REVEAL_SELECTOR = "[data-reveal]";

export function MotionController() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      root.classList.remove("motion-enabled");
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    elements.forEach((element) => {
      // Content already passed by a restored scroll position should never be hidden.
      if (element.getBoundingClientRect().bottom <= 0) {
        element.classList.add("is-visible");
      }
    });

    root.classList.add("motion-enabled");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => {
      if (!element.classList.contains("is-visible")) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  useLayoutEffect(() => () => document.documentElement.classList.remove("motion-enabled"), []);

  return null;
}
