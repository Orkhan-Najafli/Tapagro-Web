import {HeaderConfigs, parseUrl} from "@/utils/configs";
import {defineStore} from "pinia";
import urls from "@/utils/urls.json";
import {useRuntimeConfig} from "#app";
import type {QueryParams, Shopping} from "~/utils/types/shopping";

export const useShoppingStore = defineStore("shopping", {
    state: () => ({
        shoppingCarts: {} as Shopping,
        status: "" as string,
        error: null as null | Error,
        addShoppingCartStatus: "" as string,
        addShoppingCartError: null as null | Error,
        removeShoppingCartStatus: "" as string,
        removeShoppingCartError: null as null | Error,
        shoppingCartsCount: null as null | number,
        shoppingCartsCountStatus: "" as string,
        shoppingCartsCountError: null as null | Error,
        visible: false,
        baseURL: useRuntimeConfig().public.baseURL,
    }),
    getters: {
        getShoppingCarts: (state) => state.shoppingCarts,
        getStatus: (state) => state.status,
        getError: (state) => state.error,
        getAddShoppingCartStatus: (state) => state.addShoppingCartStatus,
        getAddShoppingCartError: (state) => state.addShoppingCartError,
        getRemoveShoppingCartStatus: (state) => state.removeShoppingCartStatus,
        getRemoveShoppingCartError: (state) => state.removeShoppingCartError,
        getShoppingVisible: (state) => state.visible,
        getShoppingCartsCount: (state) => state.shoppingCartsCount,
        getShoppingCartsCountStatus: (state) => state.shoppingCartsCountStatus,
    },
    actions: {
        setShoppingVisible(visible: boolean) {
            this.visible = visible;
        },
        async fetchShoppingCarts(queryData?: any) {
            const {data, status, error} = await useAsyncData<Shopping>(
                "shopping-carts",
                () =>
                    $fetch(`${this.baseURL}${urls.shopping_carts}`, {
                        headers: {
                            ...HeaderConfigs({
                                Authorization: useCookie("token").value || "",
                            }),
                        },
                        query: queryData,
                    })
            );
            let stockCheck = data.value?.items.map((item) => item.stockSufficient);
            let checkActive = data.value?.items.some(
                (item) => !item.product.isActive
            );
            this.shoppingCarts = {
                ...data.value,
                stockSufficientList: stockCheck,
                isActive: !checkActive,
            } as Shopping;
            this.status = status.value;
            this.error = error.value;
        },
        async fetchAddShoppingCart(queryData: QueryParams) {
            const {status, error} = await useAsyncData<unknown>(
                "add-shopping-product",
                () =>
                    $fetch(`${this.baseURL}${urls.shopping_carts}`, {
                        headers: {
                            ...HeaderConfigs({
                                Authorization: useCookie("token").value || "",
                            }),
                        },
                        body: {...queryData},
                        method: "POST",
                    })
            );
            this.addShoppingCartStatus = status.value;
            this.addShoppingCartError = error.value;
            this.fetchShoppingCartsCount();
            this.fetchShoppingCarts();
        },
        async fetchRemoveShoppingCart(queryData: number) {
            const {status, error} = await useAsyncData<unknown>(
                "remove-shopping-carts",
                () =>
                    $fetch(
                        `${this.baseURL}${parseUrl(urls.remove_shopping_cart, {
                            productId: queryData,
                        })}`,
                        {
                            headers: {
                                ...HeaderConfigs({
                                    Authorization: useCookie("token").value || "",
                                }),
                            },
                            // query: { queryData },
                            method: "DELETE",
                        }
                    )
            );
            this.removeShoppingCartStatus = status.value;
            this.removeShoppingCartError = error.value;
            this.fetchShoppingCartsCount();
            this.fetchShoppingCarts();
        },
        async fetchShoppingCartsCount() {
            const {data, status, error} = await useAsyncData<number>(
                "shopping-carts-count",
                () =>
                    $fetch(`${this.baseURL}${urls.shopping_carts_count}`, {
                        headers: {
                            ...HeaderConfigs({
                                Authorization: useCookie("token").value || "",
                            }),
                        },
                        method: "GET",
                    })
            );
            this.shoppingCartsCount = data.value;
            this.shoppingCartsCountStatus = status.value;
            this.shoppingCartsCountError = error.value;
        },
    },
});
