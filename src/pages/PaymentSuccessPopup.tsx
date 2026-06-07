import { useEffect } from "react";
import { useBottomSheet } from "@/hooks/useBottomSheet";
import Icon from "@/components/ui/icon";

interface PaymentSuccessPopupProps {
  open: boolean;
  onClose: () => void;
}

const SOCIALS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/79031932725",
    color: "#25D366",
    icon: (
      <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100ZM69.7626 28.9928C64.6172 23.841 57.7739 21.0027 50.4832 21C35.4616 21 23.2346 33.2252 23.2292 48.2522C23.2274 53.0557 24.4823 57.7446 26.8668 61.8769L23 76L37.4477 72.2105C41.4282 74.3822 45.9107 75.5262 50.4714 75.528H50.4823C65.5029 75.528 77.7299 63.301 77.7363 48.2749C77.7408 40.9915 74.9089 34.1446 69.7626 28.9928ZM62.9086 53.9588C62.2274 53.6178 58.8799 51.9708 58.2551 51.7435C57.6313 51.5161 57.1766 51.4024 56.7228 52.0845C56.269 52.7666 54.964 54.2998 54.5666 54.7545C54.1692 55.2092 53.7718 55.2656 53.0915 54.9246C52.9802 54.8688 52.8283 54.803 52.6409 54.7217C51.6819 54.3057 49.7905 53.4855 47.6151 51.5443C45.5907 49.7382 44.2239 47.5084 43.8265 46.8272C43.4291 46.1452 43.7837 45.7769 44.1248 45.4376C44.3292 45.2338 44.564 44.9478 44.7987 44.662C44.9157 44.5194 45.0328 44.3768 45.146 44.2445C45.4345 43.9075 45.56 43.6516 45.7302 43.3049C45.7607 43.2427 45.7926 43.1776 45.8272 43.1087C46.0545 42.654 45.9409 42.2565 45.7708 41.9155C45.6572 41.6877 45.0118 40.1167 44.4265 38.6923C44.1355 37.984 43.8594 37.3119 43.671 36.8592C43.1828 35.687 42.6883 35.69 42.2913 35.6924C42.2386 35.6928 42.1876 35.6931 42.1386 35.6906C41.7421 35.6706 41.2874 35.667 40.8336 35.667C40.3798 35.667 39.6423 35.837 39.0175 36.5191C38.9773 36.5631 38.9323 36.6111 38.8834 36.6633C38.1738 37.4209 36.634 39.0648 36.634 42.2002C36.634 45.544 39.062 48.7748 39.4124 49.2411L39.415 49.2444C39.4371 49.274 39.4767 49.3309 39.5333 49.4121C40.3462 50.5782 44.6615 56.7691 51.0481 59.5271C52.6732 60.2291 53.9409 60.6475 54.9303 60.9612C56.5618 61.4796 58.046 61.4068 59.22 61.2313C60.5286 61.0358 63.2487 59.5844 63.8161 57.9938C64.3836 56.4033 64.3836 55.0392 64.2136 54.7554C64.0764 54.5258 63.7545 54.3701 63.2776 54.1395C63.1633 54.0843 63.0401 54.0247 62.9086 53.9588Z" fill="white" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me/StoryBox_support",
    color: "#00A4E3",
    icon: (
      <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M50 100c27.614 0 50-22.386 50-50S77.614 0 50 0 0 22.386 0 50s22.386 50 50 50Zm21.977-68.056c.386-4.38-4.24-2.576-4.24-2.576-3.415 1.414-6.937 2.85-10.497 4.302-11.04 4.503-22.444 9.155-32.159 13.734-5.268 1.932-2.184 3.864-2.184 3.864l8.351 2.577c3.855 1.16 5.91-.129 5.91-.129l17.988-12.238c6.424-4.38 4.882-.773 3.34.773l-13.49 12.882c-2.056 1.804-1.028 3.35-.129 4.123 2.55 2.249 8.82 6.364 11.557 8.16.712.467 1.185.778 1.292.858.642.515 4.111 2.834 6.424 2.319 2.313-.516 2.57-3.479 2.57-3.479l3.083-20.226c.462-3.511.993-6.886 1.417-9.582.4-2.546.705-4.485.767-5.362Z" fill="white" />
      </svg>
    ),
  },
  {
    label: "MAX",
    href: "https://max.ru/u/f9LHodD0cOI8UouNiRQkCe1K4ytYGjf5V5GnnJPvsaF8JfKFdukRS-awK54",
    color: "#00a4e3",
    icon: (
      <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0ZM24.2314 12.5C17.8663 12.5 12.4942 17.4255 12.4941 23.9727C12.4941 26.714 13.0015 28.6059 13.4482 30.3047C13.8233 31.6836 14.1543 32.9467 14.1543 34.4414C14.3143 36.4326 17.9823 35.2685 19.1406 33.7793C20.9718 35.1031 22.0251 35.4346 24.292 35.4346C30.5586 35.4011 35.6151 30.2999 35.5938 24.0332C35.5937 17.6682 30.602 12.5 24.2314 12.5ZM24.3857 18.1592V18.165C27.5981 18.349 30.0709 21.0719 29.9453 24.2871C29.7296 27.4955 26.9854 29.9406 23.7734 29.7861C22.768 29.7055 21.8016 29.3614 20.9717 28.7881C20.4699 29.2899 19.6648 29.9402 19.3447 29.8633C18.6774 29.6868 17.8938 26.2951 18.335 23.5098C18.87 20.1452 21.2859 17.9993 24.3857 18.1592Z" fill="white"/>
      </svg>
    ),
  },
];

export default function PaymentSuccessPopup({ open, onClose }: PaymentSuccessPopupProps) {
  const { sheetRef, sheetStyle, onHandleTouchStart, onHandleTouchMove, onHandleTouchEnd } = useBottomSheet({ onClose, isOpen: open });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end md:items-center md:justify-center md:p-3"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={sheetRef}
        className="bottom-sheet-enter bg-white w-full rounded-t-3xl md:rounded-2xl md:max-w-[440px] shadow-2xl relative flex flex-col"
        style={sheetStyle}
      >
        {/* Drag handle — мобайл */}
        <div
          className="md:hidden flex-shrink-0 flex items-center justify-end px-4 pt-3 pb-2 cursor-grab active:cursor-grabbing rounded-t-3xl"
          onTouchStart={onHandleTouchStart}
          onTouchMove={onHandleTouchMove}
          onTouchEnd={onHandleTouchEnd}
        >
          <div className="absolute left-1/2 -translate-x-1/2 top-3 w-10 h-1 rounded-full bg-[#E0E0E0]" />
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: "#F0F0F0" }}>
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="px-7 pt-4 md:pt-8 pb-8">
          {/* Иконка успеха */}
          <div className="flex items-center justify-between mb-5">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "#E8F8F0" }}>
              <Icon name="CheckCircle" size={32} className="text-green-500" />
            </div>
            <button onClick={onClose} className="hidden md:flex w-9 h-9 rounded-full items-center justify-center text-[#7A7A7A] hover:bg-[#F2F2F2] transition-colors">
              <Icon name="X" size={18} />
            </button>
          </div>

          <h2 className="text-[24px] font-bold text-black mb-2 leading-tight">Оплата прошла успешно!</h2>
          <p className="text-[15px] leading-relaxed mb-6" style={{ color: "#7A7A7A" }}>
            Мы уже получили ваш заказ и свяжемся с вами в ближайшее время для уточнения деталей.
          </p>

          {/* Соцсети */}
          <p className="text-[13px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#AAAAAA" }}>
            Связаться с нами
          </p>
          <div className="flex flex-col gap-3 mb-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-[15px] text-white transition-opacity hover:opacity-90"
                style={{ background: s.color }}
              >
                {s.icon}
                {s.label}
              </a>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl text-[15px] font-semibold transition-colors"
            style={{ background: "#F0F0F0", color: "#555" }}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
