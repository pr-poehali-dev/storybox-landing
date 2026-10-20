import { useState } from "react";
import Icon from "@/components/ui/icon";
import { FAQ_ITEMS } from "./forChildrenData";

export default function ChildrenFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-14 md:py-20">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-[28px] md:text-[40px] font-bold text-black leading-[1.15] tracking-tight">Вопросы и ответы</h2>
        </div>

        <div className="space-y-3 md:space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={item.q}
                className="bg-white rounded-2xl border transition-all duration-300"
                style={{
                  borderColor: isOpen ? "rgba(0,164,227,0.4)" : "#F0F0F0",
                  boxShadow: isOpen ? "0 12px 36px rgba(0,164,227,0.10)" : "0 4px 20px rgba(0,0,0,0.04)",
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-7 py-5"
                >
                  <span
                    className="text-[15px] md:text-[17px] font-bold leading-snug transition-colors duration-300"
                    style={{ color: isOpen ? "#00A4E3" : "#1A1A1A" }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isOpen ? "#00A4E3" : "rgba(0,164,227,0.1)",
                      color: isOpen ? "#fff" : "#00A4E3",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    <Icon name="Plus" size={18} />
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 md:px-7 pb-6 -mt-1 pr-16 md:pr-20 text-[14px] md:text-[15px] leading-relaxed text-[#555]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
