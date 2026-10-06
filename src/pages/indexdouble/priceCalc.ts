export const MIN_HOURS = 3;
export const MAX_HOURS = 25;
export const DEFAULT_HOURS = 8;

const RATE_POINTS: [number, number][] = [
  [3, 15650],
  [5, 13590],
  [8, 11744],
  [15, 9800],
  [25, 8000],
];

const PHOTO_POINTS: [number, number][] = [
  [3, 40],
  [5, 60],
  [8, 100],
  [25, 270],
];

function interpolate(points: [number, number][], x: number) {
  for (let i = 0; i < points.length - 1; i++) {
    const [a, va] = points[i];
    const [b, vb] = points[i + 1];
    if (x >= a && x <= b) return va + ((vb - va) * (x - a)) / (b - a);
  }
  return points[points.length - 1][1];
}

export function calcPrice(hours: number) {
  const h = Math.min(MAX_HOURS, Math.max(MIN_HOURS, Math.round(hours)));
  const total = Math.round((h * interpolate(RATE_POINTS, h) + 50) / 1000) * 1000 - 50;
  const perHour = Math.round(total / h);
  const basePerHour = RATE_POINTS[0][1];
  const savingPercent = Math.round((1 - perHour / basePerHour) * 100);
  const pages = h * 30;
  const photos = Math.round(interpolate(PHOTO_POINTS, h) / 10) * 10;
  return { hours: h, total, perHour, savingPercent, pages, photos };
}

export function formatRub(n: number) {
  return n.toLocaleString("ru-RU").replace(/,/g, " ") + " ₽";
}

export function hoursLabel(h: number) {
  const m10 = h % 10;
  const m100 = h % 100;
  if (m10 === 1 && m100 !== 11) return `${h} час`;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return `${h} часа`;
  return `${h} часов`;
}

export const TICKS = [3, 5, 8, 10, 15, 20, 25];

export const CALC_FEATURES = (h: number) => {
  const list = [
    "Генеалогическое древо",
    "Печатная книга в твёрдом переплёте",
    "Литературная редактура и вёрстка",
  ];
  if (h >= 5) list.push("Реставрация фото", "Аудио-архив интервью", "Электронная версия книги");
  if (h >= 8) list.push("Несколько героев и рассказчиков в одной книге");
  if (h >= 15) list.push("Полная семейная хроника — несколько поколений");
  return list;
};

export const GIFT_POINTS = [
  { icon: "Mail", text: "Именной сертификат пришлём сразу после оплаты — в мессенджер или на почту, можно распечатать" },
  { icon: "CalendarClock", text: "Получатель сам выберет удобное время для интервью — сертификат действует 12 месяцев" },
  { icon: "Gift", text: "Ничего не нужно готовить заранее: дату праздника не пропустите, книгу начнём, когда удобно" },
];
