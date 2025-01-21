import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { ApiBase } from "~/utils/types";
import type {FarmerProduct, QueryParams} from "~/utils/types/farmer-product";
import { stringify } from "qs";
export const useFarmerProductsStore = defineStore("farmer-products", {
  state: () => ({
    products: new Set<FarmerProduct>() || ([] as Array<FarmerProduct>),
    totalElements: 0 as number,
    totalPages: 0 as number,
    status: "" as string,
    error: null as null | Error,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getProducts: (state) => state.products,
    getTotalElements: (state) => state.totalElements,
    getTotalPages: (state) => state.totalPages,
    getProductsStatus: (state) => state.status,
  },
  actions: {
    resetProducts() {
      this.products = new Set();
      this.totalElements = 0;
      this.totalPages = 0;
      this.status = "";
      this.error = null;
    },
    async fetchProducts(queryData: QueryParams) {
      const queryString = stringify(queryData, {
        encode: true,
        indices: false,
        allowDots: true,
        arrayFormat: "indices", //sortList[0].sortDirection: DESC
        // arrayFormat: "repeat", //sortList.sortDirection: DESC
      });
      const { data, status, error } = await useAsyncData<
        ApiBase<FarmerProduct>
      >("farmer-products", () =>
        $fetch(`${this.baseURL}${urls["farmer-products"]}?${queryString}`, {
          headers: {
            ...HeaderConfigs({ Authorization: useCookie("token").value || "" }),
          },
        })
      );
      this.totalElements = data.value?.totalElements!;
      this.totalPages = data.value?.totalPages!;
      data.value?.content.forEach((item: FarmerProduct) => {
        this.products.add(item);
      });
      this.status = status.value;
      this.error = error.value;
    },
  },
});
