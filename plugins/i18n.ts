import { createI18n } from "vue-i18n";
import AZE from "../locales/az-AZ";
import ENG from "../locales/en-US";
import RUS from "../locales/ru-RU";

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "AZE",
    messages: {
      AZE,
      ENG,
      RUS,
    },
  });

  vueApp.use(i18n);
});
