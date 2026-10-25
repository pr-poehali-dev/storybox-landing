import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { reachGoal } from "@/utils/metrika";

interface Props {
  to: string;
  img: string;
  eyebrow: string;
  title: string;
  text: string;
  button: string;
  goal: string;
}

export default function CrossPageBanner({ to, img, eyebrow, title, text, button, goal }: Props) {
  return (
    <section className="py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div
          className="grid md:grid-cols-[1fr_1.1fr] rounded-[32px] overflow-hidden bg-white border border-[#F0F0F0]"
          style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.07)" }}
        >
          <div className="relative min-h-[220px] md:min-h-[360px]">
            <img src={img} alt={title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="p-6 md:p-10 lg:p-14 flex flex-col justify-center">
            <p className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: "#ED4463" }}>
              <Icon name="Sparkles" size={14} />
              {eyebrow}
            </p>
            <h2 className="text-[26px] md:text-[34px] font-bold text-black leading-[1.15] tracking-tight mb-4">{title}</h2>
            <p className="text-[15px] md:text-[17px] text-[#666] leading-relaxed mb-7">{text}</p>
            <Link
              to={to}
              onClick={() => {
                reachGoal(goal);
                window.scrollTo(0, 0);
              }}
              className="self-start inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: "#00A4E3", boxShadow: "0 8px 24px rgba(0,164,227,0.35)" }}
            >
              {button}
              <Icon name="ArrowRight" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
