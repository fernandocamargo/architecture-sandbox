const { default: manager } = require("react-intl-translations-manager");

module.exports = manager({
  messagesDirectory: "src/i18n",
  translationsDirectory: "src/i18n/translations/",
  languages: ["en", "de", "pt"]
});
