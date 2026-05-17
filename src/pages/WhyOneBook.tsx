import { useState, useCallback } from "react";

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

  const switchTo = useCallback((idx: number) => {
    setActive(idx);
    setAnimKey((k) => k + 1);
  }, []);

  const item = ITEMS[active];

  return (
    <div className="mb-12 rounded-2xl border border-[#E8EEF3] overflow-hidden bg-white">

      {/* ── Заголовок ── */}
      <div className="px-8 md:px-12 pt-10 pb-8 border-b border-[#E8EEF3]" style={{ background: "#F7FAFD" }}>
        <p className="text-[12px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#00A4E3" }}>
          Почему одной книги достаточно
        </p>
        <div className="grid md:grid-cols-[1fr_1fr] gap-6 items-start">
          <h3 className="text-[26px] md:text-[30px] font-bold text-black leading-tight">
            Семья пытается сохранить память четырьмя способами.{" "}
            <span style={{ color: "#AABBC8" }}>Ни один не доводит до конца.</span>
          </h3>
          <p className="text-[16px] font-semibold leading-snug self-end" style={{ color: "#00A4E3" }}>
            StoryBox-книга закрывает все четыре — одним предметом на полке.
          </p>
        </div>
      </div>

      {/* ── Слайдер-навигация ── */}
      <div className="px-8 md:px-12 pt-6 pb-0 border-b border-[#E8EEF3]">
        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-0" style={{ scrollbarWidth: "none" }}>
          {ITEMS.map((it, idx) => (
            <button
              key={it.id}
              onClick={() => switchTo(idx)}
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-200 mb-[-1px] relative"
              style={
                active === idx
                  ? {
                      background: "#00A4E3",
                      color: "#fff",
                      boxShadow: "0 3px 12px rgba(0,164,227,0.28)",
                    }
                  : {
                      background: "#F0F4F8",
                      color: "#6B7A8D",
                    }
              }
            >
              <span className="text-[15px]">{it.icon}</span>
              {it.tab}
            </button>
          ))}
        </div>

        {/* Прогресс-полоска под слайдером */}
        <div className="flex gap-1.5 mt-4 pb-0">
          {ITEMS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => switchTo(idx)}
              className="h-[3px] rounded-full transition-all duration-300 flex-1"
              style={{
                background: active === idx ? "#00A4E3" : "#E0EAF2",
                transform: active === idx ? "scaleY(1.5)" : "scaleY(1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Контент ── */}
      <div
        key={animKey}
        className="animate-slide-content grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E8EEF3]"
      >
        {/* Левая — книга StoryBox */}
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

        {/* Правая — как обычно */}
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
