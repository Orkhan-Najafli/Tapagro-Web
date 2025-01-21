<template>
  <div class="pt-3 md:px-0 mb-32">
    <div
      class="flex flex-row max-w-[1224px] w-full px-6 xl:px-0 container mx-auto"
    >
      <div class="w-full relative">
        <categories />
        <section>
          <div class="mt-6 mb-5 md:mb-9">
            <nuxt-link class="cursor-pointer" to="/" tag="span">{{
              $t("main_page")
            }}</nuxt-link>
            <span class="mx-2">></span>

            <span class="text-sm leading-5 font-semibold text-gray-800">
              {{ $t("products") }}
            </span>
          </div>
        </section>
        <section class="mt-10 mb-11">
          <div class="flex w-full flex-row justify-between items-center">
            <div class="flex flex-col w-full justify-center h-9 relative">
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
                class="text-gray-600 font-medium p-0 m-0 mr-2"
              >
                <h2
                  class="text-gray-600 font-medium text-sm md:text-2xl p-0 m-0 mr-2"
                >
                  <span
                    >{{ useCategoriesStore().getBaseCategory?.name }} :</span
                  >
                  <span class="whitespace-nowrap">
                    {{ useProductsStore().getTotalElements }}</span
                  >
                </h2>
              </div>
            </div>
            <div class="flex flex-row justify-end items-center">
              <div
                v-if="useRoute().params.id == 'fermer-mehsullari'"
                class="w-auto h-auto inline-block"
              >
                <nuxt-link
                  v-if="useAuthenticator().getToken"
                  tag="button"
                  to="/fermer-mehsullari/yeni-elan"
                  class="flex flex-row items-center justify-center md:w-28 text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded"
                >
                  <a-tooltip class="md:hidden" placement="bottom">
                    <template #title>
                      <span>{{ $t("new_announcement") }}</span>
                    </template>
                    <span class="inline-block text-xl h-4 md:mr-1 leading-4"
                      >+</span
                    >
                  </a-tooltip>
                  <span
                    class="hidden md:inline-block text-xl h-4 md:mr-1 leading-4"
                    >+</span
                  >

                  <span class="hidden md:inline-block font-semibold text-xs">{{
                    $t("new_announcement")
                  }}</span>
                </nuxt-link>
                <button
                  v-else
                  class="flex flex-row items-center justify-center md:w-28 text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded"
                >
                  <!-- @click="$store.commit('setLoginRequiredModal', true)" -->

                  <a-tooltip class="md:hidden" placement="bottom">
                    <template #title>
                      <span>{{ $t("new_announcement") }}</span>
                    </template>
                    <span class="inline-block text-xl h-4 md:mr-1 leading-4"
                      >+</span
                    >
                  </a-tooltip>
                  <span
                    class="hidden md:inline-block text-xl h-4 md:mr-1 leading-4"
                    >+</span
                  >
                  <span class="hidden md:inline-block font-semibold text-xs">{{
                    $t("new_announcement")
                  }}</span>
                </button>
              </div>
              <a-tooltip placement="bottom">
                <template #title>
                  <span>Filtr</span>
                </template>
                <div
                  @click="showFilterModal"
                  class="inline-flex items-center h-9 lg:hidden cursor-pointer ml-7"
                >
                  <filter_logo class="" />
                </div>
              </a-tooltip>

              <div class="flex flex-row justify-end ml-7">
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
            <mainProductFilter
              style="height: fit-content"
              class="sticky top-28"
            />
          </div>
          <div class="flex flex-col w-full">
            <vipFarmerProducts
              v-if="new RegExp('fermer').test(useRoute().fullPath)"
              :classGridSize="false"
              :size="9"
            />
            <div class="flex flex-col w-full">
              <p
                v-if="new RegExp('fermer').test(useRoute().fullPath)"
                class="text-gray-500 font-semibold text-bold text-base mb-4 md:mb-6"
              >
                <span> {{ $t("farmer_products") }} </span>
              </p>
              <div class="flex w-full flex-col">
                <a-spin
                  :spinning="
                    useFarmerProductsStore().getProductsStatus !== 'success'
                  "
                  size="large"
                  wrapper-class-name="text-green-800"
                >
                  <products
                    :classGridSize="false"
                    :link="
                      useRoute().params.id === 'fermer-mehsullari'
                        ? 'fermer-mehsullari'
                        : 'mehsullar'
                    "
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
          </div>
        </section>
      </div>
    </div>
    <!-- <MainProductFilterMobile
      :visible="visible"
      @handleCancel="visible = false"
    /> -->
  </div>
</template>

<script setup lang="ts">
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
const sortList = reactive([
  { sortBy: "promotedAt", sortDirection: "DESC" },
  { sortBy: "publishedAt", sortDirection: "DESC" },
]);

// methods
const convertSortByForFarmer = function (direction: any, i: any) {
  if (useRoute().query && useRoute().query.sortBy) {
    let item = String(useRoute().query.sortBy).split("-");
    if (direction) {
      return i == 0 ? item[1] || sortList[0].sortDirection : undefined;
    } else {
      return i == 0 ? item[0] || sortList[0].sortBy : undefined;
    }
  } else {
    if (direction) {
      if (i == 0) {
        return sortList[0].sortDirection;
      } else {
        return sortList[1].sortDirection;
      }
    } else {
      if (i == 0) {
        return sortList[0].sortBy;
      } else {
        return sortList[1].sortBy;
      }
    }
  }
};
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
      //    (this.searchParams.productCategoryIds &&
      //       this.searchParams.productCategoryIds.length > 0)
    );
  }
  return false;
});

if (useRoute().params.id === "fermer-mehsullari") {
  useFarmerCategoriesStore().fetchCategories();
} else {
  useCategoriesStore().fetchCategories(
    Number(ref(useCookie("categoryID")).value)
  );
}

useProductsStore().resetProducts();
useProductsStore().fetchProducts({
  ...queryParams,
  ...useRoute().query,
  page: 0,
  sortBy: convertSortBy(false),
  sortDirection: convertSortBy(true),
  isDiscounted: !!useRoute().query.endirimli || undefined,
  minAverageRating: Number(useRoute().query.minAverageRating) || undefined,
  productBaseCategoryLabel: String(useRoute().params.id),
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
    value?.cityIds !== oldValue?.cityIds ||
    value?.productTypeLabels !== oldValue.productTypeLabels
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
    productBaseCategoryLabel: String(useRoute().params.id),
  });
};
useFarmerProductsStore().resetProducts();
useFarmerProductsStore().fetchProducts({
  ...queryParams,
  sortList: [
    {
      sortBy: convertSortByForFarmer(false, 0)!,
      sortDirection: convertSortByForFarmer(true, 0)!,
    },
    {
      sortBy: convertSortByForFarmer(false, 1)!,
      sortDirection: convertSortByForFarmer(true, 1)!,
    },
  ],
});
// watch
watch(
  () => useRoute().query,
  (value: any, oldValue: any) => {
    !openMobileFilter.value && filter(value, oldValue);
  },
  { deep: true }
);

// import { mapGetters } from "vuex";

// export default {
// //   head() {
// //     return {
// //       title: "Məhsullar Kateqoriyalar - Tapagro",
// //       meta: [
// //         {
// //           hid: "description",
// //           name: "description",
// //           content:
// //             "Tapagro vebsaytında müxtəlif kənd təsərrüfatı məhsullarını kəşf edin. Yüksək keyfiyyətli və etibarlı məhsullar burada.",
// //         },
// //         {
// //           hid: "keywords",
// //           name: "keywords",
// //           content:
// //             "məhsullar, kənd təsərrüfatı məhsulları, tapagro, yüksək keyfiyyətli məhsullar, etibarlı məhsullar, kateqoriyalar, mehsullar, yuksek keyfiyyetli mehsullar, kend teserrufati mehsullari",
// //         },
// //         {
// //           hid: "og:title",
// //           name: "og:title",
// //           content: "Məhsullar - Tapagro",
// //         },
// //         {
// //           hid: "og:description",
// //           name: "og:description",
// //           content:
// //             "Tapagro vebsaytında müxtəlif kənd təsərrüfatı məhsullarını kəşf edin. Yüksək keyfiyyətli və etibarlı məhsullar burada.",
// //         },
// //         {
// //           hid: "og:type",
// //           name: "og:type",
// //           content: "website",
// //         },
// //         {
// //           hid: "og:url",
// //           name: "og:url",
// //           content: `https://tapagro.az/mehsullar/${this.$route.params.category}`,
// //         },
// //         // {
// //         //   hid: "og:image",
// //         //   name: "og:image",
// //         //   content: "https://tapagro.az/images/.....", // Şəkil URL-sini doğru olaraq təyin edin
// //         // },
// //       ],
// //       link: [
// //         {
// //           rel: "canonical",
// //           href: `https://tapagro.az/mehsullar/${this.$route.params.category}`,
// //         },
// //       ],
// //       script: [
// //         {
// //           type: "application/ld+json",
// //           json: {
// //             "@context": "https://schema.org",
// //             "@type": "Product",
// //             name: "Məhsullar",
// //             // "image": "https://tapagro.az/images/mehsullar.jpg",
// //             description:
// //               "Tapagro vebsaytında müxtəlif kənd təsərrüfatı məhsullarını kəşf edin. Yüksək keyfiyyətli və etibarlı məhsullar burada.",
// //             brand: {
// //               "@type": "Brand",
// //               name: "Tapagro",
// //             },
// //             offers: {
// //               "@type": "Offer",
// //               url: `https://tapagro.az/mehsullar/${this.$route.params.category}`,
// //               priceCurrency: "AZN",
// //               // price: "12", // Əgər qiymət dəyişkəndirsə, burada dinamik qiymət əlavə edə bilərsiniz.
// //               itemCondition: "https://schema.org/NewCondition",
// //               availability: "https://schema.org/InStock",
// //             },
// //           },
// //         },
// //       ],
// //     };
// //   },
// //   data() {
// //     return {
// //       productData: {
// //         list: [],
// //         page: 0,
// //         totalPages: null,
// //         totalElements: null,
// //       },
// //       searchParams: {
// //         sortBy: "createdAt",
// //         sortDirection: "DESC",
// //       },

// //       sortList: [
// //         { sortBy: "promotedAt", sortDirection: "DESC" },
// //         { sortBy: "publishedAt", sortDirection: "DESC" },
// //       ],
// //       filterShowOrHide: false,
// //       visible: false,
// //       more: false,
// //     };
// //   },
// //   created() {
// //     // this.$store.commit("setAppHeroShowAndHide", true);
// //     // this.$fetch();
// //   },
// //   async mounted() {
// //     // await this.$store.dispatch("productCategories/getBaseCategoryList");
// //   },
// //   methods: {
// //     showFilterModal() {
// //       this.visible = true;
// //     },
// //     loadMoreProducts() {
// //       let page = 0;
// //       if (this.$route.query && this.$route.query.page) {
// //         page = parseInt(this.$route.query.page);
// //       }
// //       this.$router.replace({
// //         query: {
// //           ...this.$route.query,
// //           page: ++page,
// //         },
// //       });
// //       this.more = true;
// //     },
// //     loadListData() {
// //       if (
// //         this.$route.params.category &&
// //         this.$route.params.category === "fermer-mehsullari"
// //       ) {
// //         this.loadFarmerProducts();
// //       } else {
// //         this.loadProducts();
// //       }
// //     },
// //     convertSortBy(direction) {
// //       if (this.$route.query && this.$route.query.sortBy) {
// //         let item = this.$route.query.sortBy.split("-");
// //         if (direction) {
// //           return item[1] || this.searchParams.sortDirection;
// //         } else {
// //           return item[0] || this.searchParams.sortBy;
// //         }
// //       } else {
// //         if (direction) {
// //           return this.searchParams.sortDirection;
// //         } else {
// //           return this.searchParams.sortBy;
// //         }
// //       }
// //     },

//   computed: {
//     // ...mapGetters({
//     //   loggedIn: "auth/loggedIn",
//     //   baseCategory: "productCategories/baseCategory",
//     // }),
//     checkSearch() {
//       return (
//         this.searchParams.maxPrice ||
//         this.searchParams.minPrice ||
//         this.searchParams.productTypeIds ||
//         this.searchParams.searchText ||
//         this.searchParams.minAverageRating ||
//         (this.searchParams.storeIds && this.searchParams.storeIds.length > 0) ||
//         (this.searchParams.cityIds && this.searchParams.cityIds.length > 0) ||
// (this.searchParams.productCategoryIds &&
//   this.searchParams.productCategoryIds.length > 0)
//       );
//     },
//   },
//   watch: {
//     baseCategory: {
//       handler(newValue) {
//         if (newValue) {
//           if (newValue == "no") {
//             this.$router.push("/mehsullar");
//           } else {
//             // this.$store.dispatch(
//             //   "productCategories/getCategoryList",
//             //   newValue.id
//             // );
//           }
//         }
//       },
//       immediate: true,
//     },
//     "$route.query": "$fetch",
//   },

// };
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
