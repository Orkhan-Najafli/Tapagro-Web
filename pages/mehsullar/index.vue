<template>
  <div class="min-h-screen">
    <section
      class="flex flex-row max-w-[1224px] w-full px-6 xl:px-0 container mx-auto"
    >
      <div class="flex flex-row w-full relative mb-6 md:mb-10">
        <div class="w-full relative">
          <categories />
          <section class="mt-10 mb-11">
            <div class="flex w-full flex-row justify-between items-center">
              <div
                class="flex flex-col w-full justify-center items-start h-9 relative"
              >
                <div
                  v-if="
                    checkSearch &&
                    useProductsStore().getProductsStatus === 'success'
                  "
                >
                  <h2
                    class="text-gray-600 font-medium text-sm md:text-2xl p-0 m-0 mr-2"
                  >
                    <span class="whitespace-nowrap"
                      >{{ $t("search_results") }}:
                      {{ useProductsStore().getTotalElements }}</span
                    >
                  </h2>
                </div>
                <div
                  v-if="
                    !checkSearch &&
                    useProductsStore().getProductsStatus === 'success'
                  "
                  class="text-gray-600 font-medium text-2xl p-0 m-0 mr-2"
                >
                  <h2
                    class="text-gray-600 font-medium text-sm md:text-2xl p-0 m-0 mr-2"
                  >
                    <span>{{ $t("products") }} : </span>
                    <span class="whitespace-nowrap">
                      {{ useProductsStore().getTotalElements }}</span
                    >
                  </h2>
                </div>
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
                  <sorting />
                </div>
              </div>
            </div>
          </section>
          <section class="flex flex-row justify-between">
            <div
              style="width: 294px; min-width: 294px"
              class="h-auto hidden lg:flex mr-6"
            >
              <MainProductFilter
                style="height: fit-content"
                class="sticky top-28"
              />
            </div>
            <div class="flex flex-col justify-start w-full">
              <div class="flex w-full flex-col">
                <a-spin
                  :spinning="useProductsStore().getProductsStatus !== 'success'"
                  size="large"
                  wrapper-class-name="text-green-800"
                >
                  <products
                    :classGridSize="false"
                    :link="'mehsullar'"
                    :products="useProductsStore().getProducts"
                    v-if="useProductsStore().getProducts.size > 0"
                  />
                </a-spin>
              </div>
              <div
                v-if="
                  useProductsStore().getProducts.size !=
                  useProductsStore().getTotalElements
                "
                class="block w-full min-w-full rounded text-center my-14"
              >
                <button
                  @click="loadMoreProducts"
                  class="px-8 py-1 rounded text-amber-400 border border-amber-400 hover:text-white bg-white hover:bg-amber-400 text-sm font-semibold"
                >
                  {{ $t("more_products") }}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
    <main-product-filter-modal
      @handle-ok="openMobileFilter = false"
      @handle-cancel="openMobileFilter = false"
      v-if="openMobileFilter"
    />
  </div>
</template>
<script setup lang="ts">
useHead({
  title: "Məhsullar",
  meta: [
    { name: "robots", content: "index, follow" },
    {
      hid: "description",
      name: "description",
      content:
        "Tapagro vebsaytında müxtəlif kənd təsərrüfatı məhsullarını kəşf edin. Yüksək keyfiyyətli və etibarlı məhsullar burada.",
    },
    {
      hid: "keywords",
      name: "keywords",
      content:
        "məhsullar, kənd təsərrüfatı məhsulları, tapagro, yüksək keyfiyyətli məhsullar, etibarlı məhsullar, mehsullar, kend mehsullari, organik mehsullar, yuksek keyfiyyetli mehsullar, kend teserrufati mehsullari",
    },
    {
      hid: "og:title",
      name: "og:title",
      content: "Məhsullar - Tapagro",
    },
    {
      hid: "og:description",
      name: "og:description",
      content:
        "Tapagro vebsaytında müxtəlif kənd təsərrüfatı məhsullarını kəşf edin. Yüksək keyfiyyətli və etibarlı məhsullar burada.",
    },
    {
      hid: "og:type",
      name: "og:type",
      content: "website",
    },
    {
      hid: "og:url",
      name: "og:url",
      content: "https://tapagro.az/mehsullar",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://tapagro.az/mehsullar",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Məhsullar",
        // "image": "https://tapagro.az/images/mehsullar.jpg",
        description:
          "Tapagro vebsaytında müxtəlif kənd təsərrüfatı məhsullarını kəşf edin. Yüksək keyfiyyətli və etibarlı məhsullar burada.",
        brand: {
          "@type": "Brand",
          name: "Tapagro",
        },
        offers: {
          "@type": "Offer",
          url: "https://tapagro.az/mehsullar",
          priceCurrency: "AZN",
          price: "12", // Dynamic price can be added here
          itemCondition: "https://schema.org/NewCondition",
          availability: "https://schema.org/InStock",
        },
      }),
    },
  ],
});

definePageMeta({
  layout: "hero",
});
// variables
const searchParams = reactive({
  sortBy: "createdAt",
  sortDirection: "DESC",
});
const openMobileFilter = ref(false);
const queryParams = reactive({
  page: useRoute().query.page ? Number(useRoute().query.page) : 0,
  size: useRoute().query.page ? (Number(useRoute().query.page) + 1) * 12 : 12,
});

// methods
const convertSortBy = function (direction: any) {
  if (useRoute().query && useRoute().query.sortBy) {
    let item = new String(useRoute().query.sortBy)?.split("-");

    if (direction) {
      return item[1] || searchParams.sortDirection;
    } else {
      return item[0] || searchParams.sortBy;
    }
  } else {
    if (direction) {
      return searchParams.sortDirection;
    } else {
      return searchParams.sortBy;
    }
  }
};
const showFilterModal = function () {
  openMobileFilter.value = true;
};
useProductsStore().resetProducts();
useProductsStore().fetchProducts({
  ...queryParams,
  ...useRoute().query,
  page: 0,
  sortBy: convertSortBy(false),
  sortDirection: convertSortBy(true),
  isDiscounted: !!useRoute().query.endirimli || undefined,
  minAverageRating: Number(useRoute().query.minAverageRating) || undefined,
});
const loadMoreProducts = function () {
  queryParams.page++;
  queryParams.size = 12;
  useRouter().push({ query: { ...useRoute().query, page: queryParams.page } });
};
const filter = function (value: any, oldValue: any) {
  if (
    value?.sortBy !== oldValue?.sortBy ||
    value?.endirimli !== oldValue?.endirimli ||
    value?.storeIds !== oldValue?.storeIds ||
    value?.maxPrice !== oldValue?.maxPrice ||
    value?.minPrice !== oldValue?.minPrice ||
    value?.minAverageRating !== oldValue?.minAverageRating ||
    value?.cityIds !== oldValue?.cityIds
  ) {
    useProductsStore().resetProducts();
    queryParams.page = 0;
  }
  useProductsStore().fetchProducts({
    ...useRoute().query,
    ...queryParams,
    sortBy: convertSortBy(false),
    sortDirection: convertSortBy(true),
    isDiscounted: !!useRoute().query.endirimli || undefined,
    minAverageRating: Number(useRoute().query.minAverageRating) || undefined,
  });
};
// watch
watch(
  () => useRoute().query,
  (value: any, oldValue: any) => {
    !openMobileFilter.value && filter(value, oldValue);
  },
  { deep: true }
);
const checkSearch = computed(() => {
  if (useRoute().query) {
    return (
      useRoute().query.maxPrice ||
      useRoute().query.minPrice ||
      useRoute().query.productTypeIds ||
      useRoute().query.searchText ||
      useRoute().query.minAverageRating ||
      (useRoute().query.storeIds && useRoute().query.storeIds!.length > 0) ||
      (useRoute().query.cityIds && useRoute().query.cityIds!.length > 0)
    );
  }
  return false;
});
</script>
<style>
.ant-select-selection,
.ant-select-selection:focus,
.ant-select-selection:hover,
.ant-select-selection:active {
  border: 1px solid #d9d9d9;
  outline: none;
  box-shadow: none;
}

@media only screen and (max-width: 600px) {
  #sort {
    width: 150px;
  }
}

@media only screen and (min-width: 601px) {
  #sort {
    width: 180px;
  }
}
</style>
