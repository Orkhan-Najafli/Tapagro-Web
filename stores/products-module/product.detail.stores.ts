import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { ProductDetail } from "~/utils/types/product";

export const useProductDetailStore = defineStore("product-detail", {
  state: () => ({
    product: {} as ProductDetail,
    products: new Set<ProductDetail>() || ([] as Array<ProductDetail>),
    status: "" as string,
    error: null as null | Error,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getProduct: (state) => state.product,
    getProducts: (state) => state.products,
    getProductStatus: (state) => state.status,
  },
  actions: {
    resetProducts(){
      this.products = new Set()
      this.status = ""
      this.error = null
    },
    resetProduct() {
      this.product = {} as ProductDetail;
      this.status = "";
      this.error = null;
    },
    async fetchProduct(productId: number) {
      const { data, status, error } = await useAsyncData<ProductDetail>(
        `product-${productId}`,
        () =>
          $fetch(`${this.baseURL}${urls.products}/${productId}`, {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
            },
          })
      );

      // Add to products if needed
      this.products.add(data.value!);
      // Only update the current product when needed (if you are fetching product details for display)
      if (this.product.id !== productId) {
        this.product = data.value!;
      }
      this.status = status.value;
      this.error = error.value;
    },
  },
});
