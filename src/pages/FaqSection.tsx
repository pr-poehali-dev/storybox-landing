import { useState } from "react";
import { FAQ_ITEMS } from "./data";

interface Props {
  openPopup: (tariff?: string) => void;
}

export default function FaqSection({ openPopup }: Props) {
  const [openSet, setOpenSet] = useState<Set<number>>(
    () => new Set(FAQ_ITEMS.map((_, i) => i))
  );

  const toggle = (idx: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) { next.delete(idx); } else { next.add(idx); }
      return next;
    });
  };

  return (
    <section id="faq" className="py-20" style={{ background: "#F7FAFD" }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Заголовок */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#00A4E3" }}>
              Частые вопросы
            </p>
            <h2 className="text-[40px] font-bold text-black">FAQ</h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1">
            <p className="text-[15px] text-[#7A7A7A]">Остался вопрос?</p>
            <a
              href="https://wa.me/79035069205"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[15px] hover:opacity-80 transition-opacity"
              style={{ color: "#00A4E3" }}
            >
              Написать в WhatsApp → +7 903 506 92 05
            </a>
          </div>
        </div>

        {/* Аккордеон */}
        <div className="grid md:grid-cols-2 gap-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openSet.has(idx);
            return (
              <div
                key={item.q}
                className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{
                  background: isOpen ? "#fff" : "#fff",
                  border: isOpen ? "1.5px solid #00A4E3" : "1.5px solid #E8EEF3",
                  boxShadow: isOpen ? "0 4px 20px rgba(0,164,227,0.10)" : "none",
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left transition-colors"
                  style={{ background: "transparent" }}
                >
                  <span
                    className="text-[15px] font-semibold leading-snug"
                    style={{ color: isOpen ? "#00A4E3" : "#1A1A1A" }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[16px] font-bold transition-all duration-200 mt-0.5"
                    style={{
                      background: isOpen ? "#00A4E3" : "#F0F4F8",
                      color: isOpen ? "#fff" : "#7A7A7A",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>

                <div
                  style={{
                    maxHeight: isOpen ? "400px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                  }}
                >
                  <div className="px-6 pb-6">
                    <div
                      className="h-px mb-4"
                      style={{ background: "#E8F6FD" }}
                    />
                    <p className="text-[15px] leading-relaxed" style={{ color: "#555" }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Нижний CTA */}
        <div className="mt-12 rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center gap-6" style={{ background: "#fff", border: "1.5px solid #E8EEF3" }}>
          <div className="flex-1">
            <p className="text-[18px] font-bold text-black mb-1">Не нашли ответ на свой вопрос?</p>
            <p className="text-[15px] text-[#7A7A7A]">
              На установочной встрече можно спросить всё — это бесплатно и ни к чему не обязывает.
            </p>
          </div>
          <button
            onClick={() => openPopup()}
            className="btn-cta-meeting flex-shrink-0"
          >
            Записать установочную встречу
            <span className="arrow">→</span>
          </button>
        </div>

      </div>
    </section>
  );
}