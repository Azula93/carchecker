/**
 * Utilidades ligeras de validación runtime para parámetros de Route Handlers.
 * Evita dependencias pesadas y asegura validación estricta contra NaN, Infinity,
 * tipos incorrectos, decimales espurios y valores fuera de rango.
 */

export interface ValidationResult<T> {
  valid: boolean;
  value?: T;
  error?: string;
}

/**
 * Valida y parsea un entero estricto dentro de un rango inclusivo [min, max].
 * Rechaza cadenas con decimales (ej. "2020.5"), formato exponencial ("1e5"),
 * caracteres no numéricos, NaN e Infinity.
 */
export function parseIntegerRange(
  val: string | null | undefined,
  min: number,
  max: number,
  fieldName = 'parámetro'
): ValidationResult<number> {
  if (val === null || val === undefined || val.trim() === '') {
    return { valid: false, error: `El ${fieldName} es requerido.` };
  }

  const trimmed = val.trim();

  // Expresión regular estricta para números enteros opcionalmente con signo negativo
  if (!/^-?\d+$/.test(trimmed)) {
    return {
      valid: false,
      error: `El ${fieldName} debe ser un número entero válido sin decimales.`,
    };
  }

  const num = parseInt(trimmed, 10);

  if (!Number.isSafeInteger(num)) {
    return {
      valid: false,
      error: `El ${fieldName} está fuera del rango numérico representable.`,
    };
  }

  if (num < min || num > max) {
    return {
      valid: false,
      error: `El ${fieldName} debe estar entre ${min} y ${max}.`,
    };
  }

  return { valid: true, value: num };
}

/**
 * Valida y parsea un número positivo (entero o decimal) dentro de un rango inclusivo [min, max].
 * Rechaza NaN, Infinity, valores negativos y notación exponencial arbitraria.
 */
export function parsePositiveNumber(
  val: string | null | undefined,
  min: number,
  max: number,
  fieldName = 'parámetro'
): ValidationResult<number> {
  if (val === null || val === undefined || val.trim() === '') {
    return { valid: false, error: `El ${fieldName} es requerido.` };
  }

  const trimmed = val.trim();

  // Validar formato numérico decimal estándar positivo (ej: "1600", "2.5")
  if (!/^\d+(\.\d+)?$/.test(trimmed)) {
    return {
      valid: false,
      error: `El ${fieldName} debe ser un número positivo válido.`,
    };
  }

  const num = parseFloat(trimmed);

  if (isNaN(num) || !isFinite(num)) {
    return {
      valid: false,
      error: `El ${fieldName} no es un número válido.`,
    };
  }

  if (num < min || num > max) {
    return {
      valid: false,
      error: `El ${fieldName} debe estar entre ${min} y ${max}.`,
    };
  }

  return { valid: true, value: num };
}

/**
 * Valida que una cadena de texto no exceda una longitud máxima y no contenga caracteres de control nulos.
 */
export function validateStringLength(
  val: string | null | undefined,
  maxLength: number,
  fieldName = 'parámetro'
): ValidationResult<string> {
  if (val === null || val === undefined) {
    return { valid: true, value: '' };
  }

  // Rechazar bytes nulos
  if (val.includes('\0')) {
    return {
      valid: false,
      error: `El ${fieldName} contiene caracteres de control no permitidos.`,
    };
  }

  if (val.length > maxLength) {
    return {
      valid: false,
      error: `El ${fieldName} excede la longitud máxima de ${maxLength} caracteres.`,
    };
  }

  return { valid: true, value: val.trim() };
}

/**
 * Valida si un valor pertenece a una lista blanca de opciones permitidas.
 */
export function isAllowedValue<T extends string>(
  val: string | null | undefined,
  allowed: readonly T[]
): val is T {
  if (!val) return false;
  return (allowed as readonly string[]).includes(val);
}
