import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE_URL, findRouteSeo } from "./routes";

function setMeta(selector: string, attr: string, key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

export default function SeoHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = findRouteSeo(pathname);
    if (!seo) return;
    const url = SITE_URL + (seo.path === "/" ? "/" : seo.path);
    document.title = seo.title;
    setMeta('meta[name="description"]', "name", "description", seo.description);
    setMeta('meta[property="og:title"]', "property", "og:title", seo.title);
    setMeta('meta[property="og:description"]', "property", "og:description", seo.description);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[name="robots"]', "name", "robots", seo.index === false ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1");
    if (seo.image) {
      setMeta('meta[property="og:image"]', "property", "og:image", seo.image);
      setMeta('meta[name="twitter:image"]', "name", "twitter:image", seo.image);
    }
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = url;
  }, [pathname]);

  return null;
}
