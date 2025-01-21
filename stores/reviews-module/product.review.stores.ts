import {HeaderConfigs} from "@/utils/configs";
import {defineStore} from "pinia";
import urls from "@/utils/urls.json";
import {useRuntimeConfig} from "#app";
import type {ApiBase} from "~/utils/types";
import type {DeleteReview, Review, ReviewDetail} from "~/utils/types/reviews";

export const useReviewsStore = defineStore("reviews", {
    state: () => ({
        reviews: [] as Array<Review>,
        totalElements: 0 as number,
        totalPages: 0 as number,
        status: "" as string,
        error: null as null | Error,

        reviewed: {},
        reviewedStatus: "" as string,
        reviewedError: null as null | Error,

        deletedReviewed: {},
        deletedReviewedStatus: "" as string,
        deletedReviewedError: null as null | Error,

        detailReview: {} as ReviewDetail,
        detailReviewStatus: "" as string,
        detailReviewError: null as null | Error,
        baseURL: useRuntimeConfig().public.baseURL,
    }),
    getters: {
        getReviews: (state) => state.reviews,
        getTotalElements: (state) => state.totalElements,
        getTotalPages: (state) => state.totalPages,
        getStatus: (state) => state.status,

        getReviewed: (state) => state.reviewed,
        getReviewedStatus: (state) => state.reviewedStatus,
        getReviewedError: (state) => state.reviewedError,

        getReviewDetail: (state) => state.detailReview,
        getReviewDetailStatus: (state) => state.detailReviewStatus,
        getReviewDetailError: (state) => state.detailReviewError,

        getDeletedReviewedStatus: (state) => state.deletedReviewedStatus,
        getDeletedReviewedResult: (state) => state.deletedReviewed,
    },
    actions: {
        async resetReviews() {
            this.reviews = [] as Array<Review>;
            this.totalElements = 0;
            this.totalPages = 0;
            this.status = "";
            this.error = null;
        },
        async setReviewPhotos() {
            this.detailReview.photos = this.detailReview.photos.map((photo) => {
                return {
                    data: this.baseURL + "/" + photo.path,
                    id: photo.id,
                };
            });
        },
        async fetchReviews(queryData: any) {
            const {data, status, error} = await useAsyncData<ApiBase<Review>>(
                "reviews-list",
                () =>
                    $fetch(`${this.baseURL}${urls.reviews}`, {
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
            this.reviews = data.value?.content!;
            this.status = status.value;
            this.error = error.value;
        },
        async fetchReviewed(queryData: any) {
            const {data, status, error} = await useAsyncData<
                ApiBase<{
                    reviewed: boolean;
                }>
            >("reviewed", () =>
                $fetch(`${this.baseURL}${urls.reviewed}`, {
                    headers: {
                        ...HeaderConfigs({Authorization: useCookie("token").value || ""}),
                    },
                    query: queryData,
                    method: "POST",
                })
            );
            this.reviewed = data!.value!;
            this.reviewedStatus = status.value;
            this.reviewedError = error.value;
        },
        async fetchDeleteReview(queryData: any) {
            const {data, status, error} = await useAsyncData<DeleteReview>(
                "delete-review",
                () =>
                    $fetch(
                        `${this.baseURL}${parseUrl(urls.product_review, {
                            id: queryData,
                        })}`,
                        {
                            headers: {
                                ...HeaderConfigs({
                                    Authorization: useCookie("token").value || "",
                                }),
                            },
                            query: queryData,
                            method: "DELETE",
                        }
                    )
            );
            this.deletedReviewed = data!.value!;
            this.deletedReviewedStatus = status.value;
            this.deletedReviewedError = error.value;
        },
        async fetchDetailReview(queryData: any) {
            const {data, status, error} = await useAsyncData<ReviewDetail>(
                "detail-review",
                () =>
                    $fetch(
                        `${this.baseURL}${parseUrl(urls.product_review, {
                            id: queryData,
                        })}`,
                        {
                            headers: {
                                ...HeaderConfigs({
                                    Authorization: useCookie("token").value || "",
                                }),
                            },
                            query: queryData,
                            method: "GET",
                        }
                    )
            );
            this.detailReview = data!.value!;
            this.detailReviewStatus = status.value;
            this.detailReviewError = error.value;
        },
        async fetchProductReview(queryData: {sendFormData:any, productId:number}) {
            const {data, status, error} = await useAsyncData<
                ApiBase<{
                    reviewed: boolean;
                }>
            >("product-reviewed", () =>
                $fetch(`${this.baseURL}${urls.product_reviews}${queryData.productId}`, {
                    headers: {
                        ...HeaderConfigs({Authorization: useCookie("token").value || ""}),
                    },
                    body: {...queryData.sendFormData},
                    method: "PUT",
                })
            );
            this.reviewed = data!.value!;
            this.reviewedStatus = status.value;
            this.reviewedError = error.value;
        },
    },
});
