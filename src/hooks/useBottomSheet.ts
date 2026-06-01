import { useRef, useState, useEffect, useCallback } from "react";

interface UseBottomSheetOptions {
  onClose: () => void;
  isOpen: boolean;
}

export function useBottomSheet({ onClose, isOpen }: UseBottomSheetOptions) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);

  // Блокируем скролл страницы — Safari-совместимый способ
  useEffect(() => {
    if (!isOpen) return;

    const onTouchMove = (e: TouchEvent) => {
      // Разрешаем скролл внутри шита, блокируем под ним
      const sheet = sheetRef.current;
      if (!sheet) { e.preventDefault(); return; }
      const target = e.target as Node;
      if (!sheet.contains(target)) e.preventDefault();
    };

    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("touchmove", onTouchMove);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Сброс позиции при открытии
  useEffect(() => {
    if (isOpen) {
      setDragY(0);
      setIsDragging(false);
      currentY.current = 0;
    }
  }, [isOpen]);

  const onHandleTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
    startY.current = e.touches[0].clientY;
    currentY.current = 0;
    setIsDragging(true);
  }, []);

  const onHandleTouchMove = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
    const delta = e.touches[0].clientY - startY.current;
    if (delta > 0) {
      currentY.current = delta;
      setDragY(delta);
    }
  }, []);

  const onHandleTouchEnd = useCallback(() => {
    setIsDragging(false);
    const sheetHeight = sheetRef.current?.offsetHeight ?? 400;
    if (currentY.current > Math.min(sheetHeight * 0.3, 160)) {
      setDragY(sheetHeight);
      setTimeout(() => onClose(), 280);
    } else {
      setDragY(0);
    }
    currentY.current = 0;
  }, [onClose]);

  const sheetStyle: React.CSSProperties = {
    transform: dragY > 0 ? `translateY(${dragY}px)` : "translateY(0)",
    transition: isDragging ? "none" : "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
    willChange: "transform",
    // Safari GPU acceleration
    WebkitTransform: dragY > 0 ? `translateY(${dragY}px)` : "translateY(0)",
  };

  return {
    sheetRef,
    sheetStyle,
    onHandleTouchStart,
    onHandleTouchMove,
    onHandleTouchEnd,
  };
}