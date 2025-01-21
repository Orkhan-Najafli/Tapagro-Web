import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { ApiBase } from "~/utils/types";
import type { Product, ProductDetail } from "~/utils/types/product";
// import { stringify } from "qs";
import type { AddProductsFavorite, ProductID } from "~/utils/types/favorites";

export const useFavoriteProductsStore = defineStore("favorite-products", {
  state: () => ({
    favoriteProducts: new Set<Product>() || ([] as Array<Product>),
    totalElements: 0 as number,
    totalPages: 0 as number,
    status: "" as string,
    error: null as null | Error,
    favoriteProductIdsForCount: [] as Array<number>,
    favoriteProductIdList: [] as Array<number>,
    whenAllProductsAddToFavoriteStatus: "" as string,
    whenProductDeleteToFavoriteStatus: "" as string,
    whenProductAddToFavoriteStatus: "" as string,
    whenAllProductsAddToFavoriteError: null as null | Error,
    whenProductDeleteToFavoriteError: null as null | Error,
    whenProductAddToFavoriteError: null as null | Error,
    count: 0 as number,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getFavoriteProducts: (state) => state.favoriteProducts,
    getTotalElements: (state) => state.totalElements,
    getTotalPages: (state) => state.totalPages,
    getFavoriteProductsStatus: (state) => state.status,
    getDeleteProductFromFavoriteStatus:(state) =>state.whenProductDeleteToFavoriteStatus,
    getFavoriteProductIdsForCount: (state) => {
      return [...state.favoriteProductIdsForCount];
    },
    getFavoriteProductIds: (state) => {
      return [...state.favoriteProductIdList];
    },
    getCount: (state) => {
      return state.count;
    },
  },
  actions: {
    // async deleteProductInFavorites(id:number) {
    //   for (const product of this.favoriteProducts) {
    //     if (product.id === id) {
    //       this.favoriteProducts.delete(product)
    //       break
    //     }
    //   }
    // },
    async resetProducts() {
      this.favoriteProducts = new Set();
      this.totalElements = 0;
      this.totalPages = 0;
      this.status = "";
      this.error = null;
    },
    async fetchAllSelectedProductsAddToFavorite(
      queryData?: AddProductsFavorite
    ) {
      const { data, status, error } = await useAsyncData<never>(
        "add-products-favorite-post",
        () =>
          $fetch(`${this.baseURL}${urls.favorites_add_products}`, {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
            },
            body: queryData,
            method: "POST",
          })
      );
      this.whenAllProductsAddToFavoriteStatus = status.value;
      this.whenAllProductsAddToFavoriteError = error.value;
    },
    async fetchProductAddToFavorite(queryData?: ProductID) {
      const { data, status, error } = await useAsyncData<never>(
        "add-product-favorite-post",
        () =>
          $fetch(`${this.baseURL}${urls.add_product_to_favorite}`, {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
            },
            body: queryData,
            method: "POST",
          })
      );
      this.whenProductAddToFavoriteStatus = status.value;
      this.whenProductAddToFavoriteError = error.value;
    },
    async fetchProductDeleteToFavorite(queryData?: ProductID) {
      const { data, status, error } = await useAsyncData<never>(
        "add-product-favorite-post",
        () =>
          $fetch(`${this.baseURL}${urls.remove_product_to_favorite}`, {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
            },
            body: queryData,
            method: "POST",
          })
      );
      this.whenProductDeleteToFavoriteStatus = status.value;
      this.whenProductDeleteToFavoriteError = error.value;
    },
    async fetchFavoriteProducts(queryData: any) {
      const { data, status, error } = await useAsyncData<ApiBase<Product>>(
        "favorite-product-list",
        () =>
          $fetch(`${this.baseURL}${urls.favorites}`, {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
            },
            query: queryData,
          })
      );
      this.totalElements = data.value?.totalElements!;
      data.value?.content.forEach((item: Product) => {
        this.favoriteProducts.add(item);
      });
      this.totalPages = data.value?.totalPages!;
      this.status = status.value;
      this.error = error.value;
    },
    async fetchFavoriteCount() {
      const { data, status, error } = await useAsyncData<number>(
        "favorite-product-count",
        () =>
          $fetch(`${this.baseURL}${urls.favorite_count}`, {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
            },
          })
      );
      this.count = data.value!;
    },
  },
});
