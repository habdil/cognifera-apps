import { getSql } from "@/lib/neon";

export const runtime = "nodejs";

const VALID_EVENT_TYPES = new Set([
  "page_view",
  "book_view",
  "article_view",
  "service_view",
  "contact_submit",
  "whatsapp_click",
]);

const BOT_UA_REGEX =
  /bot|crawler|spider|slurp|headless|lighthouse|prerender|facebookexternalhit|preview|scrape|curl|wget|python-requests/i;

function clip(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  // Always answer 204 quickly — analytics must never surface errors to visitors.
  try {
    const userAgent = request.headers.get("user-agent") ?? "";
    if (!userAgent || BOT_UA_REGEX.test(userAgent)) {
      return new Response(null, { status: 204 });
    }

    const body = await request.json();

    const deviceId = clip(body?.deviceId, 64);
    const sessionId = clip(body?.sessionId, 64);
    const eventType = clip(body?.eventType, 32);
    const path = clip(body?.path, 512);

    if (!deviceId || !sessionId || !path) {
      return new Response(null, { status: 204 });
    }
    if (!eventType || !VALID_EVENT_TYPES.has(eventType)) {
      return new Response(null, { status: 204 });
    }
    if (
      path.startsWith("/admin") ||
      path.startsWith("/api") ||
      path.startsWith("/_next")
    ) {
      return new Response(null, { status: 204 });
    }

    const sql = getSql();
    await sql`
      INSERT INTO analytics_events (
        device_id, session_id, event_type, path, entity_id,
        referrer, utm_source, utm_medium, utm_campaign, user_agent
      ) VALUES (
        ${deviceId}, ${sessionId}, ${eventType}, ${path}, ${clip(body?.entityId, 256)},
        ${clip(body?.referrer, 512)}, ${clip(body?.utmSource, 128)},
        ${clip(body?.utmMedium, 128)}, ${clip(body?.utmCampaign, 128)},
        ${userAgent.slice(0, 512)}
      );
    `;
  } catch (error) {
    console.error("Analytics track failed:", error);
  }

  return new Response(null, { status: 204 });
}
