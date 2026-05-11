/**
 * Locale-safe uppercase for English UI labels.
 *
 * Android's String.toUpperCase() — used by RN textTransform: "uppercase" and
 * the NativeWind "uppercase" class — applies the device's default locale.
 * On Turkish devices, "i" -> "İ", producing "PRONOUNCİATİON" instead of
 * "PRONUNCIATION". Lock the locale to en-US for English labels.
 */
export function upperEn(value: string): string {
  return value.toLocaleUpperCase("en-US");
}
