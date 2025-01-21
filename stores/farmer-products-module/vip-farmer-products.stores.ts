import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { ApiBase } from "~/utils/types";
import type { FarmerProduct, QueryParams } from "~/utils/types/farmer-product";
import { stringify, parse } from "qs";
export const useVipFarmerProductsStore = defineStore("vip-farmer-products", {
  state: () => ({
    vipProducts: new Set<FarmerProduct>() || ([] as Array<FarmerProduct>),
    vipProductsTotalElements: 0 as number,
    vipProductsTotalPages: 0 as number,
    vipProductsStatus: "" as string,
    vipProductsError: null as null | Error,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getVipProducts: (state) => state.vipProducts,
    getVipProductsTotalElements: (state) => state.vipProductsTotalElements,
    getVipProductsTotalPages: (state) => state.vipProductsTotalPages,
    getVipProductsProductsStatus: (state) => state.vipProductsStatus,
  },
  actions: {
    resetVipProducts() {
      this.vipProducts = new Set();
      this.vipProductsTotalElements = 0;
      this.vipProductsTotalPages = 0;
      this.vipProductsStatus = "";
      this.vipProductsError = null;
    },
    async fetchVipProducts(queryData: QueryParams) {
      const queryString = stringify(queryData, {
        encode: false,
        indices: true,
        allowDots: true,
        // arrayFormat: "indices", //sortList[0].sortDirection: DESC
        arrayFormat: "repeat", //sortList.sortDirection: DESC
      });

      const { data, status, error } = await useAsyncData<
        ApiBase<FarmerProduct>
      >("vip-farmer-products", () =>
        $fetch(`${this.baseURL}${urls["farmer-products"]}?${queryString}`, {
          headers: {
            ...HeaderConfigs({ Authorization: useCookie("token").value || "" }),
          },
        })
      );
      this.vipProductsTotalElements = data.value?.totalElements!;
      this.vipProductsTotalPages = data.value?.totalPages!;
      data.value?.content.forEach((item: FarmerProduct) => {
        this.vipProducts.add(item);
      });
      this.vipProductsStatus = status.value;
      this.vipProductsError = error.value;
    },
  },
});
