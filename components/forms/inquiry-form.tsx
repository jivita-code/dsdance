"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { FormEvent, useRef, useState } from "react";

export function InquiryForm({ type }: { type: "CONTACT" | "JOIN_US" }) {
  const isJoin = type === "JOIN_US";
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const submissionId = useRef<string | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "loading") return;
    const formElement = event.currentTarget;
    setState("loading");
    setError("");
    const form = new FormData(formElement);
    submissionId.current ??= crypto.randomUUID();

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type, name: form.get("name"), email: form.get("email"), areaOfInterest: form.get("areaOfInterest") || undefined, message: form.get("message"), website: form.get("website"), submissionId: submissionId.current }),
      });
      const result = await response.json().catch(() => ({ message: "Please try again." }));
      if (response.status !== 201) throw new Error(result.message || "Please try again.");
      setState("success");
      formElement.reset();
    } catch (reason: unknown) {
      setState("error");
      setError(reason instanceof Error ? reason.message : "Please try again.");
    }
  };

  if (state === "success") return <div className="formSuccess" role="status"><h3>Thank you.</h3><p>Your message has been received.</p></div>;

  return <form className="inquiryForm" data-reveal="text" onSubmit={submit}>
    <label>Name<input name="name" required maxLength={160} /></label>
    <label>Email<input name="email" type="email" required maxLength={254} /></label>
    {isJoin && <label>Area of interest<select name="areaOfInterest" required><option value="">--- Select Choice ---</option><option>Associate Artist</option><option>Residency Programs</option><option>Workshops &amp; Training</option><option>Research Collaborator</option><option>Community Engagement</option><option>Volunteer/Supporter</option><option>International Exchange</option><option>Other (please specify)</option></select></label>}
    <label>{isJoin ? "Comment or Message" : "Message"}<textarea name="message" required rows={6} maxLength={10000} /></label>
    <input className="trap" name="website" tabIndex={-1} autoComplete="off" />
    <button className="goldButton" disabled={state === "loading"} aria-busy={state === "loading"}>{state === "loading" ? <><LoaderCircle className="spin" size={16} /> Sending</> : <>{isJoin ? "Submit" : "Send message"} <ArrowRight size={16} /></>}</button>
    {state === "error" && <p className="formError" role="alert">{error}</p>}
  </form>;
}
