import i18next from 'i18next';

const LANG_URL_PARAM = 'lng';

export const LanguageOptions = {
  ENGLISH: 'en',
  WELSH: 'cy',
};

export const loadLanguageResource = (lang, namespace, resource) => {
  i18next.addResourceBundle(lang, namespace, resource, true, false);
};

export const i18nUrl = (url, langauge) => {
  const i18nUrlObj = new URL(url);
  i18nUrlObj.searchParams.append(LANG_URL_PARAM, langauge);
  return i18nUrlObj.toString();
};
