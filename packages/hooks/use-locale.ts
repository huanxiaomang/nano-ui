import { Ref, computed, isRef, ref, unref } from 'vue';
import { get } from 'lodash-unified';
import { Language } from '@nano-ui/locale';
import English from '@nano-ui/locale/lang/en';
import type { MaybeRef } from '@vueuse/core';

export type TranslatorOption = Record<string, string | number>;
export type Translator = (path: string, option?: TranslatorOption) => string;
export type LocaleContext = {
  locale: Ref<Language>;
  lang: Ref<string>;
  t: Translator;
};

export const translate = (
  path: string,
  option: TranslatorOption | undefined,
  locale: Language
): string =>
  get(locale, path, path).replace(
    /\{(\w+)\}/g,
    (_, key) => `${option?.[key] ?? `{${key}}`}`
  );

export const buildTranslator =
  (locale: MaybeRef<Language>): Translator =>
  (path, options) =>
    translate(path, options, unref(locale));

export const buildLocaleContext = (
  locale: MaybeRef<Language>
): LocaleContext => {
  const lang = computed(() => unref(locale).name);
  const localeRef = isRef(locale) ? locale : ref(locale);
  return {
    lang,
    locale: localeRef,
    t: buildTranslator(locale),
  };
};

export const useLocale = (localeOverrides?: Ref<Language | undefined>) => {
  return buildLocaleContext(computed(() => localeOverrides?.value || English));
};
