import { describe, it, expect } from 'vitest';
import { translations, type Language, type TranslationKey } from '../lib/translations';

function isRecordOfStrings(obj: unknown): obj is Record<string, string> {
  if (!obj || typeof obj !== 'object') return false;
  for (const v of Object.values(obj as Record<string, unknown>)) {
    if (typeof v !== 'string') return false;
  }
  return true;
}

describe('translations', () => {
  it('contains both en and de locales', () => {
    expect(Object.keys(translations).sort()).toEqual(['de', 'en']);
  });

  it('has identical keys across locales (including healthBenefits)', () => {
    const enKeys = Object.keys(translations.en).sort();
    const deKeys = Object.keys(translations.de).sort();
    expect(deKeys).toEqual(enKeys);
    expect(enKeys).toContain('healthBenefits');
  });

  it('values are strings', () => {
    expect(isRecordOfStrings(translations.en)).toBe(true);
    expect(isRecordOfStrings(translations.de)).toBe(true);
  });

  it('Language and TranslationKey types reflect the data shape', () => {
    const lang: Language = 'en';
    const key: TranslationKey = 'appTitle';
    expect(typeof translations[lang][key]).toBe('string');
  });
});
