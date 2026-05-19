interface Props {
  openConsult: () => void;
}

const ROWS = [
  {
    problem: "Истории уходят вместе с человеком",
    others: "Вспоминают, когда уже поздно",
    storybox: "Видео-интервью фиксирует голос, мимику и рассказы при жизни",
  },
  {
    problem: "Фотографии теряются",
    others: "Коробка «разберём потом» — не разбирают никогда",
    storybox: "До 600 страниц отсканированных и подписанных семейных снимков",
  },
  {
    problem: "Видео никто не пересматривает",
    others: "Теряется при смене телефона или закрытии облака",
    storybox: "QR-код внутри книги — сканируешь и слышишь живой голос в любое время",
  },
  {
    problem: "Архивные данные недоступны",
    others: "Имена родственников забываются уже во втором поколении",
    storybox: "Команда находит данные в открытых архивах: награды, место гибели, документы",
  },
  {
    problem: "Цифровые файлы устаревают",
    others: "Сервисы закрываются, пароли теряются, форматы меняются",
    storybox: "Книга не требует электричества и пароля — её откроют руками через 50 лет",
  },
];

export default function WhyOneBook({ openConsult }: Props) {
  return (
    <div className="mb-12 rounded-2xl border border-[#E8EEF3] overflow-hidden bg-white">

      {/* Заголовок */}
      <div className="px-6 md:px-12 py-8 md:py-10 border-b border-[#E8EEF3]" style={{ background: "#F7FAFD" }}>
        <p className="text-[11px] md:text-[12px] font-semibold uppercase tracking-widest mb-2" style={{ color: "#00A4E3" }}>
          Сравнение
        </p>
        <h3 className="text-[22px] md:text-[30px] font-bold text-black leading-tight max-w-xl">
          Почему обычные способы не работают — и что делает StoryBox
        </h3>
      </div>

      {/* Шапка таблицы */}
      <div
        className="grid grid-cols-[1fr_1fr_1fr] border-b border-[#E8EEF3] px-4 md:px-12 py-3"
        style={{ background: "#F0F4F8" }}
      >
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#AAAAAA]">Проблема</span>
        <span className="text-[11px] font-bold uppercase tracking-widest px-3 md:px-6" style={{ color: "#AAAAAA" }}>
          Обычно
        </span>
        <span
          className="text-[11px] font-bold uppercase tracking-widest px-3 md:px-6 rounded-t-md"
          style={{ color: "#00A4E3" }}
        >
          StoryBox
        </span>
      </div>

      {/* Строки */}
      <div className="divide-y divide-[#F0F4F8]">
        {ROWS.map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-[1fr_1fr_1fr] px-4 md:px-12 py-4 md:py-5 items-start hover:bg-[#FAFCFE] transition-colors"
          >
            {/* Проблема */}
            <p className="text-[13px] md:text-[14px] font-semibold text-[#222] leading-snug pr-3">
              {row.problem}
            </p>

            {/* Обычно */}
            <div className="px-3 md:px-6">
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                  style={{ background: "#FFF0F0", color: "#E05050" }}>✕</span>
                <p className="text-[12px] md:text-[13px] text-[#888] leading-snug">{row.others}</p>
              </div>
            </div>

            {/* StoryBox */}
            <div
              className="px-3 md:px-6 rounded-md py-1"
              style={{ background: "#F0FAFF" }}
            >
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                  style={{ background: "#00A4E3", color: "#fff" }}>✓</span>
                <p className="text-[12px] md:text-[13px] font-medium leading-snug" style={{ color: "#1a6a8a" }}>{row.storybox}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        className="px-6 md:px-12 py-6 md:py-8 border-t border-[#E8EEF3] flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
        style={{ background: "#F7FAFD" }}
      >
        <p className="text-[14px] md:text-[15px] leading-relaxed flex-1 text-[#555]">
          Книга — единственный формат, который не требует пароля, электричества и живёт дольше любого устройства.{" "}
          <span className="font-semibold text-black">Через 50 лет её откроют руками.</span>
        </p>
        <div className="flex-shrink-0 flex flex-col items-start md:items-end gap-1.5">
          <button onClick={openConsult} className="btn-cta-meeting w-full sm:w-auto">
            Бесплатная консультация
            <span className="arrow">→</span>
          </button>
          <p className="text-[12px]" style={{ color: "#AAAAAA" }}>30 минут · Online · Бесплатно</p>
        </div>
      </div>
    </div>
  );
}
