import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { Banner, QueryParams } from "~/utils/types/banner";

export const useBannerStore = defineStore("banner", {
  state: () => ({
    banner: {} as Banner,
    status: "" as string,
    error: null as null | Error,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getBanner: (state) => state.banner,
    getBannerStatus: (state) => state.status,
  },
  actions: {
    async fetchBanner(queryData?: QueryParams) {
      const { data, status, error } = await useAsyncData<Banner>("banner", () =>
        $fetch(`${this.baseURL}${urls.banner}`, {
          headers: {
            ...HeaderConfigs({ Authorization: useCookie("token").value || "" }),
          },
          query: queryData,
        })
      );
      this.banner = data.value as Banner;
      this.status = status.value;
      this.error = error.value;
      useCookie("bannerID").value = data.value?.id as string;
    },
  },
});
