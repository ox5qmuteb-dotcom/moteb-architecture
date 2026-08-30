/**
 * Currency Formatter
 * تنسيق العملات
 */

export class CurrencyFormatter {
  /**
   * Format currency with symbol and locale
   * تنسيق العملة مع الرمز واللغة
   */
  public static format(
    amount: number,
    currencyCode: string,
    locale: string = 'ar-SA'
  ): string {
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
      }).format(amount);
    } catch (error) {
      return `${amount} ${currencyCode}`;
    }
  }

  /**
   * Format with custom decimal places
   * تنسيق مع عدد عشري مخصص
   */
  public static formatWithDecimals(
    amount: number,
    currencyCode: string,
    decimals: number = 2,
    locale: string = 'ar-SA'
  ): string {
    const formatted = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount);

    return formatted;
  }

  /**
   * Simple format (number only with currency code)
   * تنسيق بسيط (رقم فقط مع رمز العملة)
   */
  public static simple(amount: number, currencyCode: string): string {
    return `${amount.toFixed(2)} ${currencyCode}`;
  }
}

export default CurrencyFormatter;
