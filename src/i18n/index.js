import { addLocaleData } from "react-intl";

import * as locales from "./locales";

export const languages = ["en", "de", "pt"];

export const [locale] = ["en"] || String(window.navigator.language).split("-");

export const extractLocale = (stack, language) =>
  stack.concat([...locales[language]]);

export default addLocaleData(languages.reduce(extractLocale, []));
