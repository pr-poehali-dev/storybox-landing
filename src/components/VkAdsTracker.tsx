import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const VK_COUNTER_ID = "3803745";
const SCRIPT_ID = "tmr-code";
const SCRIPT_SRC = "https://top-fwz1.mail.ru/js/code.js";

declare global {
  interface Window {
    _tmr?: Array<Record<string, unknown>>;
  }
}

function loadScript() {
  if (document.getElementById(SCRIPT_ID)) return;
  const s = document.createElement("script");
  s.id = SCRIPT_ID;
  s.async = true;
  s.src = SCRIPT_SRC;
  document.head.appendChild(s);
}

export default function VkAdsTracker() {
  const location = useLocation();

  useEffect(() => {
    const tmr = window._tmr || (window._tmr = []);
    tmr.push({
      id: VK_COUNTER_ID,
      type: "pageView",
      start: new Date().getTime(),
      url: window.location.href,
    });
    loadScript();
  }, [location.pathname, location.search]);

  return null;
}
