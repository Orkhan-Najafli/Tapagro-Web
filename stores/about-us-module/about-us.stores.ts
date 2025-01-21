import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { AboutUs } from "~/utils/types/about";

export const useAboutStore = defineStore("about-us", {
  state: () => ({
    sections: [] as Array<AboutUs>,
    status: "" as string,
    error: null as null | Error,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getSections: (state) => state.sections,
    getStatus: (state) => state.status,
  },
  actions: {
    async fetchSections(queryData?: any) {
      const { data, status, error } = await useAsyncData<Array<AboutUs>>(
        "about",
        () =>
          $fetch(`${this.baseURL}${urls.about_us_sections}`, {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
            },
            query: queryData,
          })
      );
      this.sections = data.value as Array<AboutUs>;
      this.status = status.value;
      this.error = error.value;
    },
  },
});
