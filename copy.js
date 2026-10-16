import en from './locales/en.js';
import hi from './locales/hi.js';
import gu from './locales/gu.js';
import mr from './locales/mr.js';
export { en };
export const translations = { en, hi, gu, mr };
export const products = ['Balaji Chataka Pataka', 'Balaji PopRings', 'Cadbury Dairy Milk', 'Center Fruit', 'Nestlé KitKat', 'Oreo'];

// A missing translation is a build error, never a silent English fallback.
export function validateCopy() {
  function compare(reference, value, path) {
    if (typeof reference === 'string') {
      if (typeof value !== 'string' || !value.trim()) throw new Error(`Missing translation: ${path}`);
      return;
    }
    if (!value || Array.isArray(reference) !== Array.isArray(value) || Object.keys(reference).join('|') !== Object.keys(value).join('|')) throw new Error(`Translation shape mismatch: ${path}`);
    for (const key of Object.keys(reference)) compare(reference[key], value[key], `${path}.${key}`);
  }
  for (const [locale, copy] of Object.entries(translations)) compare(en, copy, locale);
}
