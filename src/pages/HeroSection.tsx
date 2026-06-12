import { useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import { reachGoal } from "@/utils/metrika";

const HERO_IMG = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/bucket/f344c56f-9b25-43a5-ab69-a4c8fe51dcd8.jpg";
const BOOK_SPREAD_IMG = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/092dd021-1b7d-4089-94bf-c958bff5c481.jpg";

const GALLERY_ITEMS = [
  { src: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/bucket/3d3c578e-b613-4b76-aeea-48442604659b.png", alt: "Семейная книга воспоминаний StoryBox" },
  { src: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/bucket/b63e69c6-e8e7-4d17-9044-325ba6826e5c.png", alt: "Коллекция семейных книг StoryBox" },
  { src: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/bucket/bcf24bde-7759-46f0-a20c-38899736cb77.png", alt: "Разворот семейной книги StoryBox" },
  { src: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/bucket/41657e1a-ddca-48b3-99b5-d9bb8f7575fc.png", alt: "Премиальные обложки книг StoryBox" },
  { src: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/bucket/55866719-9d93-487c-ba1c-7b022899578d.png", alt: "Семейные мемуары в твёрдой обложке" },
  { src: "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/bucket/bb1e0d48-7ee3-4cd8-af42-c17381b98c4e.png", alt: "Книга воспоминаний StoryBox" },
];

interface HeroSectionProps {
  openConsult: () => void;
}

export default function HeroSection({ openConsult }: HeroSectionProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const scrollGallery = (dir: 1 | -1) => {
    const next = Math.max(0, Math.min(GALLERY_ITEMS.length - 1, galleryIndex + dir));
    setGalleryIndex(next);
    const el = galleryRef.current;
    if (!el) return;
    const card = el.children[next] as HTMLElement;
    if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  return (
    <>
      {/* HERO */}
      <section className="w-full mx-0 my-0 px-0 py-0">
        {/* Mobile layout */}
        <div className="md:hidden">
          <div className="w-full overflow-hidden" style={{ maxHeight: "80vw" }}>
            <img
              src={HERO_IMG}
              alt="Бабушка держит семейную книгу воспоминаний"
              className="w-full object-cover object-center"
              style={{ display: "block", maxHeight: "80vw" }}
            />
          </div>
          <div className="bg-white px-5 pt-7 pb-10">
            <h1 className="leading-tight mb-4 text-[32px] font-bold" style={{ color: "#00a4e3" }}>
              Превращаем воспоминания в книги
            </h1>
            <p className="text-[16px] text-[#444] leading-relaxed mb-6">
              Мы бережно интервьюируем ваших близких, помогаем собрать фотографии и создаём красивую книгу, которая сохранит семейные истории на годы.
            </p>
            <a href="#tariffs" onClick={() => reachGoal("cta_click", { place: "hero_mobile" })} className="btn-cta w-full text-center block" style={{ fontSize: 16, padding: "16px 20px" }}>
              Книга со скидкой 25%
            </a>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-2 max-w-7xl mx-auto px-4 md:px-6" style={{ minHeight: 520 }}>
          <div className="flex flex-col justify-center py-16">
            <h1 className="leading-tight mb-5" style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, color: "#00a4e3" }}>
              Превращаем воспоминания в книги
            </h1>
            <p className="text-[17px] text-[#444] leading-relaxed mb-8 max-w-lg">
              Мы бережно интервьюируем ваших близких, помогаем собрать фотографии и создаём красивую книгу, которая сохранит семейные истории на годы.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-start">
              <a href="#tariffs" onClick={() => reachGoal("cta_click", { place: "hero" })} className="btn-cta" style={{ fontSize: 16, padding: "16px 32px" }}>
                Книга со скидкой 25%
              </a>
              <button onClick={openConsult} className="btn-secondary" style={{ fontSize: 15, padding: "15px 28px" }}>
                Бесплатная консультация
              </button>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl" style={{ maxHeight: 600 }}>
            <img
              src={HERO_IMG}
              alt="Бабушка держит семейную книгу воспоминаний"
              className="w-full h-full object-cover object-center"
              style={{ display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* ГАЛЕРЕЯ КНИГ */}
      <section className="w-full py-6 md:py-10" style={{ background: "#FAFAFA" }}>
        {/* Мобайл: ручной горизонтальный скролл */}
        <div
          className="md:hidden flex gap-3 px-4"
          style={{ overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {GALLERY_ITEMS.map((img, i) => (
            <div key={i} className="flex-shrink-0 rounded-xl overflow-hidden" style={{ width: "72vw", height: "48vw" }}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" style={{ display: "block" }} />
            </div>
          ))}
        </div>

        {/* Десктоп: слайдер с кнопками */}
        <div className="hidden md:block relative px-6">
          <div ref={galleryRef} className="flex gap-4 overflow-x-hidden">
            {GALLERY_ITEMS.map((img, i) => (
              <div key={i} className="flex-shrink-0 rounded-xl overflow-hidden" style={{ width: "clamp(280px, 45vw, 560px)", height: "clamp(180px, 29vw, 360px)" }}>
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" style={{ display: "block" }} />
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollGallery(-1)}
            disabled={galleryIndex === 0}
            className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-opacity"
            style={{ opacity: galleryIndex === 0 ? 0.3 : 1 }}
          >
            <Icon name="ChevronLeft" size={22} />
          </button>
          <button
            onClick={() => scrollGallery(1)}
            disabled={galleryIndex === GALLERY_ITEMS.length - 1}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-opacity"
            style={{ opacity: galleryIndex === GALLERY_ITEMS.length - 1 ? 0.3 : 1 }}
          >
            <Icon name="ChevronRight" size={22} />
          </button>
        </div>
      </section>
    </>
  );
}