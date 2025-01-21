import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { ComparisonCount } from "~/utils/types/comparison";

export const useComparisonBasketsStore = defineStore("comparison-baskets", {
  state: () => ({
    comparisonBasketsCount: undefined as undefined | ComparisonCount,
    comparisonBasketCountStatus: "" as string,
    comparisonBasketCountError: null as null | Error,
    comparisonCount: undefined as number | undefined | ComparisonCount,
    comparisonCountStatus: "" as string,
    comparisonCountError: null as null | Error,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getComparisonBasketsCount: (state) => state.comparisonBasketsCount,
    getComparisonCount: (state) => state.comparisonCount,
  },
  actions: {
    async fetchComparisonBasketsCount() {
      const { data, status, error } = await useAsyncData(
        "ComparisonBasketsCount",
        () =>
          $fetch(`${this.baseURL}${urls["comparison-baskets-count"]}`, {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
            },
            method: "GET",
          })
      );

      this.comparisonBasketsCount = data.value as ComparisonCount;
      this.comparisonBasketCountStatus = status.value;
      this.comparisonBasketCountError = error.value;
    },
    async fetchComparisonCount() {
      const { data, status, error } = await useAsyncData(
        "ComparisonCount",
        () =>
          $fetch(`${this.baseURL}${urls["comparison-count"]}`, {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
            },
            method: "GET",
          })
      );

      this.comparisonCount = data.value as ComparisonCount;
      this.comparisonCountStatus = status.value;
      this.comparisonCountError = error.value;
    },
  },
});
