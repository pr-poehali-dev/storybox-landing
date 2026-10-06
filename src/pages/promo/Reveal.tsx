import type { CSSProperties, ReactNode } from "react";
import { useInView } from "./useInView";

type Effect = "up" | "left" | "right" | "zoom" | "fade";

interface RevealProps {
  children: ReactNode;
  effect?: Effect;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "li";
}

const HIDDEN: Record<Effect, string> = {
  up: "translate3d(0, 48px, 0)",
  left: "translate3d(-56px, 0, 0)",
  right: "translate3d(56px, 0, 0)",
  zoom: "scale(0.94)",
  fade: "none",
};

export default function Reveal({ children, effect = "up", delay = 0, className = "", style, as = "div" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Tag = as as "div";
  return (
    <Tag
      ref={ref}
      className={`promo-reveal ${className}`}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : HIDDEN[effect],
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
