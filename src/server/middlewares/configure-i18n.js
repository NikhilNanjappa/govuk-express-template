import i18next from "i18next";
import Backend from "i18next-fs-backend";
import i18nextMiddleware from "i18next-http-middleware";

const configureI18n = () => {
  i18next
    .use(i18nextMiddleware.LanguageDetector)
    .use(Backend)
    .init({
      resources: {},
      detection: {
        order: ["querystring", "cookie"],
        caches: ["cookie"],
        lookupCookie: "lang",
      },
      preload: ["en", "cy"],
      fallbackLng: "en",
      supportedLngs: ["en", "cy"],
    });

  return i18nextMiddleware.handle(i18next);
};

export { configureI18n as default };
