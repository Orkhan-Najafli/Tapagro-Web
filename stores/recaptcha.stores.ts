import { HeaderConfigs } from "@/utils/configs";
// import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";

export const useRecaptchaStore = defineStore("Recaptcha", {
  state: () => ({
    status: "" as string,
    error: null as null | Error,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getStatus: (state) => state.status,
  },
  actions: {
    async fetchRecaptcha(queryData?: any) {
      const { data, status, error } = await useAsyncData<any>("join-us", () =>
        $fetch(`${this.baseURL}${urls.google_recaptcha_siteverify}`, {
          headers: {
            ...HeaderConfigs({
              Authorization: useCookie("token").value || "",
            }),
          },
          query: queryData,
        })
      );
      this.status = status.value;
      this.error = error.value;
    },
  },
});
