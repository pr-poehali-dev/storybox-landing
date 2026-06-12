// Цели Яндекс.Метрики (reachGoal)
const YM_COUNTER_ID = 109747086;

declare global {
  interface Window {
    ym?: (counterId: number, action: string, ...params: unknown[]) => void;
  }
}

export function reachGoal(target: string, params?: Record<string, unknown>): void {
  try {
    if (typeof window !== "undefined" && typeof window.ym === "function") {
      window.ym(YM_COUNTER_ID, "reachGoal", target, params);
    }
  } catch {
    // молча игнорируем — аналитика не должна ломать UI
  }
}
