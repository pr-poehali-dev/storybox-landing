import { useEffect, useRef, useState } from "react";
import { TARIFFS } from "./data";

interface TariffsSectionProps {
  activeTariff: number;
  setActiveTariff: (idx: number) => void;
  openPopup: (tariff?: string) => void;
  openGiftPopup: (tariff?: string) => void;
  openConsult: () => void;
}

const TARIFF_CTA_SELF = [
  "Заказать электронную книгу",
  "Заказать книгу Light",
  "Заказать книгу Standard",
  "Заказать книгу Premium",
];

const TARIFF_CTA_GIFT = [
  "Подарить электронную книгу",
  "Подарить книгу Light",
  "Подарить книгу Standard",
  "Подарить книгу Premium",
];

const COMPARISON_ROWS = [
  { label: "Часы интервью",       vals: ["3", "3", "5", "8"] },
  { label: "Страниц",             vals: ["~90", "~90", "~150", "~240"] },
  { label: "Генеалогическое древо", vals: ["да", "да", "да", "да"] },
  { label: "Число фото",          vals: ["40", "40", "60", "100"] },
  { label: "Реставрация фото",    vals: ["—", "—", "да", "да"] },
  { label: "Аудио-архив",         vals: ["—", "—", "да", "да"] },
  { label: "Электронная книга",   vals: ["да", "—", "да", "да"] },
];

export default function TariffsSection({ activeTariff, setActiveTariff, openPopup, openGiftPopup, openConsult }: TariffsSectionProps) {
  const t = TARIFFS[activeTariff];
  const [isGift, setIsGift] = useState(false);

  const handleOrder = (tariffName: string) => {
    if (isGift) openGiftPopup(tariffName);
    else openPopup(tariffName);
  };

  // На мобайле скроллим к карточке «5 часов» (idx=2) при первом рендере
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[3] as HTMLElement;
    if (card) {
      el.scrollLeft = card.offsetLeft - 16;
    }
  }, []);

  const TARIFF_CTA = isGift ? TARIFF_CTA_GIFT : TARIFF_CTA_SELF;

  return (
    <section id="tariffs" className="py-12 md:py-20" style={{ background: "#fff" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-6 md:mb-8 text-center">
          <h2 className="text-[24px] md:text-[40px] font-bold text-black mb-5">Выберите тариф</h2>
          {/* Переключатель */}
          <div className="inline-flex rounded-2xl p-1.5 gap-1.5" style={{ background: "#F0F0F0" }}>
            <button
              onClick={() => setIsGift(false)}
              className="px-6 py-3 rounded-xl text-[15px] font-bold transition-all duration-200"
              style={!isGift
                ? { background: "#00A4E3", color: "#fff", boxShadow: "0 4px 14px rgba(0,164,227,0.35)" }
                : { background: "transparent", color: "#7A7A7A" }}
            >
              Для себя
            </button>
            <button
              onClick={() => setIsGift(true)}
              className="px-6 py-3 rounded-xl text-[15px] font-bold transition-all duration-200"
              style={isGift
                ? { background: "#ED4463", color: "#fff", boxShadow: "0 4px 14px rgba(237,68,99,0.35)" }
                : { background: "transparent", color: "#7A7A7A" }}
            >
              Подарок близкому
            </button>
          </div>
          {isGift && (
            <p className="mt-3 text-[14px]" style={{ color: "#7A7A7A" }}>
              Вы получите подарочный сертификат — красиво оформленный и готовый к вручению
            </p>
          )}
        </div>
      </div>

      {/* MOBILE: горизонтальный скролл карточек */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          className="flex gap-4 px-4 pb-4"
          style={{ overflowX: "auto", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {TARIFFS.map((tariff, idx) => (
            <div
              key={tariff.name}
              className="flex-shrink-0 rounded-2xl border-2 p-5 flex flex-col"
              style={{
                width: "82vw",
                maxWidth: 320,
                borderColor: idx === 3 ? "#ED4463" : "#E5E5E5",
                background: idx === 3 ? "#FFF5F7" : "#fff",
              }}
            >
              {/* Бейдж */}
              {tariff.tag && (
                <div className="mb-3">
                  <span className="inline-block text-[11px] font-bold text-white px-2.5 py-1 rounded-full whitespace-nowrap" style={{ background: "#ED4463" }}>
                    🔥 {tariff.tag} −{tariff.discount}%
                  </span>
                </div>
              )}

              <p className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: tariff.color }}>
                {tariff.duration}
              </p>
              <h3 className="text-[18px] font-bold text-black mb-1">{tariff.fullName}</h3>
              <p className="text-[13px] text-[#7A7A7A] mb-4 leading-snug">{tariff.hook}</p>

              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-[28px] font-extrabold text-black" style={{ lineHeight: 1 }}>{tariff.price}</span>
                {tariff.priceOld && (
                  <span className="text-[13px] text-[#AAAAAA] line-through">{tariff.priceOld}</span>
                )}
                {tariff.discount > 0 && (
                  <span className="text-[11px] font-bold text-white px-1.5 py-0.5 rounded-full" style={{ background: "#ED4463" }}>
                    −{tariff.discount}%
                  </span>
                )}
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                {tariff.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-2">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold mt-0.5"
                      style={{ background: f.included ? `${tariff.color}18` : "#F5F5F5", color: f.included ? tariff.color : "#CCC" }}
                    >
                      {f.included ? "✓" : "×"}
                    </span>
                    <span className={`text-[13px] leading-snug ${f.included ? "text-[#222]" : "line-through opacity-35"}`}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleOrder(tariff.fullName)}
                className="w-full rounded-xl py-3.5 text-[14px] font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: idx === 3 ? "#ED4463" : tariff.color }}
              >
                {TARIFF_CTA[idx]}
              </button>
            </div>
          ))}
        </div>
        <p className="px-4 mt-2 text-[12px] text-[#AAAAAA]">Доп. экземпляр — 7 900 ₽ · Доп. час интервью — 9 950 ₽ · Широкоформатное семейное древо — 1 000 ₽</p>
      </div>

      {/* DESKTOP: таблица + детальная карточка */}
      <div className="hidden md:block max-w-7xl mx-auto px-6">
        {/* Табы */}
        <div className="flex gap-3 mb-8">
          {TARIFFS.map((tariff, idx) => (
            <button
              key={tariff.name}
              onClick={() => setActiveTariff(idx)}
              className="relative px-5 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-200"
              style={
                activeTariff === idx
                  ? { background: tariff.color, color: "#fff", boxShadow: `0 4px 16px ${tariff.color}44` }
                  : { background: "#F2F2F2", color: "#444" }
              }
            >
              {tariff.name}
              {tariff.tag && (
                <span className="absolute -top-2 -right-3 text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full whitespace-nowrap" style={{ background: "#ED4463" }}>
                  ★ хит
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Таблица сравнения */}
        <div className="rounded-2xl border border-[#E5E5E5] overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="border-collapse" style={{ minWidth: 560, width: "100%" }}>
              <thead>
                <tr>
                  <th
                    className="text-left px-5 py-4 text-[13px] font-semibold text-[#999] border-b border-[#F0F0F0]"
                    style={{ background: "#FAFAFA", width: 130 }}
                  >
                    Параметр
                  </th>
                  {TARIFFS.map((tariff, vi) => (
                    <th
                      key={vi}
                      onClick={() => setActiveTariff(vi)}
                      className="px-4 py-4 text-center cursor-pointer border-b transition-all"
                      style={{
                        borderBottomWidth: 3,
                        borderBottomColor: activeTariff === vi ? tariff.color : "#F0F0F0",
                        background: activeTariff === vi ? `${tariff.color}08` : "#FAFAFA",
                        minWidth: 120,
                      }}
                    >
                      <div className="text-[13px] font-bold mb-0.5 leading-tight" style={{ color: activeTariff === vi ? tariff.color : "#555" }}>
                        {tariff.fullName}
                      </div>
                      {tariff.priceOld && (
                        <div className="text-[11px] text-[#AAAAAA] line-through leading-none">{tariff.priceOld}</div>
                      )}
                      <div className="text-[15px] font-extrabold leading-tight" style={{ color: activeTariff === vi ? tariff.color : "#222" }}>
                        {tariff.price}
                      </div>
                      {tariff.discount > 0 && (
                        <div className="mt-1">
                          <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full" style={{ background: "#ED4463" }}>
                            −{tariff.discount}%
                          </span>
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, ri) => (
                  <tr key={row.label} style={{ background: ri % 2 === 0 ? "#fff" : "#FAFAFA" }}>
                    <td className="px-5 py-3 text-[13px] font-semibold text-[#555] border-b border-[#F5F5F5] whitespace-nowrap">
                      {row.label}
                    </td>
                    {row.vals.map((v, vi) => (
                      <td
                        key={vi}
                        onClick={() => setActiveTariff(vi)}
                        className="px-4 py-3 text-center text-[13px] cursor-pointer border-b border-[#F5F5F5] transition-colors"
                        style={{
                          background: activeTariff === vi ? `${TARIFFS[vi].color}06` : "transparent",
                          color: v === "—" ? "#CCC" : activeTariff === vi ? TARIFFS[vi].color : "#333",
                          fontWeight: activeTariff === vi ? 600 : 400,
                        }}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Детальная карточка */}
        <div
          className="rounded-2xl border-2 p-8 transition-all duration-300"
          style={{ borderColor: t.color, background: "#fff" }}
        >
          <div className="flex items-start justify-between gap-4 mb-7">
            <div className="min-w-0">
              {t.tag && (
                <span className="inline-block text-[11px] font-bold text-white px-2.5 py-1 rounded-full mb-2" style={{ background: "#ED4463" }}>
                  🔥 {t.tag} — скидка {t.discount}%
                </span>
              )}
              <p className="text-[11px] font-semibold uppercase tracking-widest mb-1" style={{ color: t.color }}>{t.duration}</p>
              <h3 className="text-[26px] font-bold text-black mb-1 leading-tight">{t.fullName}</h3>
              <p className="text-[15px] text-[#7A7A7A]">{t.hook}</p>
            </div>
            <div className="flex-shrink-0 flex flex-col items-end gap-1">
              {t.priceOld && (
                <span className="text-[13px] text-[#AAAAAA] line-through leading-none">{t.priceOld}</span>
              )}
              <span className="text-[36px] font-extrabold text-black" style={{ lineHeight: 1 }}>{t.price}</span>
              {t.discount > 0 && (
                <span className="text-[12px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: "#ED4463" }}>
                  экономия {t.discount}%
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-x-6 gap-y-2.5 mb-7">
            {t.features.map((f) => (
              <div key={f.text} className="flex items-start gap-2.5">
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold mt-0.5"
                  style={{ background: f.included ? `${t.color}18` : "#F5F5F5", color: f.included ? t.color : "#CCC" }}
                >
                  {f.included ? "✓" : "×"}
                </span>
                <span className={`text-[14px] leading-snug ${f.included ? "text-[#222]" : "line-through opacity-35"}`}>
                  {f.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => handleOrder(t.fullName)}
              className="text-[15px] px-7 py-4 rounded-xl font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: t.color }}
            >
              {TARIFF_CTA[activeTariff]}
            </button>
            <button onClick={openConsult} className="btn-secondary text-[14px] px-6 py-4">
              Бесплатная консультация
            </button>
          </div>
        </div>

        <p className="mt-3 text-[13px] text-[#7A7A7A]">Доп. экземпляр — 7 900 ₽ · Доп. час интервью — 9 950 ₽ · Широкоформатное семейное древо — 1 000 ₽</p>
      </div>
    </section>
  );
}