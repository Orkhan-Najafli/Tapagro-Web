<template>
  <main class="w-full pt-3 min-h-screen px-6">
    <section class="flex max-w-[1224px] w-full px-6 xl:px-0 container mx-auto">
      <div class="mt-6 mb-5 md:mb-9 hidden md:block">
        <a-breadcrumb class="font-medium text-sm text-gray-500" separator=">">
          <a-breadcrumb-item>
            <nuxt-link tag="a" to="/">
              <span class="text-[#4B5563] text-sm font-medium">
                {{ $t("main_page") }}</span
              ></nuxt-link
            >
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <nuxt-link tag="a" to="/fermerler">
              <span class="text-[#4B5563] text-sm font-medium">
                {{ $t("farmers") }}</span
              ></nuxt-link
            >
          </a-breadcrumb-item>
          <a-breadcrumb-item>
            <span class="text-[#1F2937] font-semibold text-sm">
              {{ $t("other_ads_from_the_farmer") }}</span
            >
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </section>
    <section class="flex max-w-[1224px] w-full px-6 xl:px-0 container mx-auto">
      <div class="flex flex-row w-full mb-6 md:mb-10">
        <div class="w-full relative">
          <section
            class="mb-6 md:mb-10 w-full h-auto px-3 pt-3 pb-4 bg-[#F9FAFBCC]"
          >
            <a-skeleton
              :paragraph="false"
              :loading="useFarmersStore().getFarmerStatus !== 'success'"
              active
              class="text-2xl md:text-4xl lg:text-5xl"
            />

            <div
              v-if="useFarmersStore().getFarmerStatus === 'success'"
              class="flex flex-row justify-start items-center mb-6"
            >
              <div
                class="rounded-full bg-[#F0FDF4] mr-2 w-11 h-11 flex items-center justify-center"
              >
                <farmer_logo />
              </div>

              <h2 class="text-lg font-medium capitalize text-gray-700 m-0 p-0">
                {{ useFarmersStore().getFarmer.name }}
              </h2>
            </div>
            <div
              style="word-break: break-word; background-color: #f9fafb"
              class="ml-3.5"
            >
              <div
                v-if="useFarmersStore().getFarmerStatus === 'success'"
                class="flex flex-col md:flex-row md:items-center justify-start"
              >
                <div
                  class="flex flex-row justify-start items-center text-gray-500 mb-6 md:mb-0 md:mr-11"
                >
                  <farmer_profile_icon />
                  <span class="text-gray-500 font-medium text-base">{{
                    useFarmersStore().getFarmer.name
                  }}</span>
                </div>
                <div
                  @click="
                    useFarmersStore().fetchFarmerContact(
                      useRoute().params.farmerdetail
                    )
                  "
                  class="inline-flex flex-row items-center cursor-pointer"
                >
                  <phone_farmer_icon />
                  <div
                    class="font-normal text-base text-[#16A34A] whitespace-normal cursor-pointer"
                  >
                    <a
                      v-if="useFarmersStore().getFarmerContact.phoneNumber"
                      class="text-emerald-600 hover:text-emerald-600"
                      :href="`tel:+${
                        994 + useFarmersStore().getFarmerContact.phoneNumber
                      }`"
                      v-show="
                        useFarmersStore().getFarmerContactStatus === 'success'
                      "
                    >
                      {{
                        formatPhoneNumber(
                          useFarmersStore().getFarmerContact.phoneNumber
                        )
                      }}
                    </a>
                    <span
                      v-if="
                        !useFarmersStore().getFarmerContact.phoneNumber &&
                        useFarmersStore().getFarmerContactStatus === 'success'
                      "
                    >
                      <no_phone_icon />
                    </span>
                    <span
                      v-show="
                        useFarmersStore().getFarmerContactStatus !== 'success'
                      "
                      >{{ $t("contact_the_farmer") }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </section>
          <a-config-provider
            :theme="{
              token: {
                colorPrimary: '#16a34a',
              },
            }"
          >
            <a-input-search
              size="large"
              class="w-full min-w-full h-auto mb-6 md:mb-11"
              :maxLength="255"
              :placeholder="$t('ad_name')"
              v-model:value="productNamePhrase"
              :allowClear="true"
              enter-button
              @change="onSearch"
              @keyup.enter="onSearch"
            >
            </a-input-search>
          </a-config-provider>
          <section class="mb-6 md:mb-10">
            <div class="flex flex-col md:flex-row justify-between">
              <div
                class="pb-8 min-w-[292px] max-w-[292pc] md:pr-6 hidden lg:block"
              >
                <FarmerDetailFilter
                  style="height: fit-content"
                  class="sticky top-28"
                />
              </div>
              <div class="flex w-full flex-col">
                <div class="flex flex-col mb-6">
                  <div class="flex flex-row justify-between w-full">
                    <div
                      v-if="useFarmersStore().getStatus === 'success'"
                      class="flex font-bold text-base text-gray-600"
                    >
                      {{ $t("products") }}
                      {{
                        useFarmersStore().getStatus === "success" &&
                        useFarmersStore().getTotalElements
                          ? `: ${useFarmersStore().getTotalElements}`
                          : ""
                      }}
                    </div>
                    <div class="flex flex-row justify-end items-center">
                      <a-tooltip placement="bottom">
                        <template #title>
                          <span>{{ $t("filter") }}</span>
                        </template>
                        <div
                          @click="showFilterModal"
                          class="inline-flex items-center h-9 lg:hidden cursor-pointer mr-7"
                        >
                          <filter_logo class="" />
                        </div>
                      </a-tooltip>

                      <div class="flex flex-row justify-end">
                        <sorting :farmer="true" />
                      </div>
                    </div>
                  </div>
                </div>

                <a-spin
                  :spinning="
                    useFarmerProductsStore().getProductsStatus !== 'success'
                  "
                  size="large"
                  wrapper-class-name="text-green-800"
                >
                  <products
                    :farmer="true"
                    :classGridSize="false"
                    :link="'fermer-mehsullari'"
                    :products="useFarmerProductsStore().getProducts"
                    v-if="useFarmerProductsStore().getProducts.size > 0"
                  />
                </a-spin>

                <div
                  class="block w-full min-w-full rounded text-center my-14"
                  v-if="
                    useFarmerProductsStore().getProducts.size !==
                    useFarmerProductsStore().getTotalElements
                  "
                >
                  <button
                    @click="loadMoreFarmers"
                    class="px-8 py-1 rounded text-amber-400 border border-amber-400 hover:text-white bg-white hover:bg-amber-400 text-sm font-semibold"
                  >
                    {{ $t("show_more") }}
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
      <!-- </section> -->
    </section>
    <!-- <keep-alive> -->
    <FarmerProductFilterModal
      @handleOk="openMobileFilter = false"
      @handleCancel="openMobileFilter = false"
      v-if="openMobileFilter"
    />
    <!-- </keep-alive> -->
    <!-- <Page404
      v-else
      title="404"
      :subTitle="$t('no_farmer_matching_the_search_was_found')"
    /> -->
  </main>
</template>

<script setup lang="ts">
import { formatPhoneNumber } from "@/utils/helpers";

const openMobileFilter = ref(false);
const productNamePhrase = ref(useRoute().query.productNamePhrase);
const visible = ref(false);
const searchParams = reactive({
  sortBy: "createdAt",
  sortDirection: "DESC",
});
const queryParams = reactive({
  page: useRoute().query.page ? Number(useRoute().query.page) : 0,
  size: useRoute().query.page ? (Number(useRoute().query.page) + 1) * 12 : 12,
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

useFarmersStore().resetFarmerContact();
useFarmersStore().fetchFarmer(useRoute().params.farmerdetail);
useFarmerProductsStore().resetProducts();
useFarmerProductsStore().fetchProducts({
  ...queryParams,
  ...useRoute().query,
  page: 0,
  // sortBy: convertSortBy("sortBy"),
  // sortDirection: convertSortBy("sortDirection"),
  createdBy: useRoute().params.farmerdetail,
});

const onSearch = function () {
  useFarmerProductsStore().resetProducts();
  useRouter().push({
    query: {
      ...useRoute().query,
      page: 0,
      size: 12,
      productNamePhrase: productNamePhrase.value || undefined,
    },
  });
};
const showFilterModal = function () {
  openMobileFilter.value = true;
};
const loadMoreFarmers = function () {
  queryParams.page++;
  queryParams.size = 12;
  useRouter().push({ query: { ...useRoute().query, page: queryParams.page } });
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
    useFarmerProductsStore().resetProducts();
    queryParams.page = 0;
    queryParams.size = value.page ? (Number(value.page) + 1) * 12 : 12;
  }
  useFarmerProductsStore().fetchProducts({
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

// import Page404 from "@/components/common/404.vue";
</script>

<style>
.fs-13 {
  font-size: 13px;
}
</style>
