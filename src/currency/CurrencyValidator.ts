/**
 * Currency Validator
 * التحقق من صحة العملات
 */

export class CurrencyValidator {
  private validCurrencies: Set<string> = new Set([
    'SAR', 'USD', 'EUR', 'AED', 'EGP', 'KWD', 'QAR', 'OMR', 'GBP', 'JPY',
  ]);

  /**
   * Check if currency code is valid
   * التحقق من صحة رمز العملة
   */
  public isValidCurrency(currencyCode: string): boolean {
    return this.validCurrencies.has(currencyCode.toUpperCase());
  }

  /**
   * Check if amount is valid
   * التحقق من صحة المبلغ
   */
  public isValidAmount(amount: number): boolean {
    return !isNaN(amount) && amount >= 0 && isFinite(amount);
  }

  /**
   * Validate conversion parameters
   * التحقق من معاملات التحويل
   */
  public validateConversion(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.isValidAmount(amount)) {
      errors.push('Invalid amount');
    }

    if (!this.isValidCurrency(fromCurrency)) {
      errors.push(`Invalid source currency: ${fromCurrency}`);
    }

    if (!this.isValidCurrency(toCurrency)) {
      errors.push(`Invalid target currency: ${toCurrency}`);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export default CurrencyValidator;
