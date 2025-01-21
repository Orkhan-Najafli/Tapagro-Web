import { HeaderConfigs, parseUrl } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type {
  Categories,
  CategoriesProductType,
} from "~/utils/types/categories";

export const useProductTypesStore = defineStore("types", {
  state: () => ({
    productTypes: [] as Array<CategoriesProductType>,
    status: "" as string,
    error: null as null | Error,

    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getProductTypes: (state) => state.productTypes,
    getStatus: (state) => state.status,
    getError: (state) => state.error,
  },
  actions: {
    resetProductTypes() {
      this.productTypes = [];
      this.status = "";
      this.error = null;
    },
    async fetchProductTypes(
      baseCategoryId: number = 4,
      categoryId: number,
      checked?: boolean
    ) {
      const { data, status, error } = await useAsyncData<
        CategoriesProductType[]
      >("product-types", () =>
        $fetch(
          `${this.baseURL}${parseUrl(urls["product-types"], {
            baseCategoryId: baseCategoryId,
            categoryId: categoryId,
          })}`,

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

      this.productTypes = data!.value!.map((type) => {
        return {
          ...type,
          hide: false,
          checked: false,
        };
      });

      this.status = status!.value;
      this.error = error!.value;
    },
  },
});
