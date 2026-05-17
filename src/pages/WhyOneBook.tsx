import { useState } from "react";

const ITEMS = [
  {
    id: "text",
    tab: "Текст",
    title: "Текст помнит факты",
    body: "То, что прозвучало в интервью, перепроверено, дополнено архивами и оформлено как литературная хроника. Через 40 лет ваш правнук откроет книгу и узнает, кем был его прапрадед.",
    contrast: "Дневники и записки теряются, не дочитываются и остаются в единственном экземпляре.",
  },
  {
    id: "qr",
    tab: "Голос",
    title: "QR-код помнит голос",
    body: "Сканируешь телефоном — слышишь, как она смеялась, какими словами говорила, как меняла интонацию, рассказывая про мужа. Этого не сохранит никакой текст.",
    contrast: "Видео на телефоне теряются при смене устройства. Диктофонные записи не переслушивают.",
  },
  {
    id: "photos",
    tab: "Фото",
    title: "Фотоархив помнит лица",
    body: "До 600 страниц семейных снимков, отсканированных и оформленных. Не «коробка с фотографиями», а альбом, в котором каждое лицо подписано.",
    contrast: "Фотографии складывают в коробку «потом разберём» — и не разбирают никогда.",
  },
  {
    id: "archive",
    tab: "Архив",
    title: "Архивная работа помнит то, чего не помните вы",
    body: "Команда находит в открытых архивах данные о тех, кого уже не спросишь — место гибели прадеда в 1942-м, награды, обстоятельства. То, что семья ищет десятилетиями, мы находим за неделю.",
    contrast: "Старые письма пылятся на даче. Имена родственников забываются уже в следующем поколении.",
  },
];

interface Props {
  openPopup: (tariff?: string) => void;
}

export default function WhyOneBook({ openPopup }: Props) {
  const [active, setActive] = useState(0);
  const item = ITEMS[active];

  return (
    <div className="mb-12 rounded-2xl border border-[#E8EEF3] overflow-hidden" style={{ background: "#F7FAFD" }}>

      {/* Заголовок */}
      <div className="px-8 md:px-12 pt-10 pb-8 border-b border-[#E8EEF3]">
        <div className="grid md:grid-cols-[1fr_auto] gap-6 items-start">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#00A4E3" }}>
              Почему одной книги достаточно
            </p>
            <h3 className="text-[26px] md:text-[30px] font-bold text-black leading-tight mb-3">
              Семья пытается сохранить память четырьмя способами.{" "}
              <span style={{ color: "#AABBC8" }}>Ни один не доводит до конца.</span>
            </h3>
            <p className="text-[16px] font-semibold" style={{ color: "#00A4E3" }}>
              StoryBox-книга закрывает все четыре — одним предметом на полке.
            </p>
          </div>
        </div>
      </div>

      {/* Навигация-табы */}
      <div className="flex border-b border-[#E8EEF3] overflow-x-auto" style={{ background: "#fff" }}>
        {ITEMS.map((it, idx) => (
          <button
            key={it.id}
            onClick={() => setActive(idx)}
            className="flex-shrink-0 px-6 py-4 text-[14px] font-semibold transition-all relative whitespace-nowrap"
            style={{
              color: active === idx ? "#00A4E3" : "#7A7A7A",
              borderBottom: active === idx ? "2px solid #00A4E3" : "2px solid transparent",
              background: "transparent",
            }}
          >
            {it.tab}
          </button>
        ))}
      </div>

      {/* Контент активного таба */}
      <div className="grid md:grid-cols-2 gap-0">
        {/* Левая — что даёт книга */}
        <div className="px-8 md:px-10 py-8 border-b md:border-b-0 md:border-r border-[#E8EEF3]">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-semibold mb-5"
            style={{ background: "#E8F6FD", color: "#00A4E3" }}
          >
            <span>✓</span> Книга StoryBox
          </div>
          <h4 className="text-[20px] font-bold text-black mb-4 leading-snug">{item.title}</h4>
          <p className="text-[16px] text-[#333] leading-relaxed">{item.body}</p>
        </div>

        {/* Правая — как обычно */}
        <div className="px-8 md:px-10 py-8" style={{ background: "#F0F4F8" }}>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[12px] font-semibold mb-5"
            style={{ background: "#E5E5E5", color: "#888" }}
          >
            <span>✕</span> Обычно
          </div>
          <p className="text-[16px] leading-relaxed" style={{ color: "#7A7A7A" }}>{item.contrast}</p>
        </div>
      </div>

      {/* Финальный аргумент + CTA */}
      <div className="px-8 md:px-12 py-8 border-t border-[#E8EEF3] flex flex-col md:flex-row md:items-center gap-6" style={{ background: "#fff" }}>
        <p className="text-[15px] leading-relaxed flex-1" style={{ color: "#7A7A7A" }}>
          Книга в твёрдом переплёте переживёт жёсткие диски, облачные сервисы и переезды. Её не нужно «найти пароль» или «открыть на старом телефоне».{" "}
          <span className="font-semibold text-black">Достаточно снять с полки.</span>
        </p>
        <div className="flex-shrink-0">
          <button
            onClick={() => openPopup()}
            className="flex items-center gap-2 font-semibold text-[15px] group"
            style={{ color: "#00A4E3" }}
          >
            Записать установочную встречу
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </button>
          <p className="text-[12px] mt-1" style={{ color: "#AAAAAA" }}>
            30 минут · Online · Бесплатно. Расскажем, как это будет — и поможем определиться с форматом.
          </p>
        </div>
      </div>
    </div>
  );
}
