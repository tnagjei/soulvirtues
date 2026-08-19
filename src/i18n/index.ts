// input: Locale identifier string
// output: Exported translation dictionaries and locale routing helpers
// pos: src/i18n/index.ts (更新规则：文件变更需同步本注释与所属目录 README)

import type { Translations, Locale } from './types';
import { enTranslations } from './en';
import { jaTranslations } from './ja';
import { esTranslations } from './es';
import { ptTranslations } from './pt';

export const locales = ['en', 'ja', 'es', 'pt'] as const;
export type { Locale };
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, { name: string; flag: string }> = {
  en: { name: 'English', flag: 'EN' },
  ja: { name: '日本語', flag: 'JA' },
  es: { name: 'Español', flag: 'ES' },
  pt: { name: 'Português', flag: 'PT' },
};

export const translationsMap: Record<Locale, Translations> = {
  en: enTranslations,
  ja: jaTranslations,
  es: esTranslations,
  pt: ptTranslations,
};

export function getTranslations(locale?: string): Translations {
  if (locale && locale in translationsMap) {
    return translationsMap[locale as Locale];
  }
  return enTranslations;
}

export function getLocalePath(path: string, targetLocale: Locale): string {
  const cleanPath = path.replace(/^\/(ja|es|pt)(\/|$)/, '/');
  if (targetLocale === 'en') {
    return cleanPath === '' ? '/' : cleanPath;
  }
  return cleanPath === '/' ? `/${targetLocale}/` : `/${targetLocale}${cleanPath}`;
}

export * from './types';

