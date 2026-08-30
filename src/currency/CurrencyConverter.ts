/**
 * Currency Converter Service
 * خدمة تحويل العملات
 */

import CurrencySystem, { CurrencyRate } from './CurrencySystem';

export interface ConversionResult {
  originalAmount: number;
  originalCurrency: string;
  convertedAmount: number;
  targetCurrency: string;
  rate: number;
  timestamp: Date;
}

export class CurrencyConverter {
  private currencySystem: CurrencySystem;
  private conversionHistory: ConversionResult[] = [];

  constructor() {
    this.currencySystem = new CurrencySystem();
  }

  /**
   * Perform conversion and log to history
   * إجراء التحويل وتسجيله في السجل
   */
  public convert(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): ConversionResult {
    const convertedAmount = this.currencySystem.convert(
      amount,
      fromCurrency,
      toCurrency
    );

    const rate = convertedAmount / amount;

    const result: ConversionResult = {
      originalAmount: amount,
      originalCurrency: fromCurrency.toUpperCase(),
      convertedAmount: parseFloat(convertedAmount.toFixed(2)),
      targetCurrency: toCurrency.toUpperCase(),
      rate: parseFloat(rate.toFixed(6)),
      timestamp: new Date(),
    };

    this.conversionHistory.push(result);
    return result;
  }

  /**
   * Get conversion history
   * الحصول على سجل التحويلات
   */
  public getHistory(): ConversionResult[] {
    return this.conversionHistory;
  }

  /**
   * Clear conversion history
   * مسح سجل التحويلات
   */
  public clearHistory(): void {
    this.conversionHistory = [];
  }

  /**
   * Get all available currencies
   * الحصول على جميع العملات المتاحة
   */
  public getAvailableCurrencies(): CurrencyRate[] {
    return this.currencySystem.getAllCurrencies();
  }

  /**
   * Get exchange rate between two currencies
   * الحصول على سعر الصرف بين عملتين
   */
  public getExchangeRate(fromCurrency: string, toCurrency: string): number {
    const amount = 1;
    return this.currencySystem.convert(amount, fromCurrency, toCurrency);
  }

  /**
   * Convert to SAR (Saudi Riyal)
   * تحويل إلى الريال السعودي
   */
  public toSAR(amount: number, fromCurrency: string): ConversionResult {
    return this.convert(amount, fromCurrency, 'SAR');
  }

  /**
   * Convert from SAR (Saudi Riyal)
   * تحويل من الريال السعودي
   */
  public fromSAR(amount: number, toCurrency: string): ConversionResult {
    return this.convert(amount, 'SAR', toCurrency);
  }
}

export default CurrencyConverter;
