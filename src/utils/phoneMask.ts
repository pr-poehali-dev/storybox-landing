export function applyPhoneMask(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  let d = digits;

  // Нормализуем: если начинается с 8 или 7 — заменяем на 7
  if (d.startsWith("8") || d.startsWith("7")) {
    d = "7" + d.slice(1);
  } else if (d.length > 0) {
    d = "7" + d;
  }

  d = d.slice(0, 11);

  let result = "";
  if (d.length === 0) return "";
  result = "+7";
  if (d.length > 1) result += " (" + d.slice(1, 4);
  if (d.length >= 4) result += ") " + d.slice(4, 7);
  if (d.length >= 7) result += "-" + d.slice(7, 9);
  if (d.length >= 9) result += "-" + d.slice(9, 11);

  return result;
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