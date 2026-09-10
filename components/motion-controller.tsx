"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal]";

export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      root.classList.remove("motion-enabled");
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          entry.target.classList.remove("is-pending");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    const register = (element: HTMLElement) => {
      if (element.classList.contains("is-visible")) return;
      const bounds = element.getBoundingClientRect();
      // A restored scroll position, or an element already above the viewport,
      // must never be hidden awaiting an intersection event. The currently
      // visible part of a newly navigated page is also made visible straight
      // away; only below-the-fold content waits for its reveal.
      if (bounds.bottom <= 0 || (bounds.top < window.innerHeight * .92 && bounds.bottom > 0)) {
        element.classList.add("is-visible");
        return;
      }
      element.classList.add("is-pending");
      observer.observe(element);
    };

    const registerTree = (node: ParentNode) => {
      if (node instanceof HTMLElement && node.matches(REVEAL_SELECTOR)) register(node);
      node.querySelectorAll?.<HTMLElement>(REVEAL_SELECTOR).forEach(register);
    };

    // Enable the CSS only after the first page's reveal targets are registered.
    // A MutationObserver then registers targets streamed in during client-side
    // route transitions, preventing new pages from remaining transparent.
    registerTree(document);
    root.classList.add("motion-enabled");
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement || node instanceof DocumentFragment) registerTree(node);
      }));
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
      root.classList.remove("motion-enabled");
    };
  }, []);

  return null;
}
