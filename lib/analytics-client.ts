/**
 * Client-side event tracking for the self-hosted funnel analytics.
 * Events are fire-and-forget via sendBeacon (fetch keepalive fallback).
 */

import { getDeviceId } from "@/lib/utils/device-id";

const SESSION_ID_KEY = "cognifera_session_id";
const SESSION_META_KEY = "cognifera_session_meta";

export type AnalyticsEventType =
  | "page_view"
  | "book_view"
  | "article_view"
  | "service_view"
  | "contact_submit"
  | "whatsapp_click";

type SessionMeta = {
  referrerSent: boolean;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
};

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `sess_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

function getSessionMeta(): SessionMeta {
  if (typeof window === "undefined") {
    return { referrerSent: true, utmSource: null, utmMedium: null, utmCampaign: null };
  }

  const stored = sessionStorage.getItem(SESSION_META_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as SessionMeta;
    } catch {
      // fall through and rebuild
    }
  }

  // First event of this session: capture UTM params once.
  const params = new URLSearchParams(window.location.search);
  const meta: SessionMeta = {
    referrerSent: false,
    utmSource: params.get("utm_source"),
    utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"),
  };
  sessionStorage.setItem(SESSION_META_KEY, JSON.stringify(meta));
  return meta;
}

export function track(
  eventType: AnalyticsEventType,
  options?: { path?: string; entityId?: string }
): void {
  if (typeof window === "undefined") return;

  const path = options?.path ?? window.location.pathname;
  if (path.startsWith("/admin")) return;

  const meta = getSessionMeta();
  const isFirstEvent = !meta.referrerSent;

  if (isFirstEvent) {
    meta.referrerSent = true;
    sessionStorage.setItem(SESSION_META_KEY, JSON.stringify(meta));
  }

  const payload = JSON.stringify({
    deviceId: getDeviceId(),
    sessionId: getSessionId(),
    eventType,
    path,
    entityId: options?.entityId ?? null,
    referrer: isFirstEvent ? document.referrer || null : null,
    utmSource: meta.utmSource,
    utmMedium: meta.utmMedium,
    utmCampaign: meta.utmCampaign,
  });

  try {
    const blob = new Blob([payload], { type: "application/json" });
    if (!navigator.sendBeacon?.("/api/analytics/track", blob)) {
      throw new Error("beacon rejected");
    }
  } catch {
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {
      // analytics must never break the page
    });
  }
}
