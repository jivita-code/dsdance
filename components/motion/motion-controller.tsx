"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-reveal]";

export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!("IntersectionObserver" in window)) {
      root.classList.remove("motion-enabled");
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const reveal = (element: Element) => {
      element.classList.add("is-visible");
      element.classList.remove("is-pending");
      observer.unobserve(element);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px -32px 0px" });

    const register = (element: HTMLElement) => {
      if (element.classList.contains("is-visible") || element.classList.contains("is-pending")) return;
      // Next.js streams CMS pages into hidden containers before moving them into
      // the page. A hidden node has no layout yet: do not reveal it prematurely.
      if (element.getClientRects().length === 0) return;
      // Animate a content group once instead of stacking motion on its children.
      if (motionPreference.matches || element.parentElement?.closest(REVEAL_SELECTOR)) {
        reveal(element);
        return;
      }
      const bounds = element.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top < window.innerHeight) {
        reveal(element);
        return;
      }
      element.classList.add("is-pending");
      observer.observe(element);
    };

    const registerTree = (node: ParentNode) => {
      if (node instanceof HTMLElement && node.matches(REVEAL_SELECTOR)) register(node);
      node.querySelectorAll?.<HTMLElement>(REVEAL_SELECTOR).forEach(register);
    };

    registerTree(document);
    root.classList.toggle("motion-enabled", !motionPreference.matches);
    let registrationFrame = 0;
    const scheduleRegistration = () => {
      if (registrationFrame) return;
      registrationFrame = window.requestAnimationFrame(() => {
        registrationFrame = 0;
        registerTree(document);
      });
    };
    const mutations = new MutationObserver((records) => {
      // Batch registration after streaming scripts and React finish placing the
      // content, when its viewport position can be measured correctly.
      scheduleRegistration();
      records.forEach((record) => record.removedNodes.forEach((node) => {
        if (!(node instanceof HTMLElement) || node.isConnected) return;
        observer.unobserve(node);
        node.querySelectorAll(REVEAL_SELECTOR).forEach((element) => observer.unobserve(element));
      }));
    });
    mutations.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden"] });
    window.addEventListener("resize", scheduleRegistration, { passive: true });

    const revealTarget = (target: Element | null) => {
      let pending = target?.closest<HTMLElement>("[data-reveal].is-pending");
      while (pending) {
        // Keyboard focus and anchor navigation should never wait for an animation.
        pending.style.setProperty("--reveal-delay", "0ms");
        pending.style.setProperty("--reveal-duration", "0ms");
        reveal(pending);
        pending = pending.parentElement?.closest<HTMLElement>("[data-reveal].is-pending");
      }
    };
    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof Element) revealTarget(event.target);
    };
    const onHashChange = () => {
      try { revealTarget(document.getElementById(decodeURIComponent(window.location.hash.slice(1)))); } catch { /* Ignore malformed external hashes. */ }
    };
    const onPreferenceChange = () => {
      root.classList.toggle("motion-enabled", !motionPreference.matches);
      if (motionPreference.matches) document.querySelectorAll(REVEAL_SELECTOR).forEach(reveal);
    };
    document.addEventListener("focusin", onFocus);
    window.addEventListener("hashchange", onHashChange);
    motionPreference.addEventListener("change", onPreferenceChange);
    onHashChange();

    return () => {
      mutations.disconnect();
      observer.disconnect();
      window.cancelAnimationFrame(registrationFrame);
      window.removeEventListener("resize", scheduleRegistration);
      document.removeEventListener("focusin", onFocus);
      window.removeEventListener("hashchange", onHashChange);
      motionPreference.removeEventListener("change", onPreferenceChange);
      root.classList.remove("motion-enabled");
      document.querySelectorAll(REVEAL_SELECTOR).forEach((element) => element.classList.remove("is-pending"));
    };
  }, []);

  return null;
}
