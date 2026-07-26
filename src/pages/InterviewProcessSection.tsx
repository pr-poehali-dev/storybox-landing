import Icon from "@/components/ui/icon";
import { INTERVIEW_IMG } from "./data";

const INTERVIEW_STEPS = [
  {
    icon: "ClipboardList",
    title: "Сценарий вопросов",
    desc: "Заранее готовим список вопросов и отправляем герою, чтобы он мог спокойно подготовиться и вспомнить важные истории.",
  },
  {
    icon: "MessageCircle",
    title: "Бережная беседа",
    desc: "Психолог задаёт вопросы деликатно, помогает раскрыться и аккуратно обходит темы, которые вспоминать не хочется.",
  },
  {
    icon: "Mic",
    title: "Аудиозапись",
    desc: "Все беседы записываются на аудио, чтобы сохранить не только слова, но и интонации, смех и живой голос человека.",
  },
  {
    icon: "ShieldCheck",
    title: "Конфиденциальность",
    desc: "Интервьюеры подписывают соглашение о неразглашении, а записи хранятся в защищённых хранилищах.",
  },
];

interface InterviewProcessSectionProps {
  openConsult: () => void;
}

export default function InterviewProcessSection({ openConsult }: InterviewProcessSectionProps) {
  return (
    <section className="py-10 md:py-16">
      {/* Mobile */}
      <div className="md:hidden">
        <div className="w-full overflow-hidden" style={{ maxHeight: "80vw" }}>
          <img
            src={INTERVIEW_IMG}
            alt="Интервью с близким человеком для книги воспоминаний"
            className="w-full object-cover object-center"
            style={{ display: "block", maxHeight: "80vw" }}
          />
        </div>
        <div className="px-4 pt-7">
          <h2 className="text-[24px] font-bold text-black mb-3 leading-tight">
            Как проходит интервью
          </h2>
          <p className="text-[15px] text-[#444] leading-relaxed mb-6">
            Мы бережно интервьюируем каждого героя книги, чтобы сохранить его историю, характер и голос.
          </p>

          <div className="grid grid-cols-2 gap-5 mb-7">
            {INTERVIEW_STEPS.map((s) => (
              <div key={s.title}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2" style={{ background: "#F2F9FF" }}>
                  <Icon name={s.icon as Parameters<typeof Icon>[0]["name"]} size={18} style={{ color: "#00A4E3" }} fallback="MessageCircle" />
                </div>
                <h3 className="text-[14px] font-bold text-black mb-1">{s.title}</h3>
                <p className="text-[12px] text-[#7A7A7A] leading-snug">{s.desc}</p>
              </div>
            ))}
          </div>

          <button onClick={openConsult} className="btn-cta w-full text-center">
            Бесплатная консультация
          </button>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-2 max-w-7xl mx-auto px-4 md:px-6 gap-10 items-center">
        <div>
          <h2 className="text-[36px] font-bold text-black mb-4 leading-tight">
            Как проходит интервью
          </h2>
          <p className="text-[17px] text-[#444] leading-relaxed mb-9 max-w-lg">
            Мы бережно интервьюируем каждого героя книги, чтобы сохранить его историю, характер и голос.
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-7 mb-9 max-w-lg">
            {INTERVIEW_STEPS.map((s) => (
              <div key={s.title}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: "#F2F9FF" }}>
                  <Icon name={s.icon as Parameters<typeof Icon>[0]["name"]} size={20} style={{ color: "#00A4E3" }} fallback="MessageCircle" />
                </div>
                <h3 className="text-[16px] font-bold text-black mb-1.5">{s.title}</h3>
                <p className="text-[13px] text-[#7A7A7A] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <button onClick={openConsult} className="btn-cta">
            Бесплатная консультация
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl" style={{ maxHeight: 600 }}>
          <img
            src={INTERVIEW_IMG}
            alt="Интервью с близким человеком для книги воспоминаний"
            className="w-full h-full object-cover object-center"
            style={{ display: "block" }}
          />
        </div>
      </div>
    </section>
  );
}
