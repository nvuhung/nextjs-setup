import { Configs } from "./lib/configs";
import { NextI18n } from "./lib/declarations/next-i18n";

// tslint:disable-next-line:no-var-requires
const NextI18Next = require("next-i18next").default;

const I18n: NextI18n = new NextI18Next({
  defaultLanguage: Configs.defaultLanguage,
  otherLanguages: ["en"],
  defaultNS: Configs.defaultLocaleNS,
  localePath: "src/static/locales",
});

const config = I18n.config;
const i18n = I18n.i18n;
const appWithTranslation = I18n.appWithTranslation;
const nextI18NextMiddleware = I18n.nextI18NextMiddleware;
const withNamespaces = I18n.withNamespaces;

export {
  config,
  i18n,
  appWithTranslation,
  nextI18NextMiddleware,
  withNamespaces,
};
