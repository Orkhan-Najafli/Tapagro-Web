import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { ApiBase } from "~/utils/types";
import type { Product, ProductQuery } from "~/utils/types/product";

export const useDiscountedProductsStore = defineStore("discountedProducts", {
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
    resetProducts() {
      this.products = new Set();
      this.totalElements = 0;
      this.totalPages = 0;
      this.status = "";
      this.error = null;
    },
    async fetchProducts(queryData: ProductQuery) {
      const { data, status, error } = await useAsyncData<ApiBase<Product>>(
        "discounted-products",
        () =>
          $fetch(`${this.baseURL}${urls.products}`, {
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
      data.value?.content.forEach((item: Product) => {
        this.products.add(item);
      });
      this.status = status.value;
      this.error = error.value;
    },
  },
});
