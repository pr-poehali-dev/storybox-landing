import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const VK_COUNTER_ID = "3803745";

declare global {
  interface Window {
    _tmr?: Array<Record<string, unknown>>;
  }
}

export default function VkAdsTracker() {
  const location = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    const tmr = window._tmr || (window._tmr = []);
    tmr.push({
      id: VK_COUNTER_ID,
      type: "pageView",
      start: new Date().getTime(),
      url: window.location.href,
    });
  }, [location.pathname, location.search]);

  return null;
}
