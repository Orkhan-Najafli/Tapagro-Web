<template>
  <div>
    <div>
      <div v-if="props.products.size == 0">
        <div class="text-base text-gray-600">
          {{ t("no_products_matching_your_search_were_found") }}
        </div>
      </div>
      <div v-else class="w-full min-w-full overflow-hidden scroll">
        <div :class="{
          'grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6':
            props.classGridSize,
          'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6':
            !props.classGridSize,
        }">
          <div class="flex w-full min-w-full" v-for="(product, index) in props.products" :key="index">
            <!-- <div class="min-w-full"> -->
            <product :link="props.link"
              class="responsiveProductCard w-full min-w-full border-2 border-gray-[#E5E7EB] rounded p-3"
              :product="product">
              <template #favorite>
                <a-tooltip v-if="link == 'mehsullar'" placement="top">
                  <template #title>
                    <span>{{ t("add_to_my_favorites") }}</span>
                  </template>
                  <div @click="toggleProductToFavorite(product, $event, index)" v-if="useAuthenticator().getToken"
                    :class="{
                      'bg-[#16A34A]': product.addedToFavoriteBasket,
                      'bg-white': !product.addedToFavoriteBasket,
                    }"
                    class="absolute right-2 top-2 md:right-5 md:top-5 z-40 w-9 h-9 flex justify-center items-center shadow-lg rounded-full">
                    <favorite_icon :size="{ width: '24px', height: '24px' }" :color="product.addedToFavoriteBasket ? '#FFFFFF' : '#334155'
                      " />
                  </div>
                  <div @click="toggleProductToFavorite(product, $event, index)" v-else :class="{
                    'bg-[#16A34A]': useCookie<number[]>('favoriteProducts', { default: () => [] }).value.includes(product.id),
                    'bg-white': !useCookie<number[]>('favoriteProducts', { default: () => [] }).value.includes(product.id),
                  }"
                    class="absolute right-2 top-2 md:right-5 md:top-5 z-40 w-9 h-9 flex justify-center items-center shadow-lg rounded-full">
                    <favorite_icon :size="{ width: '24px', height: '24px' }"
                      :color="product.favoriteIsActive ? '#FFFFFF' : '#334155'" />
                  </div>
                </a-tooltip>
              </template>

              <template #compare>
                <a-tooltip placement="bottom">
                  <template #title>
                    <span>{{ t("compare_do") }}</span>
                  </template>
                  <div @click="
                    toggleProductToCompare(product, $event, index, link)
                    " :class="{
                      'bg-[#16A34A]': product.compareIsActive,
                      'bg-white': !product.compareIsActive,
                      'top-12 md:top-[62px]': link == 'mehsullar',
                      'top-3 md:top-4': link != 'mehsullar',
                    }"
                    class="absolute right-2 md:right-5 z-40 w-9 h-9 flex justify-center items-center shadow-lg rounded-full">
                    <scale_logo :size="{ width: '24px', height: '24px' }"
                      :color="product.compareIsActive ? '#FFFFFF' : '#334155'" />
                  </div>
                </a-tooltip>
              </template>
            </product>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { FarmerProduct } from "~/utils/types/farmer-product";
import type { Product, ProductDetail } from "~/utils/types/product";
const { t } = useI18n();

let props = defineProps({
  classGridSize: {
    type: Boolean,
    required: true,
  },
  products: {
    type: Object as PropType<Set<Product | FarmerProduct>>,
    default: [],
  },
  link: {
    type: String,
  },
  farmer: {
    type: Boolean,
  },
});
const emit = defineEmits(["removeFavoriteProduct"]);
let favoriteProductList = new Set();
let compareProductList = reactive<Array<any>>([]);
let compareFarmerProductList = reactive<Array<any>>([]);
const favoriteCookie = useCookie<number[]>("favoriteProducts", {
  default: () => [],
});
onMounted(() => {
  const cookieValue = favoriteCookie.value || [];
  favoriteProductList = new Set(cookieValue);
});
const toggleProductToFavorite = function (
  product: ProductDetail | any,
  event: Event | KeyboardEvent,
  index: number
) {
  event.stopPropagation();
  event.preventDefault();
  if (useAuthenticator().getToken) {
    product.addedToFavoriteBasket = !product.addedToFavoriteBasket;
    if (product.addedToFavoriteBasket) {
      useFavoriteProductsStore().fetchProductAddToFavorite({
        productId: product.id,
      });
    } else {
      useFavoriteProductsStore().fetchProductDeleteToFavorite({
        productId: product.id,
      });
      emit("removeFavoriteProduct", { ...product, index: index });
    }
    useFavoriteProductsStore().fetchFavoriteCount()
  } else {
    toggleProductInFavoriteWhenNotLogin(product);
  }

  // this.$store.commit("favorite/setFavoriteProductIds", product.id);
  if (favoriteCookie.value.includes(product.id)) {
    getNotification({
      message: t("the_product_has_been_added_to_my_favorites"),
      btnText: t("my_favorites_section"),
      path: "/beyenilmis-mehsullar",
    });
  }
  // this.checkProduct();
};
const getNotification = function (param: any) {
  notification.success({
    message: param.message,
    placement: "bottomRight",
    duration: 3,
    btn: () =>
      h(
        "a-button",
        {
          type: "primary",
          size: "small",
          onClick: () => {
            notification.close("");
            useRouter().push({ path: param.path });
          },
        },
        [
          h("a", {
            type: "primary",
            size: "small",
          },
            [
              param.btnText,
              h("a-button", { style: { marginRight: "5px", fontWeight: "bold", width: '40px' } }, "→"),
            ]),
        ]
        // param.btnText
      ),
  });
}

const toggleProductInFavoriteWhenNotLogin = function (
  product: ProductDetail | any
) {
  // Mövcud məhsul siyahısını `Set` kimi yaradırıq
  const favoriteProductSet = new Set(favoriteCookie.value);

  // Məhsul artıq siyahıda varsa, onu silirik, əks halda əlavə edirik
  if (favoriteProductSet.has(product.id)) {
    favoriteProductSet.delete(product.id); // Məhsulu sil
  } else {
    favoriteProductSet.add(product.id); // Məhsulu əlavə et
  }

  // Yenilənmiş `Set`-i cookie-ə geri yazırıq
  favoriteCookie.value = Array.from(favoriteProductSet);

  // Cookie-ni dərhal yeniləmək üçün `refreshNuxtData` çağırılır
  // refreshNuxtData();


  // this.isActiveCompare(
  //   product.id,
  //   this.favoriteProductList.has(product.id),
  //   "favorite"
  // );
  // this.$nuxt.$emit("check", {
  //   id: product.id,
  //   product: product,
  // });
};

const toggleProductToCompare = function (
  product: any,
  event: Event | KeyboardEvent,
  index: number,
  link: any
) {
  event.stopPropagation();
  event.preventDefault();
  // if (useAuthenticator().getToken) {
  //   product.addedToComparisonBasket = !product.addedToComparisonBasket;
  // }
  // if (link == "mehsullar") {
  //   if (useAuthenticator().getToken) {
  //     if (!product.addedToComparisonBasket) {
  //       let index = compareProductList.findIndex(
  //         (item) => item.id == product.id || item == product.id
  //       );
  //       compareProductList.splice(index, 1);
  //       // this.$store.dispatch("compare/removeProductFromCompare", {
  //       //   productId: product.id,
  //       //   farmerProduct: false,
  //       // });
  //     } else {
  //       compareProductList.push({
  //         id: product.id,
  //         createdAt: new Date(),
  //       });
  //       // this.$store.dispatch("compare/addProductToCompare", {
  //       //   productId: product.id,
  //       //   farmerProduct: false,
  //       //   createdAt: new Date(),
  //       // });
  //     }
  //     this.isActiveCompare(product.id, product.addedToComparisonBasket);
  //     this.$nuxt.$emit("check", {
  //       id: product.id,
  //       product: product,
  //     });
  //   } else {
  //     if (
  //       this.getCompareProducts.findIndex(
  //         (item) => item.id == product.id || item == product.id
  //       ) > -1
  //     ) {
  //       let index = this.compareProductList.findIndex(
  //         (item) => item.id == product.id || item == product.id
  //       );
  //       this.compareProductList.splice(index, 1);
  //     } else {
  //       this.compareProductList.push({
  //         id: product.id,
  //         createdAt: new Date(),
  //       });
  //     }
  //     this.$nuxt.$emit("check", {
  //       id: product.id,
  //       product: product,
  //     });
  //     this.isActiveCompare(
  //       product.id,
  //       this.compareProductList.findIndex(
  //         (item) => item.id == product.id || item == product.id
  //       ) > -1
  //     );
  //   }
  //   this.$store.commit("compare/setCompareProductIds", {
  //     id: product.id,
  //     createdAt: new Date(),
  //   });
  // } else {
  //   if (this.loggedIn) {
  //     if (!product.addedToComparisonBasket) {
  //       let index = this.compareFarmerProductList.findIndex(
  //         (item) => item.id == product.id || item == product.id
  //       );
  //       this.compareFarmerProductList.splice(index, 1);
  //       this.$store.dispatch("compare/removeProductFromCompare", {
  //         productId: product.id,
  //         farmerProduct: true,
  //       });
  //     } else {
  //       this.compareFarmerProductList.push({
  //         id: product.id,
  //         createdAt: new Date(),
  //       });
  //       this.$store.dispatch("compare/addProductToCompare", {
  //         productId: product.id,
  //         farmerProduct: true,
  //         createdAt: new Date(),
  //       });
  //     }
  //     this.isActiveCompare(product.id, product.addedToComparisonBasket);
  //     this.$store.dispatch("compare/fetchCount");
  //   } else {
  //     if (
  //       this.getCompareProducts.findIndex(
  //         (item) => item.id == product.id || item == product.id
  //       ) > -1
  //     ) {
  //       let index = this.compareFarmerProductList.findIndex(
  //         (item) => item.id == product.id || item == product.id
  //       );
  //       this.compareFarmerProductList.splice(index, 1);
  //     } else {
  //       this.compareFarmerProductList.push({
  //         id: product.id,
  //         createdAt: new Date(),
  //       });
  //     }
  //     this.isActiveCompare(
  //       product.id,
  //       this.compareFarmerProductList.findIndex(
  //         (item) => item.id == product.id || item == product.id
  //       ) > -1
  //     );
  //   }
  //   this.$store.commit("compare/setCompareFarmerProductIds", {
  //     id: product.id,
  //     createdAt: new Date(),
  //   });
  // }
  // // this.checkProduct();
  // if (
  //   this.getCompareProducts.findIndex(
  //     (item) => item.id == product.id || item == product.id
  //   ) > -1
  // ) {
  //   this.getNotification({
  //     message: this.$t("the_product_has_been_to_the_comparison"),
  //     btnText: this.$t("comparison_section"),
  //     path: "/mehsullarin-muqayisesi",
  //   });
  // }
};
const isActiveCompare = function (
  productId: any,
  compareIsActive: any,
  check = "compare"
) {
  if (check == "compare") {
    // products.filter((product, i) => {
    //   if (product.id === productId) {
    //     this.$set(this.products[i], "compareIsActive", compareIsActive);
    //   }
    // });
  } else {
    // const favoriteProductIndex = this.products.findIndex(
    //   (product) => product.id === productId
    // );
    // this.products.filter((item, i) => {
    //   if (item.id === productId) {
    //     this.$set(this.products[i], "favoriteIsActive", compareIsActive);
    //   }
    // });
  }
};
const checkProduct = function () {
  if (props.products) {
    if (useAuthenticator().getToken) {
      props.products.forEach((product: ProductDetail | any) => {
        isActiveCompare(product.id, product.addedToComparisonBasket);
        isActiveCompare(product.id, product.addedToFavoriteBasket, "favorite");
      });
    } else {
      props.products.forEach((product) => {
        if (
          compareFarmerProductList.findIndex(
            (item) => item.id == product.id || item == product.id
          ) > -1 ||
          compareProductList.findIndex(
            (item) => item.id == product.id || item == product.id
          ) > -1
        ) {
          isActiveCompare(product.id, true);
        }
        if (favoriteProductList.has(product.id)) {
          isActiveCompare(product.id, true, "favorite");
        }
      });
    }
  }
};
</script>
<style>
.scroll::-webkit-scrollbar {
  display: none;
}

.scroll {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

@media only screen and (max-width: 470px) {
  .responsiveProductCard {
    min-width: 100%;
    max-width: 100%;
  }
}

@media only screen and (min-width: 769px) {
  .responsiveProductCard {
    max-width: 212px;
    min-width: 100%;
  }
}

@media only screen and (min-width: 1290px) {
  .responsiveProductCard {
    min-width: 100%;
    max-width: 250px;
  }
}
</style>
