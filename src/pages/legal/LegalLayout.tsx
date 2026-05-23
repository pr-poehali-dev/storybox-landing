import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface LegalLayoutProps {
  title: string;
  pdfUrl: string;
  children: ReactNode;
}

export default function LegalLayout({ title, pdfUrl, children }: LegalLayoutProps) {
  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh", fontFamily: "'Open Sans', sans-serif" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", borderColor: "#E5E5E5" }}
      >
        <div className="max-w-4xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-[14px] font-semibold transition-colors hover:opacity-80"
              style={{ color: "#00A4E3" }}
            >
              <Icon name="ArrowLeft" size={18} />
              На главную
            </Link>
            <span style={{ color: "#E5E5E5" }}>|</span>
            <span className="text-[14px] font-semibold" style={{ color: "#000" }}>
              <span style={{ fontWeight: 400 }}>Story</span>
              <span style={{ fontWeight: 700 }}>Box</span>
            </span>
          </div>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="flex items-center gap-2 text-[13px] font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
            style={{ background: "#00A4E3", color: "#fff", borderRadius: "10px" }}
          >
            <Icon name="Download" size={15} />
            Скачать PDF
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <h1
          className="mb-2"
          style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 700, color: "#000", lineHeight: 1.2 }}
        >
          {title}
        </h1>
        <div className="mb-8" style={{ width: 80, height: 3, background: "#00A4E3", borderRadius: 2 }} />

        {/* PDF embed — primary view */}
        <div
          className="mb-8 rounded-xl overflow-hidden border"
          style={{ borderColor: "#E5E5E5", height: "75vh", minHeight: 480 }}
        >
          <iframe
            src={pdfUrl + "#toolbar=0&navpanes=0"}
            title={title}
            width="100%"
            height="100%"
            style={{ display: "block", border: "none" }}
          />
        </div>

        {/* Fallback text content */}
        <div
          className="rounded-xl border p-6 md:p-8 prose prose-sm max-w-none"
          style={{ borderColor: "#E5E5E5", color: "#222" }}
        >
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="border-t mt-10 py-6 px-4 text-center text-[13px]"
        style={{ borderColor: "#E5E5E5", color: "#7A7A7A" }}
      >
        © 2024 StoryBox. Все права защищены.{" "}
        <Link to="/" style={{ color: "#00A4E3" }} className="hover:underline">
          Вернуться на сайт
        </Link>
      </footer>
    </div>
  );
}