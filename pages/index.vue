<template>
  <div class="h-full min-h-screen w-full min-w-full">
    <section class="flex flex-row w-full px-6 xl:px-0 max-w-[1224px] container mx-auto">
      <div class="w-full relative overflow-hidden">
        <categories />
      </div>
    </section>

    <section v-if="useDiscountedProductsStore().getProducts.size > 0 && !checkSearch" class="my-9 bg-gray-50 py-6">
      <div class="flex flex-row w-full px-6 xl:px-0 max-w-[1224px] container mx-auto">
        <div class="flex w-full flex-col">
          <a-spin :spinning="useDiscountedProductsStore().getProductsStatus !== 'success'
            " size="large" wrapper-class-name="text-green-800">
            <div class="flex flex-row justify-between items-center mb-6">
              <div class="flex flex-row items-center justify-start text-[#16A34A] text-2xl font-bold">
                <span class="mr-4">{{ $t("discounted_products") }}</span>
                <span>%</span>
              </div>
              <h3
                class="inline-flex flex-row justify-center items-center w-auto text-gray-800 font-semibold text-base cursor-pointer"
                @click="allDiscountProducts">
                <span class="hidden md:block mr-2">
                  {{ $t("all_discounted_products") }}</span>
                <arrow-right-icon />
              </h3>
            </div>
            <products :products="useDiscountedProductsStore().getProducts" :link="'mehsullar'" :classGridSize="true" />
          </a-spin>
        </div>
      </div>
    </section>

    <section class="px-6 xl:px-0 max-w-[1224px] container mx-auto">
      <h2 class="text-gray-500 font-semibold text-base md:font-bold md:text-2xl mb-4 md:mb-6">
        <span v-if="!checkSearch"> {{ $t("recently_added") }} </span>
        <span v-else>
          {{ $t("search_results") }}: {{ useProductsStore().getTotalElements }}
        </span>
      </h2>
      <products :products="useProductsStore().getProducts" :link="'mehsullar'" :classGridSize="true" />
      <div class="block w-full min-w-full rounded text-center my-14" v-if="
        useProductsStore().getProducts.size !=
        useProductsStore().getTotalElements
      ">
        <button @click="loadMoreProducts"
          class="px-8 py-1 rounded text-amber-400 border border-amber-400 hover:text-white bg-white hover:bg-amber-400 text-sm font-semibold">
          {{ $t("more_products") }}
        </button>
      </div>
    </section>
    <section class="px-6 xl:px-0 max-w-[1224px] container mx-auto">
      <vipFarmerProducts class="mt-7 md:mt-11" :size="12" />
    </section>
    <section class="flex flex-col px-6 xl:px-0 w-full h-auto max-w-[1224px] container mx-auto mb-11">
      <div class="flex flex-row justify-between items-center w-full h-auto mb-6">
        <h2 class="text-gray-500 font-semibold text-base md:font-bold md:text-2xl">
          {{ $t("farmer_products") }}
        </h2>
        <h3 @click="allFarmerProducts"
          class="inline-flex flex-row justify-center items-center w-auto text-gray-800 font-semibold text-base cursor-pointer">
          <span class="mr-2 hidden md:inline-block">
            {{ $t("see_all_products") }}</span>
          <span class="mr-2 inline-block md:hidden">
            {{ $t("all_products") }}</span>
          <arrow-right-icon />
        </h3>
      </div>
      <div class="flex w-full flex-col">
        <a-spin :spinning="useFarmerProductsStore().getProductsStatus !== 'success'" size="large"
          wrapper-class-name="text-green-800">
          <products :classGridSize="true" :link="'fermer-mehsullari'" :products="useFarmerProductsStore().getProducts"
            v-if="useFarmerProductsStore().getProducts.size > 0" />
        </a-spin>
      </div>
    </section>
    <section class="my-11 flex flex-col px-6 xl:px-0 w-full h-auto max-w-[1224px] container mx-auto overflow-hidden">
      <banner />
    </section>
    <section class="flex flex-col px-6 xl:px-0 w-full h-auto max-w-[1224px] container mx-auto mb-11">
      <h2 class="text-gray-500 font-semibold text-base md:font-bold md:text-2xl mb-4 md:mb-6">
        {{ $t("best_sellers") }}
      </h2>
      <div class="flex w-full flex-col">
        <a-spin :spinning="useMostPurchasedProductsStore().getProductsStatus !== 'success'
          " size="large" wrapperClassName="text-green-800">
          <Products :classGridSize="true" :link="'mehsullar'" :products="useMostPurchasedProductsStore().getProducts"
            v-if="useMostPurchasedProductsStore().getProducts.size > 0" />
        </a-spin>
      </div>
      <div class="block w-full min-w-full rounded text-center my-14" v-if="
        useMostPurchasedProductsStore().getProducts.size !=
        useMostPurchasedProductsStore().getTotalElements
      ">
        <button @click="loadMoreMostPurchasedProducts"
          class="px-8 py-1 rounded text-amber-400 border border-amber-400 hover:text-white bg-white hover:bg-amber-400 text-sm font-semibold">
          {{ $t("more_products") }}
        </button>
      </div>
    </section>
    <section class="flex flex-col px-6 xl:px-0 w-full h-auto max-w-[1224px] container mx-auto mb-11">
      <store-list />
    </section>
  </div>
</template>
<script setup lang="ts">
// variables
const queryParams = reactive({
  page: useRoute().query.page ? Number(useRoute().query.page) : 0,
  size: useRoute().query.page ? (Number(useRoute().query.page) + 1) * 16 : 16,
  sortBy: "createdAt",
  sortDirection: "DESC",
});
const queryParamsMostPurchasedProducts = reactive({
  page: useRoute().query.mostPurchasedProductsPage
    ? Number(useRoute().query.mostPurchasedProductsPage)
    : 0,
  size: useRoute().query.mostPurchasedProductsPage
    ? (Number(useRoute().query.mostPurchasedProductsPage) + 1) * 8
    : 8,
  sortBy: "createdAt",
  sortDirection: "DESC",
});
definePageMeta({
  layout: "hero",
});
//computed
const checkSearch = computed(() => {
  if (useRoute().query) {
    return !!useRoute().query.searchText;
  }
  return false;
});
// methods
useProductsStore().resetProducts();
useDiscountedProductsStore().resetProducts();
useFarmerProductsStore().resetProducts();
useMostPurchasedProductsStore().resetProducts();

!checkSearch.value &&
  useDiscountedProductsStore().fetchProducts({
    ...queryParams,
    page: 0,
    size: 4,
    sortBy: "ecommerceDiscount",
  });
useProductsStore().fetchProducts({ ...queryParams, page: 0 });
useFarmerProductsStore().fetchProducts({ page: 0, size: 4 });
useMostPurchasedProductsStore().fetchProducts({
  ...queryParamsMostPurchasedProducts,
  page: 0,
});

const loadMoreProducts = function () {
  queryParams.page++;
  queryParams.size = 16;
  useRouter().push({ query: { ...useRoute().query, page: queryParams.page } });
};
const loadMoreMostPurchasedProducts = function () {
  queryParamsMostPurchasedProducts.page++;
  queryParamsMostPurchasedProducts.size = 8;
  useRouter().push({
    query: {
      ...useRoute().query,
      mostPurchasedProductsPage: queryParamsMostPurchasedProducts.page,
    },
  });
};
const allDiscountProducts = function () {
  useRouter().push({
    path: `mehsullar`,
    query: { endirimli: "beli", sortBy: "ecommerceDiscount" },
  });
};
const allFarmerProducts = function () {
  useRouter().push(`/mehsullar/kateqoriyalar/fermer-mehsullari`);
};
// watch
watch(queryParams, () => {
  useProductsStore().fetchProducts({ ...queryParams });
});

watch(
  () => useRoute().query.searchText,
  (to: any) => {
    useProductsStore().resetProducts();
    useProductsStore().fetchProducts({ ...queryParams, ...useRoute().query });
  },
  { flush: "pre", immediate: true, deep: true }
);

watch(queryParamsMostPurchasedProducts, () => {
  useMostPurchasedProductsStore().fetchProducts({
    ...queryParamsMostPurchasedProducts,
  });
});
</script>
<style></style>
