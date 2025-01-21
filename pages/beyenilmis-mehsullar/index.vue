<template>
  <main class="pt-3 min-h-screen pb-5 bg-gray-100">
    <section style="max-width: 1224px" class="px-6 lg:container mx-auto">
      <div class="mt-6 mb-5 md:mb-9">
        <nuxt-link tag="div"
          class="text-gray-600 flex flex-row justify-start items-center md:hidden font-medium text-sm cursor-pointer"
          to="/">
          <Arrow_left_icon />
          <span class="ml-3 text-gray-600 font-medium text-sm">
            {{ t("main_page") }}
          </span>
        </nuxt-link>
        <a-breadcrumb class="hidden md:block" separator=">">
          <a-breadcrumb-item class="text-sm leading-5 font-normal" href="">
            <nuxt-link to="/">
              <span class="text-gray-600 font-medium text-sm">
                {{ t("main_page") }}</span></nuxt-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item class="text-sm leading-5 font-normal">
            <span class="text-gray-800 font-semibold text-sm">
              {{ t("my_favorite") }}</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </section>
    <section style="max-width: 1224px" class="px-6 lg:container mx-auto">
      <div class="mb-6">
        <h1 class="text-2xl font-bold">{{ t("my_favorite") }}</h1>
      </div>
    </section>
    <section style="max-width: 1224px" class="w-full h-auto px-6 lg:container mx-auto mb-10 relative">
      <div v-if="!useAuthenticator().getToken" class="flex w-full flex-col">
        <a-spin :spinning="useProductDetailStore().getProductStatus !== 'success'
          " size="large" wrapperClassName="text-green-800">
          <Products :classGridSize="true" @removeFavoriteProduct="removeFavoriteProduct" :link="'mehsullar'"
            :products="products as any" />
        </a-spin>

      </div>
      <div v-if="useAuthenticator().getToken" class="flex w-full flex-col">
        <a-spin :spinning="useAuthenticator().getToken ? useFavoriteProductsStore().getFavoriteProductsStatus !== 'success' : useProductDetailStore().getProductStatus !== 'success'
          " size="large" wrapperClassName="text-green-800">
          <Products :classGridSize="true" @removeFavoriteProduct="removeFavoriteProduct" :link="'mehsullar'"
            :products="useFavoriteProductsStore().getFavoriteProducts" />
        </a-spin>

      </div>
      <div class="block w-full min-w-full rounded text-center my-14"
        v-if="useAuthenticator().getToken && useFavoriteProductsStore().getFavoriteProducts.size !== useFavoriteProductsStore().getTotalElements">
        <button @click="loadMoreFavoriteProducts"
          class="px-8 py-1 rounded text-amber-400 border border-amber-400 hover:text-white bg-white hover:bg-amber-400 text-sm font-semibold">
          {{ t("more_products") }}
        </button>
      </div>

      <section
        v-if="!useAuthenticator().getToken ? products.length == 0 : useFavoriteProductsStore().getFavoriteProducts.size === 0"
        class="mt-24">
        <div>
          <div class="flex justify-center items-center w-full min-w-full text-gray-400">
            <a-icon type="heart" class="text-6xl"></a-icon>
          </div>
          <p class="m-0 p-0 block w-full text-center text-neutral-800 mt-7 mb-14 text-2xl font-medium">
            {{ t("no_products_have_been_added_to_my_favorites") }}
          </p>
          <div class="flex justify-center items-center">
            <nuxt-link class="text-green-600 hover:text-green-600 text-base font-semibold" tag="a" to="/">{{
              t("main_page") }}</nuxt-link>
          </div>
        </div>
      </section>
    </section>
  </main>
</template>
<script setup lang="ts">
import type { Product, ProductDetail } from "~/utils/types/product";
const { t } = useI18n();
const favoriteProducts = ref<Set<any>>(new Set());
const productIds = reactive<Array<any>>([]);
const favoriteCookie = useCookie<number[]>("favoriteProducts", {
  default: () => [],
});
let products = reactive<Array<any>>([])
const queryParams = reactive({
  page: useRoute().query.page ? Number(useRoute().query.page) : 0,
  size: useRoute().query.page ? (Number(useRoute().query.page) + 1) * 12 : 12,
});

let ProductDetailStore = useProductDetailStore()
if (useAuthenticator().getToken) useFavoriteProductsStore().resetProducts()
if (useAuthenticator().getToken) useFavoriteProductsStore().fetchFavoriteProducts({
  ...queryParams,
  ...useRoute().query,
  page: 0
})

const setData = () => {
  // Cookie dəyərini yoxlayırıq və Set-ə çeviririk
  favoriteProducts.value = favoriteCookie.value
    ? new Set(favoriteCookie.value)
    : new Set();
  // Unikal məhsul ID-lərini reaktiv massivə təyin edirik
  productIds.splice(0, productIds.length, ...favoriteProducts.value);
};

const loadMoreFavoriteProducts = () => {
  queryParams.page++;
  queryParams.size = 5;
  useRouter().push({ query: { ...useRoute().query, page: queryParams.page } });
};
const removeFavoriteProduct = (product: Product | any) => {
  useFavoriteProductsStore().resetProducts()
  useFavoriteProductsStore().fetchFavoriteProducts({
    page: 0,
    size: useRoute().query.page ? (Number(useRoute().query.page) + 1) * 12 : 12,
  });
};
const getProduct = async (id: number | any) => {
  if (!useAuthenticator().getToken) {
    try {
      await ProductDetailStore.fetchProduct(id)
      products.push(useProductDetailStore().getProduct);
    } catch (error) {
      console.error("Məhsulun gətirilməsi zamanı xəta baş verdi:", error);
    }
  } else {
    return;
  }
};

const loadFavoriteProducts = async () => {
  try {
    for (const productId of productIds) {
      await getProduct(productId);
    }
  } catch (error) {
    console.error("Xəta baş verdi:", error);
  }
};

watch(
  () => useRoute().query,
  (to: any) => {
    if (useAuthenticator().getToken) {
      useFavoriteProductsStore().fetchFavoriteProducts({
        // ...useRoute().query,
        ...queryParams,
      });
    }
  },
  { deep: true }
);
watch(
  () => favoriteCookie.value,
  (newValue: any, oldValue: any) => {
    // Köhnə və yeni dəyərlər arasındakı fərqləri tap
    const removedIds = oldValue.filter((id: number) => !newValue.includes(id));
    // Silinən məhsulları `products` massivindən çıxar
    removedIds.forEach((id: number) => {
      const index = products.findIndex(product => product.id === id);
      if (index !== -1) {
        products.splice(index, 1); // Məhsulu massivdən sil
      }
    });
  },
  { deep: true }
);

watch(
  () => [],
  (newValue: any, oldValue: any) => {
    ProductDetailStore.resetProducts()
    setData();
    if (!useAuthenticator().getToken) {
      loadFavoriteProducts();
    }

  },
  { immediate: true, deep: true }
);

</script>
