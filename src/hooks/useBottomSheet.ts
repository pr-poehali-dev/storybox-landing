import { useRef, useState, useEffect, useCallback } from "react";

interface UseBottomSheetOptions {
  onClose: () => void;
  isOpen: boolean;
}

export function useBottomSheet({ onClose, isOpen }: UseBottomSheetOptions) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const currentY = useRef(0);

  // Блокируем скролл страницы когда шит открыт
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [isOpen]);

  // Сброс позиции при открытии
  useEffect(() => {
    if (isOpen) setDragY(0);
  }, [isOpen]);

  const onHandleTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    currentY.current = 0;
    setIsDragging(true);
  }, []);

  const onHandleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientY - startY.current;
    // Только вниз
    if (delta > 0) {
      currentY.current = delta;
      setDragY(delta);
    }
  }, [isDragging]);

  const onHandleTouchEnd = useCallback(() => {
    setIsDragging(false);
    const sheetHeight = sheetRef.current?.offsetHeight ?? 400;
    // Закрыть если потянули больше 30% высоты или быстро свайпнули > 80px
    if (currentY.current > Math.min(sheetHeight * 0.3, 200)) {
      onClose();
    } else {
      setDragY(0);
    }
  }, [onClose]);

  const sheetStyle: React.CSSProperties = {
    transform: dragY > 0 ? `translateY(${dragY}px)` : undefined,
    transition: isDragging ? "none" : "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
  };

  return {
    sheetRef,
    handleRef,
    dragY,
    isDragging,
    sheetStyle,
    onHandleTouchStart,
    onHandleTouchMove,
    onHandleTouchEnd,
  };
}
