import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { reachGoal } from "@/utils/metrika";
import { HERO_FACTS, HERO_POSTER, HERO_VIDEO } from "./promoData";

export default function PromoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setShift(Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.9))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      setPlaying(false);
      return;
    }
    v.play().catch(() => setPlaying(false));
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden" style={{ background: "#2A1F17" }}>
      <div
        className="absolute inset-0"
        style={{ transform: `scale(${1 + shift * 0.12}) translateY(${shift * 6}%)`, willChange: "transform" }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: loaded ? 1 : 0.001 }}
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setLoaded(true)}
          aria-label="Семейная книга StoryBox: обложка, переплёт, печать и семья за чтением"
        />
        <img
          src={HERO_POSTER}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: loaded ? 0 : 1 }}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(42,31,23,0.55) 0%, rgba(42,31,23,0.15) 35%, rgba(42,31,23,0.35) 62%, rgba(42,31,23,0.88) 100%)",
        }}
      />

      <div
        className="relative h-full max-w-7xl mx-auto px-5 md:px-10 flex flex-col justify-end pt-24 pb-10 md:pb-14"
        style={{ opacity: 1 - shift * 1.1, transform: `translateY(${-shift * 80}px)` }}
      >
        <p className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: "#F3D9B1" }}>
          Семейная книга воспоминаний
        </p>
        <h1
          className="promo-serif text-white font-semibold leading-[1.05] max-w-4xl mb-5"
          style={{ fontSize: "clamp(36px, min(6.4vw, 9.5svh), 92px)" }}
        >
          Превращаем воспоминания <span className="italic font-medium" style={{ color: "#F3D9B1" }}>в книги</span>
        </h1>
        <p className="text-[16px] md:text-[18px] leading-relaxed max-w-2xl mb-7" style={{ color: "rgba(255,255,255,0.85)" }}>
          Мы бережно интервьюируем ваших близких, помогаем собрать фотографии и создаём красивую книгу, которая сохранит
          семейные истории на годы.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mb-8 md:mb-10">
          <a
            href="#price"
            onClick={() => reachGoal("cta_click", { place: "promo_hero" })}
            className="btn-cta text-center"
            style={{ fontSize: 16, padding: "17px 34px" }}
          >
            Рассчитать стоимость
          </a>
          <a
            href="#quality"
            onClick={() => reachGoal("cta_click", { place: "promo_hero_book" })}
            className="text-center rounded-[10px] font-bold text-white transition-colors hover:bg-white/20"
            style={{ fontSize: 16, padding: "16px 30px", border: "1.5px solid rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(6px)" }}
          >
            Посмотреть книгу
          </a>
        </div>

        <div className="flex items-end justify-between gap-6">
          <div className="grid grid-cols-3 gap-4 md:gap-12 max-w-2xl flex-1 border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
            {HERO_FACTS.map((f) => (
              <div key={f.label}>
                <p className="promo-serif text-white text-[22px] md:text-[34px] font-semibold leading-none mb-1.5">{f.value}</p>
                <p className="text-[11px] md:text-[13px] leading-snug" style={{ color: "rgba(255,255,255,0.65)" }}>{f.label}</p>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={toggle}
            className="hidden md:flex w-12 h-12 rounded-full items-center justify-center text-white transition-colors hover:bg-white/25 flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.35)" }}
            aria-label={playing ? "Остановить видео" : "Включить видео"}
          >
            <Icon name={playing ? "Pause" : "Play"} size={18} />
          </button>
        </div>
      </div>

      <a
        href="#quality"
        className="promo-scroll-hint absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 hidden md:block"
        aria-label="Листать вниз"
        style={{ opacity: 1 - shift * 3 }}
      >
        <Icon name="ChevronDown" size={26} />
      </a>
    </section>
  );
}
