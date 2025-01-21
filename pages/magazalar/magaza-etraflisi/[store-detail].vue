<template>
  <div class="pt-3 min-h-screen">
    <section class="flex max-w-[1224px] w-full px-6 xl:px-0 container mx-auto">
      <div class="mt-6 mb-5 md:mb-9 hidden md:block">
        <a-breadcrumb class="font-medium text-sm text-gray-500" separator=">">
          <a-breadcrumb-item>
            <span class="text-[#4B5563] text-sm font-medium">
              <nuxt-link tag="a" to="/">{{ $t("main_page") }}</nuxt-link></span
            >
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <span class="text-[#4B5563] text-sm font-medium">
              <nuxt-link tag="a" to="/magazalar">
                {{ $t("stores") }}</nuxt-link
              ></span
            >
          </a-breadcrumb-item>
          <span class="text-[#1F2937] font-semibold text-sm">
            <a-breadcrumb-item>
              {{ $t("detailed_view_of_the_store") }}</a-breadcrumb-item
            >
          </span>
        </a-breadcrumb>
      </div>
    </section>
    <section class="flex max-w-[1224px] w-full px-6 xl:px-0 container mx-auto">
      <div class="flex flex-row w-full mb-6 md:mb-10 pt-4 md:pt-0">
        <!-- <Advertising /> -->
        <div class="w-full relative">
          <section
            class="w-full h-auto bg-[#F9FAFBCC] pt-3 px-3 pb-5 mb-5 rounded-xl"
          >
            <a-skeleton
              :paragraph="false"
              :loading="useStoreDetailStore().getStatus !== 'success'"
              active
              class="text-2xl md:text-4xl lg:text-5xl"
            />

            <div
              v-if="useStoreDetailStore().getStatus === 'success'"
              class="flex flex-col justify-start"
            >
              <div class="flex justify-start items-center">
                <span
                  class="w-14 h-14 p-2 bg-[#F0FDF4] rounded-full flex justify-center items-center"
                >
                  <img
                    :src="`${baseURL}/${
                      useStoreDetailStore().getStore.logoPath
                    }`"
                    @error="setDefaultStoreImage"
                    :alt="useStoreDetailStore().getStore.name"
                  />
                </span>

                <h2 class="text-[#374151] font-medium text-lg m-0 p-0 ml-2">
                  {{ useStoreDetailStore().getStore.name }}
                </h2>
              </div>
              <ul
                class="flex flex-col lg:flex-row justify-start items-start lg:items-center m-0 p-0 pl-3 mt-6 lg:mt-3"
              >
                <li
                  class="flex flex-row justify-start items-center font-normal text-base text-[#6B7280] p-0 m-0 mb-4 lg:mb-0 lg:mr-11"
                >
                  <email-icon />
                  <span class="ml-2.5">{{
                    useStoreDetailStore().getStore.email
                  }}</span>
                </li>
                <li
                  class="flex flex-row flex-shrink-0 justify-start items-center font-normal text-base text-[#6B7280] p-0 m-0 mb-4 lg:mb-0 lg:mr-11"
                >
                  <phone-in-store-detail-icon />
                  <span class="ml-2.5">{{
                    formatPhoneNumber(
                      useStoreDetailStore().getStore.phoneNumber
                    )
                  }}</span>
                </li>
                <li
                  v-if="useStoreDetailStore().getStore.website"
                  class="flex flex-row justify-start font-normal text-base text-[#6B7280] items-center p-0 m-0 mb-4 lg:mb-0 lg:mr-11"
                >
                  <a-icon type="global" class="" />
                  <a
                    class="text-[#6B7280] ml-2.5"
                    :href="`http://${useStoreDetailStore().getStore.website}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    >{{ useStoreDetailStore().getStore.website }}</a
                  >
                </li>
                <li
                  class="flex flex-row justify-start font-normal text-base text-[#6B7280] items-center p-0 m-0 lg:mr-11"
                >
                  <a-icon type="environment" class="" />
                  <span class="ml-2.5">{{
                    useStoreDetailStore().getStore.legalAddress
                  }}</span>
                </li>
              </ul>
            </div>
          </section>
          <section class="mt-0.5">
            <a-config-provider
              :theme="{
                token: {
                  colorPrimary: '#16a34a',
                },
              }"
            >
              <a-input-search
                :placeholder="$t('product_name')"
                size="large"
                class="w-full min-w-full h-auto mb-6 md:mb-11"
                :maxLength="255"
                v-model:value="searchText"
                :allowClear="true"
                enter-button
                @change="onSearch"
                @keyup.enter="onSearch"
              >
              </a-input-search>
            </a-config-provider>
          </section>
          <section class="mb-6 md:mb-10">
            <div class="flex flex-col md:flex-row justify-between">
              <div class="w-auto pb-8 pr-6 hidden md:flex">
                <!-- <div class=""> -->
                <div class="min-w-[292px] max-w-[292px]">
                  <StoreDetailFilter
                    style="height: fit-content"
                    class="sticky top-28"
                    :deliveryCities="
                      useStoreDetailStore().getStore.deliveryCities
                    "
                  />
                </div>
                <!-- </div> -->
              </div>
              <div class="flex w-full flex-col m-0">
                <div class="flex flex-col mb-6">
                  <div class="flex flex-row justify-between w-full">
                    <div class="flex font-bold text-base text-gray-600">
                      {{ $t("products") }}
                      {{
                        useProductsStore().getProductsStatus === "success"
                          ? `: ${useProductsStore().getTotalElements}`
                          : ""
                      }}
                    </div>
                    <div class="flex flex-row justify-end items-center">
                      <a-tooltip placement="bottom">
                        <template #title>
                          <span>Filtr</span>
                        </template>
                        <div
                          @click="showFilterModal"
                          class="inline-flex items-center h-9 lg:hidden cursor-pointer mr-7"
                        >
                          <filter_logo class="" />
                        </div>
                      </a-tooltip>

                      <div class="flex flex-row justify-end">
                        <sorting />
                      </div>
                    </div>
                  </div>
                </div>
                <a-spin
                  :spinning="useProductsStore().getProductsStatus !== 'success'"
                  size="large"
                  wrapper-class-name="text-green-800"
                >
                  <products
                    :link="'mehsullar'"
                    :classGridSize="false"
                    :products="useProductsStore().getProducts"
                    v-if="useProductsStore().getProducts.size"
                  />
                </a-spin>

                <div
                  class="block w-full min-w-full rounded text-center my-14"
                  v-if="
                    useProductsStore().getProducts.size !==
                    useProductsStore().getTotalElements
                  "
                >
                  <button
                    :disabled="
                      useProductsStore().getProductsStatus !== 'success'
                    "
                    @click="loadMoreProducts"
                    class="px-8 py-1 rounded text-amber-400 border border-amber-400 hover:text-white bg-white hover:bg-amber-400 text-sm font-semibold"
                  >
                    {{ $t("more_products") }}
                  </button>
                </div>
                <div
                  v-else
                  class="block w-full min-w-full rounded text-center my-14"
                ></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
    <!-- <keep-alive> -->
    <store-detail-filter-mobile
      @handleOk="openMobileFilter = false"
      @handleCancel="openMobileFilter = false"
      v-if="openMobileFilter"
    />
    <!-- </keep-alive> -->
    <!-- <Page404
      v-else
      title="404"
      :subTitle="$t('no_store_matching_your_search_was_found')"
    /> -->
  </div>
</template>

<script setup lang="ts">
import { formatPhoneNumber } from "@/utils/helpers";

const baseURL = useRuntimeConfig().public.baseURL;
const searchText = ref();
const openMobileFilter = ref(false);
const showOrderMenu = ref(false);
const searchParams = reactive({
  sortBy: "createdAt",
  sortDirection: "DESC",
});

const convertSortBy = function (direction: string) {
  if (useRoute().query && useRoute().query.sortBy) {
    let item = new String(useRoute().query.sortBy)?.split("-");
    if (direction == "sortDirection") {
      return item[1] || searchParams.sortDirection;
    } else {
      return item[0] || searchParams.sortBy;
    }
  } else {
    if (direction == "sortDirection") {
      return searchParams.sortDirection;
    } else {
      return searchParams.sortBy;
    }
  }
};
const queryParams = reactive({
  page: useRoute().query.page ? Number(useRoute().query.page) : 0,
  size: useRoute().query.page ? (Number(useRoute().query.page) + 1) * 12 : 12,
});
useStoreDetailStore().fetchStore(Number(useRoute().params.storedetail));
useProductsStore().resetProducts();
useProductsStore().fetchProducts({
  ...queryParams,
  ...useRoute().query,
  page: 0,
  sortBy: convertSortBy("sortBy"),
  sortDirection: convertSortBy("sortDirection"),
  productTypeId: useProductDetailStore().getProduct?.productTypeId,
  isDiscounted: !!useRoute().query.endirimli || undefined,
  storeIds: Number(useRoute().params.storedetail),
});
const loadMoreProducts = function () {
  queryParams.page++;
  queryParams.size = 12;
  useRouter().push({ query: { ...useRoute().query, page: queryParams.page } });
};

const onSearch = function () {
  useProductsStore().resetProducts();
  useRouter().push({
    query: {
      ...useRoute().query,
      page: 0,
      size: 12,
      searchText: searchText.value || undefined,
    },
  });
};
const filter = function (value: any, oldValue: any) {
  if (
    value?.sortBy !== oldValue?.sortBy ||
    value?.endirimli !== oldValue?.endirimli ||
    value?.maxPrice !== oldValue?.maxPrice ||
    value?.minPrice !== oldValue?.minPrice ||
    value?.cityIds !== oldValue?.cityIds ||
    value?.productTypeLabels !== oldValue.productTypeLabels
  ) {
    useProductsStore().resetProducts();
    queryParams.page = 0;
    queryParams.size = value.page ? (Number(value.page) + 1) * 12 : 12;
  }
  useProductsStore().fetchProducts({
    ...useRoute().query,
    ...queryParams,
    sortBy: convertSortBy("sortBy"),
    sortDirection: convertSortBy("sortDirection"),
  });
};
watch(
  () => useRoute().query,
  (value: any, oldValue: any) => {
    !openMobileFilter.value && filter(value, oldValue);
    queryParams.page = value.page;
  },
  { deep: true }
);
const showFilterModal = function () {
  openMobileFilter.value = true;
};

const defaultImagePath = await import("@/assets/img/store_logo.svg");
const setDefaultStoreImage = (event: Event | any) => {
  event.target.src = defaultImagePath.default;
  event.target.className = "p-2";
};
</script>

<style>
.fs-13 {
  font-size: 13px;
}
</style>
