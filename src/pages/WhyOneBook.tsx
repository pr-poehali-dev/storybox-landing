import { useState, useCallback, useEffect, useRef } from "react";

const AUTOPLAY_DELAY = 4000;

const ITEMS = [
  {
    id: "text",
    tab: "Текст",
    icon: "📖",
    title: "Текст помнит факты",
    body: "То, что прозвучало в интервью, перепроверено, дополнено архивами и оформлено как литературная хроника. Через 40 лет ваш правнук откроет книгу и узнает, кем был его прапрадед.",
    contrastTitle: "Обычно",
    contrast: "Дневники и записки теряются, не дочитываются и остаются в единственном экземпляре.",
  },
  {
    id: "qr",
    tab: "Голос",
    icon: "🎙️",
    title: "QR-код помнит голос",
    body: "Сканируешь телефоном — слышишь, как она смеялась, какими словами говорила, как меняла интонацию, рассказывая про мужа. Этого не сохранит никакой текст.",
    contrastTitle: "Обычно",
    contrast: "Видео на телефоне теряются при смене устройства. Диктофонные записи не переслушивают.",
  },
  {
    id: "photos",
    tab: "Фото",
    icon: "🖼️",
    title: "Фотоархив помнит лица",
    body: "До 600 страниц семейных снимков, отсканированных и оформленных. Не «коробка с фотографиями», а альбом, в котором каждое лицо подписано.",
    contrastTitle: "Обычно",
    contrast: "Фотографии складывают в коробку «потом разберём» — и не разбирают никогда.",
  },
  {
    id: "archive",
    tab: "Архив",
    icon: "🔍",
    title: "Архивная работа помнит то, чего не помните вы",
    body: "Команда находит в открытых архивах данные о тех, кого уже не спросишь — место гибели прадеда в 1942-м, награды, обстоятельства.",
    contrastTitle: "Обычно",
    contrast: "Старые письма пылятся на даче. Имена родственников забываются уже в следующем поколении.",
  },
];

interface Props {
  openPopup: (tariff?: string) => void;
}

export default function WhyOneBook({ openPopup }: Props) {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  const switchTo = useCallback((idx: number) => {
    setActive(idx);
    setAnimKey((k) => k + 1);
    setProgress(0);
  }, []);

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(0);

    const TICK = 50;
    progressRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setProgress((p) => Math.min(p + (TICK / AUTOPLAY_DELAY) * 100, 100));
      }
    }, TICK);

    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setActive((prev) => (prev + 1) % ITEMS.length);
        setAnimKey((k) => k + 1);
        setProgress(0);
      }
    }, AUTOPLAY_DELAY);
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [startAutoplay]);

  const handleManualSwitch = useCallback((idx: number) => {
    switchTo(idx);
    startAutoplay();
  }, [switchTo, startAutoplay]);

  const handleMouseEnter = () => { pausedRef.current = true; };
  const handleMouseLeave = () => { pausedRef.current = false; };

  const item = ITEMS[active];

  return (
    <div
      className="mb-12 rounded-2xl border border-[#E8EEF3] overflow-hidden bg-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Заголовок ── */}
      <div className="px-8 md:px-12 pt-10 pb-8 border-b border-[#E8EEF3]" style={{ background: "#F7FAFD" }}>
        <p className="text-[12px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#00A4E3" }}>
          Почему одной книги достаточно
        </p>
        <div className="grid md:grid-cols-[1fr_1fr] gap-6 items-start">
          <h3 className="text-[26px] md:text-[30px] font-bold text-black leading-tight">
            StoryBox-книга закрывает проблему сохранения памяти семьи{" "}
            <span style={{ color: "#AABBC8" }}>одной книгой.</span>
          </h3>
          <p className="text-[16px] font-semibold leading-snug self-end" style={{ color: "#00A4E3" }}>
            Семья обычно пытается четырьмя разными способами — ни один не доводит до конца.
          </p>
        </div>
      </div>

      {/* ── Слайдер-навигация ── */}
      <div className="px-8 md:px-12 pt-6 pb-4 border-b border-[#E8EEF3]">
        <div className="flex gap-2 md:gap-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {ITEMS.map((it, idx) => (
            <button
              key={it.id}
              onClick={() => handleManualSwitch(idx)}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-200"
              style={
                active === idx
                  ? { background: "#00A4E3", color: "#fff", boxShadow: "0 3px 12px rgba(0,164,227,0.28)" }
                  : { background: "#F0F4F8", color: "#6B7A8D" }
              }
            >
              <span className="text-[15px]">{it.icon}</span>
              {it.tab}
            </button>
          ))}
        </div>

        {/* Прогресс-полоски: у активной заполняется по времени */}
        <div className="flex gap-1.5 mt-4">
          {ITEMS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleManualSwitch(idx)}
              className="h-[3px] rounded-full overflow-hidden flex-1 relative"
              style={{ background: "#E0EAF2" }}
            >
              {active === idx ? (
                <span
                  className="absolute left-0 top-0 h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "#00A4E3",
                    transition: "width 0.05s linear",
                  }}
                />
              ) : (
                <span
                  className="absolute left-0 top-0 h-full w-full rounded-full"
                  style={{ background: idx < active ? "#00A4E3" : "#E0EAF2" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Контент ── */}
      <div
        key={animKey}
        className="animate-slide-content grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E8EEF3]"
      >
        <div className="px-8 md:px-10 py-8">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold mb-5"
            style={{ background: "#E8F6FD", color: "#00A4E3" }}
          >
            ✓ Книга StoryBox
          </div>
          <h4 className="text-[19px] font-bold text-black mb-3 leading-snug">{item.title}</h4>
          <p className="text-[15px] text-[#333] leading-relaxed">{item.body}</p>
        </div>

        <div className="px-8 md:px-10 py-8" style={{ background: "#F7FAFD" }}>
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold mb-5"
            style={{ background: "#EAEAEA", color: "#999" }}
          >
            ✕ Обычно
          </div>
          <p className="text-[15px] leading-relaxed" style={{ color: "#7A7A7A" }}>{item.contrast}</p>
        </div>
      </div>

      {/* ── Финал + CTA ── */}
      <div className="px-8 md:px-12 py-7 border-t border-[#E8EEF3] flex flex-col md:flex-row md:items-center gap-6">
        <p className="text-[15px] leading-relaxed flex-1" style={{ color: "#7A7A7A" }}>
          Книга в твёрдом переплёте переживёт жёсткие диски, облачные сервисы и переезды. Её не нужно «найти пароль» или «открыть на старом телефоне».{" "}
          <span className="font-semibold text-black">Достаточно снять с полки.</span>
        </p>
        <div className="flex-shrink-0 flex flex-col items-start md:items-end gap-1.5">
          <button onClick={() => openPopup()} className="btn-cta-meeting">
            Записать установочную встречу
            <span className="arrow">→</span>
          </button>
          <p className="text-[12px]" style={{ color: "#AAAAAA" }}>
            30 минут · Online · Бесплатно
          </p>
        </div>
      </div>
    </div>
  );
}