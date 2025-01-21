import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";

export const useCitiesStore = defineStore("cities", {
  state: () => ({
    cities: [] as Array<{ id: number; name: string }>,
    status: "",
    error: null as null | Error,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getCities: (state) => state.cities,
    getStatus: (state) => state.status,
    getError: (state) => state.error,
  },
  actions: {
    resetCities() {
      this.cities = [];
      this.status = "";
      this.error = null;
    },
    async fetchCities(queryParms?: string) {
      const { data, status, error } = await useAsyncData<
        { id: number; name: string }[]
      >("cities", () =>
        $fetch(
          `${this.baseURL}${urls.cities}`,

          {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
            },
            method: "GET",
            query: {
              cityNamePhrase: queryParms,
            },
          }
        )
      );

      this.cities = data!.value!;
      this.status = status.value;
      this.error = error?.value;
    },
  },
});
