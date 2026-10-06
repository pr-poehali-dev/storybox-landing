import { formatRub, hoursLabel } from "./priceCalc";

interface GiftCertificateProps {
  hours: number;
  total: number;
}

const LOGO = "https://static.tildacdn.one/tild3937-3830-4361-a239-323264653433/_2023-11-07_12181908.png";

export default function GiftCertificate({ hours, total }: GiftCertificateProps) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl bg-white border border-[#EEF1F4]"
      style={{ aspectRatio: "1.414 / 1", boxShadow: "0 12px 36px rgba(15,20,25,0.12)", containerType: "inline-size" }}
      aria-label={`Подарочный сертификат на книгу: ${hoursLabel(hours)} интервью`}
    >
      <div
        className="absolute rounded-full"
        style={{ width: "50%", height: "80%", right: "-16%", top: "-40%", background: "#00A4E3", transform: "rotate(-24deg)" }}
      />
      <div
        className="absolute rounded-full mix-blend-multiply"
        style={{ width: "42%", height: "70%", right: "-22%", top: "10%", background: "#ED4463", transform: "rotate(18deg)", opacity: 0.92 }}
      />

      <div className="relative h-full flex flex-col justify-between p-[6%]">
        <img src={LOGO} alt="StoryBox" className="h-[14%] w-auto object-contain self-start" />

        <div className="max-w-[66%]">
          <p className="font-bold text-black leading-tight" style={{ fontSize: "clamp(15px, 4.6cqw, 26px)" }}>
            Подарочный<br className="sm:hidden" /> <span className="font-normal">сертификат</span>
          </p>
          <p className="text-[#7A7A7A] mt-1.5 leading-snug" style={{ fontSize: "clamp(9px, 2.2cqw, 12px)" }}>
            На книгу воспоминаний с интервью, фотографиями и твёрдым переплётом
          </p>
          <div className="flex items-center gap-2 mt-[5%]">
            <span className="w-3 h-3 rounded-full rounded-bl-none flex-shrink-0 rotate-45" style={{ background: "#ED4463" }} />
            <span className="font-bold text-black" style={{ fontSize: "clamp(12px, 3.4cqw, 19px)" }}>
              Имя получателя
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <span
              className="rounded-md px-2.5 py-1 font-bold text-white whitespace-nowrap"
              style={{ background: "#00A4E3", fontSize: "clamp(10px, 2.4cqw, 13px)" }}
            >
              {hoursLabel(hours)} интервью
            </span>
            <span
              className="rounded-md px-2.5 py-1 font-semibold whitespace-nowrap"
              style={{ background: "#F0F4F8", color: "#444", fontSize: "clamp(10px, 2.4cqw, 13px)" }}
            >
              {formatRub(total)}
            </span>
          </div>
          <span className="text-[#444] whitespace-nowrap" style={{ fontSize: "clamp(9px, 2.1cqw, 12px)" }}>
            mystorybox.ru
          </span>
        </div>
      </div>
    </div>
  );
}
