import { TARIFFS } from "./data";

interface TariffsSectionProps {
  activeTariff: number;
  setActiveTariff: (idx: number) => void;
  openPopup: (tariff?: string) => void;
}

const COMPARISON_ROWS = [
  { label: "Длительность",    vals: ["2 сессии Zoom", "3 ч в студии", "5 ч в студии", "8 ч в студии"] },
  { label: "Страниц текста",  vals: ["~50", "~70", "~120", "~200"] },
  { label: "Фотоархив",       vals: ["до 200 стр.", "до 400 стр.", "до 600 стр.", "без лимита"] },
  { label: "Видео",           vals: ["Аудио", "Видео", "Видео + главы", "Видео-серия"] },
  { label: "Архивная работа", vals: ["—", "—", "✓", "Расширенная"] },
  { label: "Экземпляры",      vals: ["1", "1", "2", "3 + USB"] },
  { label: "Хранение видео",  vals: ["5 лет", "10 лет", "10 лет", "Бессрочно"] },
  { label: "Обложка",         vals: ["Стандарт", "Стандарт", "Премиум", "Кожа + тиснение"] },
];

export default function TariffsSection({ activeTariff, setActiveTariff, openPopup }: TariffsSectionProps) {
  const t = TARIFFS[activeTariff];

  return (
    <section id="tariffs" className="max-w-7xl mx-auto px-6 py-20">
      <div className="mb-10">
        <h2 className="text-[40px] font-bold text-black mb-3">Выберите тариф</h2>
        <p className="text-[17px] text-[#7A7A7A]">Запишитесь на бесплатную консультацию — поможем определиться</p>
      </div>

      {/* Табы-кнопки */}
      <div className="flex flex-wrap gap-3 mb-8">
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
              <span className="absolute -top-2 -right-2 text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full" style={{ background: "#ED4463" }}>
                −{tariff.discount}%
              </span>
            )}
            {!tariff.tag && (
              <span className="ml-2 text-[11px] font-bold opacity-60">−{tariff.discount}%</span>
            )}
          </button>
        ))}
      </div>

      {/* Сравнительная таблица — на всю ширину сверху */}
      <div className="rounded-2xl border border-[#E5E5E5] overflow-hidden mb-6">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th
                className="text-left px-5 py-4 text-[13px] font-semibold text-[#999] border-b border-[#F0F0F0] w-[160px] min-w-[130px]"
                style={{ background: "#FAFAFA" }}
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
                  }}
                >
                  <div className="text-[13px] font-bold mb-1" style={{ color: activeTariff === vi ? tariff.color : "#555" }}>
                    {tariff.fullName}
                  </div>
                  <div className="text-[11px] text-[#AAAAAA] line-through leading-none">{tariff.priceOld}</div>
                  <div className="text-[15px] font-extrabold leading-tight" style={{ color: activeTariff === vi ? tariff.color : "#222" }}>
                    {tariff.price}
                  </div>
                  {tariff.tag && (
                    <div className="mt-1">
                      <span className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full" style={{ background: "#ED4463" }}>
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

      {/* Детальная карточка выбранного тарифа */}
      <div
        className="rounded-2xl border-2 p-6 md:p-8 transition-all duration-300"
        style={{ borderColor: t.color, background: "#fff" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-widest mb-1" style={{ color: t.color }}>
              {t.duration}
            </p>
            <h3 className="text-[26px] font-bold text-black mb-1">{t.fullName}</h3>
            <p className="text-[15px] text-[#7A7A7A]">{t.hook}</p>
          </div>
          <div className="flex-shrink-0 flex items-end gap-3">
            <div>
              <span className="text-[13px] text-[#AAAAAA] line-through block text-right">{t.priceOld}</span>
              <span className="text-[36px] font-extrabold text-black" style={{ lineHeight: 1 }}>{t.price}</span>
            </div>
            <span
              className="inline-block px-3 py-1 rounded-full text-white text-[12px] font-bold mb-1 flex-shrink-0"
              style={{ background: t.tag ? "#ED4463" : t.color }}
            >
              −{t.discount}%
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3 mb-7">
          {t.features.map((f) => (
            <div key={f.text} className="flex items-center gap-3">
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold"
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

        <div className="flex flex-wrap gap-3">
          <button onClick={() => openPopup(t.fullName)} className="btn-cta text-[15px] px-7 py-4">
            Оплатить онлайн — {t.price}
          </button>
          <button onClick={() => openPopup()} className="btn-secondary text-[14px] px-6 py-4">
            Бесплатная консультация
          </button>
        </div>
      </div>

      <p className="mt-4 text-[13px] text-[#7A7A7A]">Доп. экземпляр — от 9 500 ₽ · Оплата СБП, МИР · Рассрочка 2–6 мес.</p>
    </section>
  );
}
