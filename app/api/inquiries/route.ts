import { NextResponse } from "next/server";
import { z } from "zod";

const areasOfInterest = [
  "Associate Artist",
  "Residency Programs",
  "Workshops & Training",
  "Research Collaborator",
  "Community Engagement",
  "Volunteer/Supporter",
  "International Exchange",
  "Other (please specify)",
] as const;

const commonFields = {
  name: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(10000),
  website: z.string().max(200).optional().default(""),
  submissionId: z.string().uuid(),
};

const input = z.discriminatedUnion("type", [
  z.object({
    ...commonFields,
    type: z.literal("CONTACT"),
    areaOfInterest: z.string().max(160).optional(),
  }).strict(),
  z.object({
    ...commonFields,
    type: z.literal("JOIN_US"),
    areaOfInterest: z.enum(areasOfInterest),
  }).strict(),
]);

function json(message: string, status: number) {
  return NextResponse.json(
    { message },
    { status, headers: { "cache-control": "no-store" } },
  );
}

export async function POST(request: Request) {
  const parsed = input.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return json("Please complete the required fields correctly.", 400);

  // Give automated submissions the same response as a successful inquiry,
  // without sending them to JPanel or revealing the honeypot behaviour.
  if (parsed.data.website) return json("Inquiry received", 201);

  if (process.env.INQUIRIES_ENABLED !== "true") {
    return json("Form delivery is being configured for this preview.", 503);
  }

  const base = process.env.JPANEL_API_URL?.replace(/\/$/, "");
  const slug = process.env.JPANEL_SITE_SLUG;
  const key = process.env.JPANEL_SITE_API_KEY;
  if (!base || !slug || !key) return json("Form delivery has not been configured yet.", 503);

  const { type, name, email, message, submissionId } = parsed.data;
  const jpanelMessage = type === "JOIN_US"
    ? { areaOfInterest: parsed.data.areaOfInterest, text: message }
    : { text: message };

  try {
    const response = await fetch(`${base}/public/sites/${encodeURIComponent(slug)}/inquiries`, {
      method: "POST",
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
      headers: {
        authorization: `Bearer ${key}`,
        "content-type": "application/json",
        "idempotency-key": submissionId,
      },
      body: JSON.stringify({
        clientName: name,
        email,
        inquiryType: type === "JOIN_US" ? "Join Us" : "Contact",
        message: jpanelMessage,
        website: "",
      }),
    });

    if (response.status === 201) return json("Inquiry received", 201);
    if (response.status === 400) return json("Please check your details and try again.", 400);
    if (response.status === 429) return json("Too many messages were sent. Please wait a minute and try again.", 429);
    return json("Form delivery is temporarily unavailable. Please try again later.", 503);
  } catch {
    return json("Unable to reach the enquiry service. Please try again later.", 503);
  }
}
