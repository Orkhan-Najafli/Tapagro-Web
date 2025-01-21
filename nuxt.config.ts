// https://nuxt.com/docs/api/configuration/nuxt-config

const envFile = `.env.${process.env.NODE_NUXT_PUBLIC_BASE_URL || "staging"}`;
require("dotenv").config({ path: envFile });
export default defineNuxtConfig({
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  runtimeConfig: {
    public: {
      baseURL:
        process.env.NUXT_PUBLIC_BASE_URL ||
        "https://api-staging.tapagro.az/tapagro/api",
      RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    },
  },
  app: {
    buildAssetsDir: "/",
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/assets/img/fav-light-mod.svg",
          media: "(prefers-color-scheme: light)",
        },
        {
          rel: "icon",
          type: "image/png",
          href: "/assets/img/fav-dark-mod.svg",
          media: "(prefers-color-scheme: dark)",
        },
      ],
      // script: [
      //   {
      //     src: "https://www.google.com/recaptcha/api.js",
      //     async: true,
      //     defer: true,
      //   },
      // ],
    },
  },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@ant-design-vue/nuxt",
    // "@ant-design-vue/nuxt",
    "@vee-validate/nuxt",
    "@nuxtjs/sitemap",
    "@nuxtjs/seo",
  ],
  compatibilityDate: "2024-04-03",
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: [
    {
      path: "@/components",
      pathPrefix: false,
    },
  ],
  devServer: {
    host: "127.0.0.1", // or '0.0.0.0' for external access
    port: 4572, // specify the port you want to use
  },
  site: {
    url: "https://tapagro.az",
    name: "Tapagro",
    trailingSlash: false,
    i18n: true,
    // cacheMaxAgeSeconds: 14400, // 4 hour
    // description: "Welcome to Tapagro site!",
    // defaultLocale: "az",
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "[name]-[hash].js", // Dosya adında "/" karakteri kullanmayın
        },
      },
    },
    // resolve: {
    //   dedupe: ["vue"], // Prevent conflicting Vue versions
    // },
    // optimizeDeps: {
    //   include: ["vue3-recaptcha-v2"],
    // },
  },
  // build: {
  //   transpile: ["vue-recaptcha"], // Ensure the package gets transpiled
  // },
});
