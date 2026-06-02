function buildMask(digits: string): string {
  // digits всегда начинается с "7", длина 1..11
  if (digits.length === 0) return "";
  let result = "+7";
  if (digits.length > 1) result += " (" + digits.slice(1, 4);
  if (digits.length >= 4) result += ") " + digits.slice(4, 7);
  if (digits.length >= 7) result += "-" + digits.slice(7, 9);
  if (digits.length >= 9) result += "-" + digits.slice(9, 11);
  return result;
}

// Нормализуем чистые цифры (без ведущих 7/8) → всегда "7XXXXXXXXXX"
function normalizeDigits(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("8") || d.startsWith("7")) {
    d = "7" + d.slice(1);
  } else if (d.length > 0) {
    d = "7" + d;
  }
  return d.slice(0, 11);
}

// Основная функция — принимает новое raw значение из input
// prevDigits — предыдущие чистые цифры (храните в state/ref)
// Возвращает { masked, digits }
export function applyPhoneMask(
  raw: string,
  prevDigits: string,
): { masked: string; digits: string } {
  const newDigits = normalizeDigits(raw);

  // Определяем удаление по количеству чистых цифр (надёжно на iOS)
  const isDeleting = newDigits.length <= prevDigits.length && raw.length < buildMask(prevDigits).length;

  let digits = newDigits;

  if (isDeleting && digits.length > 1) {
    // Убираем последнюю значащую цифру
    digits = prevDigits.slice(0, -1);
    if (digits.length === 0) digits = "";
  }

  return { masked: buildMask(digits), digits };
}

export function validatePhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!value.trim()) return "Введите номер телефона";
  if (digits.length < 11) return "Введите полный номер телефона";
  return "";
}

export function validateEmail(value: string): string {
  if (!value.trim()) return "Введите e-mail";
  if (!/^[a-zA-Z0-9._%+]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/.test(value.trim()))
    return "Введите корректный e-mail (только латиница, символ @)";
  return "";
}
