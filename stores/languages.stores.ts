import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { Language } from "~/utils/types/language";

export const useLanguagesStore = defineStore("languages", {
  state: () => ({
    languages: [] as Array<Language>,
    status: "",
    error: null as null | Error,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getLanguages: (state) => state.languages,
  },
  actions: {
    async fetchLanguages() {
      const { data, status, error } = await useAsyncData<Language[]>(
        "languages",
        () =>
          $fetch(
            `${this.baseURL}${urls.languages}`,

            {
              headers: {
                ...HeaderConfigs({
                  Authorization: useCookie("token").value || "",
                }),
              },
              method: "GET",
            }
          )
      );
      this.languages = data!.value!;
      this.status = status.value;
      this.error = error?.value;
    },
  },
});
