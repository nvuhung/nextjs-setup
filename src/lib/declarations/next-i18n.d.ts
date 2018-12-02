export interface NextI18n {
  config: {
    defaultLanguage: string;
    otherLanguages: string[];
    fallbackLng: string;
    load: string;
    localePath: string;
    localeStructure: string;
    localeSubpaths: boolean;
    ns: string[];
    defaultNS: string;
    interpolation: {
      escapeValue: boolean;
      formatSeparator: string;
      format: [Function];
    };
    detection: {
      order: any[];
      caches: any[];
      lookupQuerystring: string;
      lookupCookie: string;
      lookupSession: string;
      lookupFromPathIndex: number;
    };
    backend: { loadPath: string; addPath: string };
    react: { wait: boolean };
    allLanguages: string[];
    preload: string[];
  };
  i18n: I18n;
  appWithTranslation: Function;
  nextI18NextMiddleware: Function;
  withNamespaces: Function;
}
