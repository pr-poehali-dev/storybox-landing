import fs from "node:fs";
import path from "node:path";

let outDir = "";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function setTag(html, re, tag) {
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `    ${tag}\n</head>`);
}

function buildHead(template, seo, url) {
  let html = template;
  const robots = seo.index === false ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1";
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`);
  html = setTag(html, /<meta name="description"[^>]*\/?>/, `<meta name="description" content="${esc(seo.description)}"/>`);
  html = setTag(html, /<meta name="robots"[^>]*\/?>/, `<meta name="robots" content="${robots}"/>`);
  html = setTag(html, /<link rel="canonical"[^>]*\/?>/, `<link rel="canonical" href="${url}"/>`);
  html = setTag(html, /<meta property="og:url"[^>]*\/?>/, `<meta property="og:url" content="${url}"/>`);
  html = setTag(html, /<meta property="og:title"[^>]*\/?>/, `<meta property="og:title" content="${esc(seo.title)}"/>`);
  html = setTag(html, /<meta property="og:description"[^>]*\/?>/, `<meta property="og:description" content="${esc(seo.description)}"/>`);
  html = setTag(html, /<meta name="twitter:title"[^>]*\/?>/, `<meta name="twitter:title" content="${esc(seo.title)}"/>`);
  html = setTag(html, /<meta name="twitter:description"[^>]*\/?>/, `<meta name="twitter:description" content="${esc(seo.description)}"/>`);
  if (seo.image) {
    html = setTag(html, /<meta property="og:image" [^>]*\/?>/, `<meta property="og:image" content="${seo.image}"/>`);
    html = setTag(html, /<meta name="twitter:image"[^>]*\/?>/, `<meta name="twitter:image" content="${seo.image}"/>`);
  }

  html = html.replace(/<!-- JSON-LD: FAQPage -->\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/, "");
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: seo.title,
      description: seo.description,
      url,
      inLanguage: "ru-RU",
      publisher: { "@type": "Organization", name: "StoryBox", url: "https://mystorybox.ru" },
    },
  ];
  if (seo.faq?.length) {
    ld.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: seo.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }
  const ldTags = ld
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`)
    .join("\n    ");
  return html.replace("</head>", `    ${ldTags}\n</head>`);
}

function writePage(routePath, html) {
  if (routePath === "/") {
    fs.writeFileSync(path.join(outDir, "index.html"), html);
    return;
  }
  const rel = routePath.replace(/^\//, "");
  fs.mkdirSync(path.join(outDir, rel), { recursive: true });
  fs.writeFileSync(path.join(outDir, rel, "index.html"), html);
  fs.mkdirSync(path.dirname(path.join(outDir, `${rel}.html`)), { recursive: true });
  fs.writeFileSync(path.join(outDir, `${rel}.html`), html);
}

function htmlToText(html) {
  return html
    .replace(/<(script|style|svg|button|form)[\s\S]*?<\/\1>/g, " ")
    .replace(/<\/(h1|h2|h3|p|li|div|section|article)>/g, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/[ \t]+/g, " ")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l, i, a) => l !== a[i - 1] && (l.length < 40 || a.indexOf(l) === i))
    .join("\n");
}

export async function prerender(targetDir, mod) {
  outDir = targetDir;
  const { render, ROUTES_SEO, SITE_URL, TARIFFS } = mod;
  const template = fs.readFileSync(path.join(outDir, "index.html"), "utf-8");
  const today = new Date().toISOString().slice(0, 10);
  const pages = [];

  for (const seo of ROUTES_SEO) {
    const url = SITE_URL + (seo.path === "/" ? "/" : seo.path);
    let appHtml = "";
    try {
      appHtml = render(seo.path);
    } catch (e) {
      console.warn(`[prerender] ${seo.path}: ${e.message}`);
    }
    const html = buildHead(template, seo, url).replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
    writePage(seo.path, html);
    pages.push({ seo, url, text: htmlToText(appHtml) });
    console.log(`[prerender] ${seo.path} — ${appHtml.length} байт`);
  }

  const indexed = pages.filter((p) => p.seo.index !== false);

  fs.writeFileSync(
    path.join(outDir, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      indexed
        .map(
          (p) =>
            `  <url>\n    <loc>${p.url}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${p.seo.path === "/" ? "1.0" : "0.8"}</priority>\n  </url>`
        )
        .join("\n") +
      `\n</urlset>\n`
  );

  const tariffs = TARIFFS.map((t) => `- ${t.fullName} — ${t.price}: ${t.features.filter((f) => f.included).map((f) => f.text).join(", ")}`).join("\n");

  const llms =
    `# StoryBox — книги воспоминаний\n\n` +
    `> StoryBox записывает интервью с людьми и их близкими, собирает фотографии и создаёт книги в твёрдом переплёте: о жизни родителей, о дорогом человеке от лица его близких, книги в подарок на праздники. Интервью проходят по видеосвязи, книгу печатаем и доставляем.\n\n` +
    `Основной сайт: https://mystorybox.ru\nКонтакты: WhatsApp https://wa.me/79031932725, Telegram https://t.me/storybox_ru\n\n` +
    `## Тарифы\n\n${tariffs}\n\n` +
    `## Страницы\n\n` +
    indexed.map((p) => `- [${p.seo.title}](${p.url}): ${p.seo.description}`).join("\n") +
    `\n\n## Полный текст\n\n- [Все страницы одним файлом](${SITE_URL}/llms-full.txt)\n`;
  fs.writeFileSync(path.join(outDir, "llms.txt"), llms);

  const full =
    `# StoryBox — полный текст страниц\n\n` +
    indexed
      .map((p) => {
        const faqLeft = (p.seo.faq || []).filter((f) => !p.text.includes(f.a.slice(0, 40)));
        const faq = faqLeft.length ? `\n\n### Вопросы и ответы\n\n${faqLeft.map((f) => `**${f.q}**\n${f.a}`).join("\n\n")}` : "";
        return `## ${p.seo.title}\n\nАдрес: ${p.url}\n\n${p.seo.description}\n\n${p.text}${faq}`;
      })
      .join("\n\n---\n\n") +
    "\n";
  fs.writeFileSync(path.join(outDir, "llms-full.txt"), full);

  console.log(`[prerender] готово: ${pages.length} страниц, sitemap.xml, llms.txt, llms-full.txt`);
}
