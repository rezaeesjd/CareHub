import { en } from './en';
import { it } from './it';
import type { Dictionary } from './en';
import type { Lang } from '../config/site';

const dictionaries: Record<Lang, Dictionary> = { en, it };

/** Get the reviewed content dictionary for a language. */
export function useTranslations(lang: Lang): Dictionary {
  return dictionaries[lang];
}

export type { Dictionary };
