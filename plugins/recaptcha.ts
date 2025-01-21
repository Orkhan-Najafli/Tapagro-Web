import { VueReCaptcha } from 'vue-recaptcha-v3';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey: config.public.RECAPTCHA_SITE_KEY,
    loaderOptions: {
      autoHideBadge: true, // Automatically hide the reCAPTCHA badge
      useRecaptchaNet: true,
      renderParameters: {
        hl: 'en', // Language code; adjust as needed
      },
    },
  });
});
