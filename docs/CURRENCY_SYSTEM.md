# نظام العملات الموحد
# Unified Currency System

## نظرة عامة | Overview

نظام موحد للعملات يربط جميع العملات بـ **الريال السعودي (SAR)** كعملة أساسية. يوفر تحويلات دقيقة وفعالة بين العملات المختلفة مع دعم اللغة العربية الكاملة.

A comprehensive currency system that links all currencies to the **Saudi Riyal (SAR)** as the base currency. It provides accurate and efficient conversions between different currencies with full Arabic language support.

---

## المميزات | Features

✅ **تحويل دقيق للعملات** - Accurate currency conversion
✅ **10 عملات مدعومة** - 10 supported currencies
✅ **ربط موحد بالريال السعودي** - Unified link to Saudi Riyal
✅ **سجل التحويلات** - Conversion history tracking
✅ **التحقق من البيانات** - Data validation
✅ **تنسيق العملات** - Currency formatting
✅ **دعم كامل للعربية** - Full Arabic support

---

## العملات المدعومة | Supported Currencies

| الكود | الاسم الإنجليزي | الاسم العربي | الدولة | الرمز |
|-------|-----------------|-------------|---------|-------|
| SAR | Saudi Riyal | الريال السعودي | المملكة العربية السعودية | ﷼ |
| USD | US Dollar | الدولار الأمريكي | الولايات المتحدة | $ |
| EUR | Euro | اليورو | منطقة اليورو | € |
| AED | UAE Dirham | الدرهم الإماراتي | الإمارات العربية المتحدة | د.إ |
| EGP | Egyptian Pound | الجنيه المصري | مصر | £ |
| KWD | Kuwaiti Dinar | الدينار الكويتي | الكويت | د.ك |
| QAR | Qatari Riyal | الريال القطري | قطر | ر.ق |
| OMR | Omani Rial | الريال العماني | عمان | ر.ع |
| GBP | British Pound | الجنيه الإسترليني | المملكة المتحدة | £ |
| JPY | Japanese Yen | الين الياباني | اليابان | ¥ |

---

## الاستخدام | Usage

### 1. التحويل الأساسي | Basic Conversion

```typescript
import { CurrencySystem } from './src/currency';

const currency = new CurrencySystem();

// تحويل 100 دولار إلى ريال
const result = currency.convert(100, 'USD', 'SAR');
console.log(result); // 375
```

### 2. تحويل إلى الريال السعودي | Convert to SAR

```typescript
// تحويل أي عملة إلى الريال السعودي
const sarAmount = currency.convertToSAR(100, 'EUR');
console.log(sarAmount); // ~405
```

### 3. تحويل من الريال السعودي | Convert from SAR

```typescript
// تحويل من الريال السعودي إلى أي عملة
const usdAmount = currency.convertFromSAR(375, 'USD');
console.log(usdAmount); // 100
```

### 4. استخدام محول العملات | Using Currency Converter

```typescript
import { CurrencyConverter } from './src/currency';

const converter = new CurrencyConverter();

// تحويل مع تسجيل في السجل
const result = converter.convert(100, 'USD', 'SAR');
console.log(result);
// {
//   originalAmount: 100,
//   originalCurrency: 'USD',
//   convertedAmount: 375,
//   targetCurrency: 'SAR',
//   rate: 3.75,
//   timestamp: 2024-01-01T...
// }

// الحصول على سجل التحويلات
const history = converter.getHistory();
console.log(history);
```

### 5. التحقق من البيانات | Validation

```typescript
import { CurrencyValidator } from './src/currency';

const validator = new CurrencyValidator();

// التحقق من صحة العملة
if (validator.isValidCurrency('USD')) {
  console.log('العملة صحيحة');
}

// التحقق من صحة المبلغ
if (validator.isValidAmount(100)) {
  console.log('المبلغ صحيح');
}

// التحقق من معاملات التحويل
const validation = validator.validateConversion(100, 'USD', 'SAR');
if (validation.valid) {
  console.log('معاملات التحويل صحيحة');
} else {
  console.log('الأخطاء:', validation.errors);
}
```

### 6. تنسيق العملات | Formatting

```typescript
import { CurrencyFormatter } from './src/currency';

// تنسيق مع اللغة العربية
const formatted = CurrencyFormatter.format(100, 'SAR', 'ar-SA');
console.log(formatted); // ١٠٠٫٠٠ ﷼

// تنسيق مع عدد عشري مخصص
const customFormat = CurrencyFormatter.formatWithDecimals(100.5, 'USD', 2, 'en-US');
console.log(customFormat); // $100.50

// تنسيق بسيط
const simple = CurrencyFormatter.simple(100, 'SAR');
console.log(simple); // 100.00 SAR
```

---

## الهيكل المعماري | Architecture

```
src/currency/
├── CurrencySystem.ts      # النظام الأساسي
├── CurrencyConverter.ts   # محول العملات مع السجل
├── CurrencyValidator.ts   # التحقق من البيانات
├── CurrencyFormatter.ts   # تنسيق العملات
└── index.ts              # نقطة الدخول

tests/
└── currency.test.ts      # الاختبارات

docs/
└── CURRENCY_SYSTEM.md    # التوثيق
```

---

## معاملات الصرف | Exchange Rates

جميع المعاملات مرتبطة بـ **الريال السعودي كعملة أساسية (1 SAR = 1.0)**:

```
1 USD = 3.75 SAR
1 EUR = 4.05 SAR
1 AED = 1.02 SAR
1 EGP = 0.078 SAR
1 KWD = 12.2 SAR
1 QAR = 1.03 SAR
1 OMR = 9.75 SAR
1 GBP = 4.73 SAR
1 JPY = 0.026 SAR
```

**ملاحظة:** يمكن تحديث المعاملات باستخدام `updateRate()`

---

## الاختبارات | Tests

للتأكد من أن كل شيء يعمل بشكل صحيح، قم بتشغيل الاختبارات:

```bash
npm test
```

---

## التطوير المستقبلي | Future Development

- [ ] تحديث معاملات الصرف تلقائياً من API
- [ ] دعم عملات إضافية
- [ ] تقارير التحويلات المتقدمة
- [ ] التكامل مع قواعد البيانات
- [ ] واجهة ويب تفاعلية

---

## الترخيص | License

MIT License - يمكن الاستخدام الحر للمشاريع الشخصية والتجارية.
