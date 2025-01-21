import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { ApiBase } from "~/utils/types";
import type {
  Review,
  ReviewSummary,
  ProductReview,
} from "~/utils/types/reviews";

export const usePublicReviewsStore = defineStore("public-reviews", {
  state: () => ({
    reviewSummary: [] as ReviewSummary[],
    reviewSummaryStatus: "" as string,
    reviewSummaryError: null as null | Error,

    productReviews: [] as Array<ProductReview>,
    productReviewStatus: "" as string,
    productReviewError: null as null | Error,
    totalElements: 0 as number,
    totalPages: 0 as number,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getReviews: (state) => state.reviewSummary,
    getReviewsStatus: (state) => state.reviewSummaryStatus,

    getProductReviews: (state) => state.productReviews,
    getProductReviewTotalElements: (state) => state.totalElements,
    getProductReviewTotalPages: (state) => state.totalPages,
    getProductReviewsStatus: (state) => state.productReviewStatus,
  },
  actions: {
    async resetReviews() {
      this.reviewSummary = [];
      this.totalElements = 0;
      this.totalPages = 0;
      this.reviewSummaryStatus = "";
      this.reviewSummaryError = null;
    },
    async fetchReviewSummary(queryData: any) {
      const { data, status, error } = await useAsyncData<ReviewSummary>(
        "product-reviews",
        () =>
          $fetch(`${this.baseURL}${urls.product_reviews_summary}`, {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
            },
            query: queryData,
          })
      );
      this.reviewSummary = data.value?.reviews;
      this.reviewSummaryStatus = status.value;
      this.reviewSummaryError = error.value;
    },
    async fetchProductReviews(queryData: any) {
      const { data, status, error } = await useAsyncData<
        ApiBase<ProductReview>
      >("product-reviews", () =>
        $fetch(`${this.baseURL}${urls.public_product_reviews}`, {
          headers: {
            ...HeaderConfigs({ Authorization: useCookie("token").value || "" }),
          },
          query: queryData,
        })
      );

      this.productReviews = data!.value!.content;
      this.productReviewStatus = status.value;
      this.productReviewError = error.value;
    },
  },
});
