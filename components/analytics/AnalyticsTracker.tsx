"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track, type AnalyticsEventType } from "@/lib/analytics-client";

function deriveEvent(pathname: string): { type: AnalyticsEventType; entityId?: string } {
  const bookMatch = pathname.match(/^\/publications\/books\/([^/]+)$/);
  if (bookMatch) return { type: "book_view", entityId: bookMatch[1] };

  const articleMatch = pathname.match(/^\/news\/([^/]+)$/);
  if (articleMatch) return { type: "article_view", entityId: articleMatch[1] };

  const serviceMatch = pathname.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) return { type: "service_view", entityId: serviceMatch[1] };

  return { type: "page_view" };
}

export function AnalyticsTracker() {
  const pathname = usePathname();

  // Pageview (+ derived funnel event) per navigation.
  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    const { type, entityId } = deriveEvent(pathname);
    track(type, { path: pathname, entityId });
  }, [pathname]);

  // One document-level listener catches every WhatsApp CTA click.
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.(
        'a[href*="wa.me"], a[href*="api.whatsapp.com"]'
      );
      if (anchor) {
        track("whatsapp_click", { path: window.location.pathname });
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
