function buildMask(d: string): string {
  if (d.length === 0) return "";
  let result = "+7";
  if (d.length > 1) result += " (" + d.slice(1, 4);
  if (d.length >= 4) result += ") " + d.slice(4, 7);
  if (d.length >= 7) result += "-" + d.slice(7, 9);
  if (d.length >= 9) result += "-" + d.slice(9, 11);
  return result;
}

export function applyPhoneMask(raw: string, prev: string): string {
  const isDeleting = raw.length < prev.length;

  let digits = raw.replace(/\D/g, "");

  if (digits.startsWith("8") || digits.startsWith("7")) {
    digits = "7" + digits.slice(1);
  } else if (digits.length > 0) {
    digits = "7" + digits;
  }

  digits = digits.slice(0, 11);

  // При удалении — убираем последнюю цифру (кроме фиксированной "7")
  if (isDeleting && digits.length > 1) {
    digits = digits.slice(0, -1);
  }

  return buildMask(digits);
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