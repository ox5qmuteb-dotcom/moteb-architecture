/**
 * Unified Currency System
 * جنظام موحد للعملات مع الريال السعودي كعملة أساسية
 */

export interface CurrencyRate {
  code: string;
  name: string;
  nameAr: string;
  rateToSAR: number;
  symbol: string;
  country: string;
}

export class CurrencySystem {
  private baseCurrency: string = 'SAR';
  private rates: Map<string, CurrencyRate> = new Map();

  constructor() {
    this.initializeCurrencies();
  }

  /**
   * Initialize all currencies linked to SAR
   * تهيئة جميع العملات مرتبطة بالريال السعودي
   */
  private initializeCurrencies(): void {
    const currencies: CurrencyRate[] = [
      {
        code: 'SAR',
        name: 'Saudi Riyal',
        nameAr: 'الريال السعودي',
        rateToSAR: 1.0,
        symbol: '﷼',
        country: 'Saudi Arabia',
      },
      {
        code: 'USD',
        name: 'US Dollar',
        nameAr: 'الدولار الأمريكي',
        rateToSAR: 3.75,
        symbol: '$',
        country: 'United States',
      },
      {
        code: 'EUR',
        name: 'Euro',
        nameAr: 'اليورو',
        rateToSAR: 4.05,
        symbol: '€',
        country: 'Eurozone',
      },
      {
        code: 'AED',
        name: 'UAE Dirham',
        nameAr: 'الدرهم الإماراتي',
        rateToSAR: 1.02,
        symbol: 'د.إ',
        country: 'United Arab Emirates',
      },
      {
        code: 'EGP',
        name: 'Egyptian Pound',
        nameAr: 'الجنيه المصري',
        rateToSAR: 0.078,
        symbol: '£',
        country: 'Egypt',
      },
      {
        code: 'KWD',
        name: 'Kuwaiti Dinar',
        nameAr: 'الدينار الكويتي',
        rateToSAR: 12.2,
        symbol: 'د.ك',
        country: 'Kuwait',
      },
      {
        code: 'QAR',
        name: 'Qatari Riyal',
        nameAr: 'الريال القطري',
        rateToSAR: 1.03,
        symbol: 'ر.ق',
        country: 'Qatar',
      },
      {
        code: 'OMR',
        name: 'Omani Rial',
        nameAr: 'الريال العماني',
        rateToSAR: 9.75,
        symbol: 'ر.ع',
        country: 'Oman',
      },
      {
        code: 'GBP',
        name: 'British Pound',
        nameAr: 'الجنيه الإسترليني',
        rateToSAR: 4.73,
        symbol: '£',
        country: 'United Kingdom',
      },
      {
        code: 'JPY',
        name: 'Japanese Yen',
        nameAr: 'الين الياباني',
        rateToSAR: 0.026,
        symbol: '¥',
        country: 'Japan',
      },
    ];

    currencies.forEach((currency) => {
      this.rates.set(currency.code, currency);
    });
  }

  /**
   * Convert amount from one currency to another
   * تحويل المبلغ من عملة إلى أخرى
   */
  public convert(
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): number {
    const fromRate = this.rates.get(fromCurrency.toUpperCase());
    const toRate = this.rates.get(toCurrency.toUpperCase());

    if (!fromRate || !toRate) {
      throw new Error(
        `Currency not found. Available: ${Array.from(this.rates.keys()).join(', ')}`
      );
    }

    // Convert to SAR first, then to target currency
    const amountInSAR = amount * fromRate.rateToSAR;
    return amountInSAR / toRate.rateToSAR;
  }

  /**
   * Convert any currency to SAR
   * تحويل أي عملة إلى الريال السعودي
   */
  public convertToSAR(amount: number, fromCurrency: string): number {
    return this.convert(amount, fromCurrency, 'SAR');
  }

  /**
   * Convert from SAR to any currency
   * تحويل من الريال السعودي إلى أي عملة
   */
  public convertFromSAR(amount: number, toCurrency: string): number {
    return this.convert(amount, 'SAR', toCurrency);
  }

  /**
   * Get currency information
   * الحصول على معلومات العملة
   */
  public getCurrency(code: string): CurrencyRate | undefined {
    return this.rates.get(code.toUpperCase());
  }

  /**
   * Get all available currencies
   * الحصول على جميع العملات المتاحة
   */
  public getAllCurrencies(): CurrencyRate[] {
    return Array.from(this.rates.values());
  }

  /**
   * Update exchange rate
   * تحديث سعر الصرف
   */
  public updateRate(currencyCode: string, rateToSAR: number): void {
    const currency = this.rates.get(currencyCode.toUpperCase());
    if (!currency) {
      throw new Error(`Currency ${currencyCode} not found`);
    }
    currency.rateToSAR = rateToSAR;
  }

  /**
   * Get base currency (SAR)
   * الحصول على العملة الأساسية
   */
  public getBaseCurrency(): string {
    return this.baseCurrency;
  }

  /**
   * Format currency value
   * تنسيق قيمة العملة
   */
  public format(
    amount: number,
    currencyCode: string,
    locale: string = 'ar-SA'
  ): string {
    const currency = this.getCurrency(currencyCode);
    if (!currency) {
      throw new Error(`Currency ${currencyCode} not found`);
    }

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  }
}

export default CurrencySystem;
