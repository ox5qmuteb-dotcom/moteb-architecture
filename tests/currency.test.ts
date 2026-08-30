/**
 * Currency System Tests
 * اختبارات نظام العملات
 */

import CurrencySystem from '../src/currency/CurrencySystem';
import CurrencyConverter from '../src/currency/CurrencyConverter';
import CurrencyValidator from '../src/currency/CurrencyValidator';
import CurrencyFormatter from '../src/currency/CurrencyFormatter';

describe('Unified Currency System', () => {
  let currencySystem: CurrencySystem;
  let converter: CurrencyConverter;
  let validator: CurrencyValidator;

  beforeEach(() => {
    currencySystem = new CurrencySystem();
    converter = new CurrencyConverter();
    validator = new CurrencyValidator();
  });

  describe('CurrencySystem', () => {
    test('should convert USD to SAR', () => {
      const result = currencySystem.convert(1, 'USD', 'SAR');
      expect(result).toBeCloseTo(3.75, 1);
    });

    test('should convert SAR to EUR', () => {
      const result = currencySystem.convert(100, 'SAR', 'EUR');
      expect(result).toBeCloseTo(24.69, 1);
    });

    test('should convert between non-SAR currencies', () => {
      const result = currencySystem.convert(1, 'USD', 'EUR');
      expect(result).toBeCloseTo(0.926, 2);
    });

    test('should throw error for invalid currency', () => {
      expect(() => {
        currencySystem.convert(1, 'USD', 'INVALID');
      }).toThrow();
    });

    test('should convert to SAR', () => {
      const result = currencySystem.convertToSAR(100, 'USD');
      expect(result).toBeCloseTo(375, 1);
    });

    test('should convert from SAR', () => {
      const result = currencySystem.convertFromSAR(375, 'USD');
      expect(result).toBeCloseTo(100, 1);
    });
  });

  describe('CurrencyConverter', () => {
    test('should track conversion history', () => {
      converter.convert(100, 'USD', 'SAR');
      converter.convert(200, 'EUR', 'AED');

      const history = converter.getHistory();
      expect(history.length).toBe(2);
      expect(history[0].originalAmount).toBe(100);
      expect(history[1].originalAmount).toBe(200);
    });

    test('should convert to SAR', () => {
      const result = converter.toSAR(1, 'USD');
      expect(result.convertedAmount).toBeCloseTo(3.75, 1);
      expect(result.targetCurrency).toBe('SAR');
    });

    test('should convert from SAR', () => {
      const result = converter.fromSAR(1, 'USD');
      expect(result.convertedAmount).toBeCloseTo(0.27, 2);
      expect(result.targetCurrency).toBe('USD');
    });
  });

  describe('CurrencyValidator', () => {
    test('should validate valid currency codes', () => {
      expect(validator.isValidCurrency('SAR')).toBe(true);
      expect(validator.isValidCurrency('USD')).toBe(true);
      expect(validator.isValidCurrency('EUR')).toBe(true);
    });

    test('should reject invalid currency codes', () => {
      expect(validator.isValidCurrency('XYZ')).toBe(false);
      expect(validator.isValidCurrency('INVALID')).toBe(false);
    });

    test('should validate amounts', () => {
      expect(validator.isValidAmount(100)).toBe(true);
      expect(validator.isValidAmount(0)).toBe(true);
      expect(validator.isValidAmount(-50)).toBe(false);
      expect(validator.isValidAmount(NaN)).toBe(false);
    });

    test('should validate conversion parameters', () => {
      const result = validator.validateConversion(100, 'USD', 'SAR');
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    test('should catch invalid conversion parameters', () => {
      const result = validator.validateConversion(-50, 'USD', 'INVALID');
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('CurrencyFormatter', () => {
    test('should format currency correctly', () => {
      const formatted = CurrencyFormatter.format(100, 'SAR', 'ar-SA');
      expect(formatted).toContain('100');
      expect(formatted).toContain('﷼');
    });

    test('should format with custom decimals', () => {
      const formatted = CurrencyFormatter.formatWithDecimals(100.5, 'USD', 2, 'en-US');
      expect(formatted).toContain('100.50');
    });

    test('should provide simple format', () => {
      const formatted = CurrencyFormatter.simple(100, 'SAR');
      expect(formatted).toBe('100.00 SAR');
    });
  });
});
