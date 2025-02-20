import { Ref, computed, isRef, ref, unref } from 'vue';
import { get } from 'lodash-unified';
import { Language } from '@nano-ui/locale';
import English from '@nano-ui/locale/lang/en';
import { useGlobalConfig } from '../components/config-provider/hooks/use-global-config';
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
): string => {
  const text = (get(locale.el, path, path) as string).replace(
    /\{(\w+)\}/g,
    (_, key) => `${option?.[key] ?? `{${key}}`}`
  );
  return text;
};

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

export const useLocale = (
  isUseGlobalConfig = true,
  localeOverrides?: Ref<Language | undefined> | undefined
) => {
  localeOverrides = isUseGlobalConfig
    ? localeOverrides ?? ref(useGlobalConfig().value?.locale) ?? undefined
    : localeOverrides;
  return buildLocaleContext(computed(() => localeOverrides?.value || English));
};
