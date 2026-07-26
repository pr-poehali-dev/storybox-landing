import Icon from "@/components/ui/icon";

const VIDEO_INTERVIEW_IMG = "https://cdn.poehali.dev/projects/93b2577c-d64f-4b54-a5df-edacb89bda77/files/c3a805d5-7ef1-4e03-8d92-558e4041e368.jpg";

const INTERVIEW_STEPS = [
  {
    icon: "Video",
    title: "Видеосъёмка беседы",
    desc: "Профессиональная команда снимает живую беседу с вашим героем на камеру — в студии или у него дома.",
  },
  {
    icon: "MessageCircle",
    title: "Сценарий вопросов",
    desc: "Психолог заранее готовит вопросы, которые помогают раскрыть характер, взгляды и главные истории жизни.",
  },
  {
    icon: "Clapperboard",
    title: "Запись в студии или дома",
    desc: "Снимаем видео-подкаст в нашей студии или приезжаем с оборудованием к вам домой — как будет удобнее герою.",
  },
  {
    icon: "ShieldCheck",
    title: "Конфиденциальность",
    desc: "Команда подписывает соглашение о неразглашении, а материалы хранятся в защищённых хранилищах.",
  },
];

const VIDEO_INTERVIEW_URL = "https://mystorybox.ru";

export default function InterviewProcessSection() {
  return (
    <section className="py-10 md:py-16">
      {/* Mobile */}
      <div className="md:hidden">
        <div className="w-full overflow-hidden" style={{ maxHeight: "80vw" }}>
          <img
            src={VIDEO_INTERVIEW_IMG}
            alt="Видеоинтервью с историей жизни"
            className="w-full object-cover object-center"
            style={{ display: "block", maxHeight: "80vw" }}
          />
        </div>
        <div className="px-4 pt-7">
          <h2 className="text-[24px] font-bold text-black mb-3 leading-tight">
            Видеоинтервью с историей вашей жизни
          </h2>
          <p className="text-[15px] text-[#444] leading-relaxed mb-6">
            Помимо книги воспоминаний мы записываем видео-подкаст — живую беседу с вашим близким человеком, которую можно пересматривать всей семьёй.
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

          <a href={VIDEO_INTERVIEW_URL} target="_blank" rel="noopener noreferrer" className="btn-cta w-full text-center block">
            Смотреть видеоинтервью
          </a>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-2 max-w-7xl mx-auto px-4 md:px-6 gap-10 items-center">
        <div>
          <h2 className="text-[36px] font-bold text-black mb-4 leading-tight">
            Видеоинтервью с историей вашей жизни
          </h2>
          <p className="text-[17px] text-[#444] leading-relaxed mb-9 max-w-lg">
            Помимо книги воспоминаний мы записываем видео-подкаст — живую беседу с вашим близким человеком, которую можно пересматривать всей семьёй.
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

          <a href={VIDEO_INTERVIEW_URL} target="_blank" rel="noopener noreferrer" className="btn-cta inline-block">
            Смотреть видеоинтервью
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl" style={{ maxHeight: 600 }}>
          <img
            src={VIDEO_INTERVIEW_IMG}
            alt="Видеоинтервью с историей жизни"
            className="w-full h-full object-cover object-center"
            style={{ display: "block" }}
          />
        </div>
      </div>
    </section>
  );
}