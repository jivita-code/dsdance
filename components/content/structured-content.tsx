import { ExternalLink } from "lucide-react";

export function isSafeExternalUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function LinkedText({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s]+|www\.[^\s]+)/gi);
  return <>{parts.map((part, index) => {
    const href = part.toLowerCase().startsWith("www.") ? `https://${part}` : part;
    return isSafeExternalUrl(href)
      ? <a className="inlineContentLink" href={href} key={index} rel="noreferrer" target="_blank">{part}<ExternalLink aria-hidden="true" size={13} /></a>
      : part;
  })}</>;
}

export function hasContentValue(value: unknown): boolean {
  if (typeof value === "string") return Boolean(value.trim());
  if (typeof value === "number" || typeof value === "boolean") return true;
  if (Array.isArray(value)) return value.some(hasContentValue);
  if (value && typeof value === "object") return Object.values(value as Record<string, unknown>).some(hasContentValue);
  return false;
}

export function StructuredValue({ value }: { value: unknown }) {
  if (typeof value === "string") {
    const text = value.trim();
    if (!text) return null;
    if (isSafeExternalUrl(text)) return <a className="contentExternalLink" href={text} rel="noreferrer" target="_blank">{text} <ExternalLink aria-hidden="true" size={15} /></a>;
    return <>{text.split(/\n\s*\n/).map((paragraph, index) => <p key={index}><LinkedText text={paragraph} /></p>)}</>;
  }

  if (typeof value === "number" || typeof value === "boolean") return <p>{String(value)}</p>;

  if (Array.isArray(value)) {
    const entries = value.filter(hasContentValue);
    if (!entries.length) return null;
    return <ul>{entries.map((entry, index) => <li key={index}><StructuredValue value={entry} /></li>)}</ul>;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).filter(([, entry]) => hasContentValue(entry));
    if (!entries.length) return null;
    return <dl>{entries.map(([label, entry]) => <div key={label}><dt>{label}</dt><dd><StructuredValue value={entry} /></dd></div>)}</dl>;
  }

  return null;
}

export function ContentSections({ entries }: { entries: [string, unknown][] }) {
  return <div className="contentSections">{entries.filter(([, value]) => hasContentValue(value)).map(([label, value], index) => <section data-reveal="text" key={label}><p className="contentSectionIndex">{String(index + 1).padStart(2, "0")}</p><div><h3>{label}</h3><StructuredValue value={value} /></div></section>)}</div>;
}
