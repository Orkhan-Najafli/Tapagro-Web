import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { ApiBase } from "~/utils/types";
import type { Store, QueryParams } from "~/utils/types/stores.ts";

export const useStoresStore = defineStore("stores", {
  state: () => ({
    stores: new Set<Store>() || ([] as Array<Store>),
    totalElements: 0 as number,
    totalPages: 0 as number,
    status: "" as string,
    error: null as null | Error,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getStores: (state) => state.stores,
    getTotalElements: (state) => state.totalElements,
    getTotalPages: (state) => state.totalPages,
    getStoresStatus: (state) => state.status,
  },
  actions: {
    resetStores() {
      this.stores = new Set();
      this.totalElements = 0;
      this.totalPages = 0;
      this.status = "";
      this.error = null;
    },
    async fetchStores(queryData: QueryParams) {
      const { data, status, error } = await useAsyncData<ApiBase<Store>>(
        "stores",
        () =>
          $fetch(`${this.baseURL}${urls.stores}`, {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
            },
            query: queryData,
          })
      );
      this.totalElements = data.value?.totalElements!;
      this.totalPages = data.value?.totalPages!;
      data.value?.content.forEach((item: Store) => {
        this.stores.add(item);
      });
      this.status = status.value;
      this.error = error.value;
    },
  },
});
