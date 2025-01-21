import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { ApiBase } from "~/utils/types";
import type { Product, ProductQuery } from "~/utils/types/product";
import { stringify } from "qs";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: new Set<Product>() || ([] as Array<Product>),
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
    async resetProducts() {
      this.products = new Set();
      this.totalElements = 0;
      this.totalPages = 0;
      this.status = "";
      this.error = null;
    },
    async fetchProducts(queryData: ProductQuery) {
      const queryString = stringify(queryData, {
        encode: false,
        indices: true,
        allowDots: false,
        arrayFormat: "comma", //sortList[0].sortDirection: DESC
        // arrayFormat: "repeat", //sortList.sortDirection: DESC
      });
      const { data, status, error } = await useAsyncData<ApiBase<Product>>(
        "products",
        () =>
          $fetch(`${this.baseURL}${urls.products}?${queryString}`, {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
            },
            // query: queryData,
          })
      );
      this.totalElements = data.value?.totalElements!;
      this.totalPages = data.value?.totalPages!;
      data.value?.content.forEach((item: Product) => {
        this.products.add(item);
      });
      this.status = status.value;
      this.error = error.value;
    },
  },
});
