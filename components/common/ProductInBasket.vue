<template>
  <!-- <div class="container mx-auto"> -->
  <div class="flex flex-col">
    <div class="flex flex-col border-b border-gray-300 pb-3 w-full min-w-full">
      <div class="flex flex-col">
        <div class="flex flex-col">
          <div class="flex flex-row w-full min-w-full">
            <nuxt-link
                tag="div"
                :to="`/mehsullar/${props.item.product.id}`"
                class="w-auto h-auto cursor-pointer"
            >
              <img
                  v-if="hasValidThumbnail(props.item.product)"
                  class="w-auto h-24 product-image"
                  :src="`${baseURL}/${props.item.product.thumbnailPath}`"
                  alt=""
              />
              <img
                  v-else
                  :src="require(`@/assets/img/no-image.svg`)"
                  class="w-auto h-24 product-image"
                  alt="Image not available"
              />
            </nuxt-link>
            <div
                class="flex flex-col w-full h-auto m-0 p-0 ml-3 justify-between"
            >
              <div class="flex flex-col w-full">
                <div
                    class="flex flex-row w-full justify-between items-start md:items-center"
                >
                  <nuxt-link
                      tag="div"
                      :to="`/mehsullar/${props.item.product.id}`"
                      class="cursor-pointer"
                  >
                    <p
                        alt="Fermer məhsulları/meyvə/albalı/kq"
                        class="text-[#1F2937] w-28 h-9 lg:h-auto md:w-auto overflow-hidden text-sm font-semibold p-0 m-0 mr-6 text-ellipsis md:mr-0 whitespace-normal"
                    >
                      {{ props.item.product.name }}
                    </p>
                  </nuxt-link>
                  <div
                      @click="removeGeneralProductInBasket(props.item.product.id)"
                      class="cursor-pointer w-3 h-3"
                  >
                    <img
                        width="12px"
                        height="12px"
                        src="@/assets/img/xx.png"
                        alt=""
                    />
                  </div>
                </div>
                <div class="mt-3">
                  <p class="m-0 p-0 text-[#9CA3AF] font-normal text-xs">
                    {{ props.item.store.name }}
                  </p>
                </div>
              </div>
              <div class="lg:hidden block">
                <div
                    v-if="props.item.product.price.discount > 0"
                    class="flex flex-col"
                >
                  <div
                      class="relative flex flex-row items-center font-normal text-xs text-[#6B7280]"
                  >
                    <svg
                        class="absolute z-40 top-1.5 w-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        height="2"
                        viewBox="0 0 50 2"
                        fill="none"
                    >
                      <path d="M0 1H59" stroke="#4B5563"/>
                    </svg>

                    <span class="mr-0.5">
                          {{ props.item.product.price.initialPrice }}</span
                    >
                    <monetary_unit_logo
                        width="13"
                        height="10"
                        color="#6B7280"
                    />
                  </div>
                  <div class="flex flex-row items-center">
                    <div class="flex flex-row items-center mr-3">
                          <span class="mr-0.5 text-[#EF4444]">{{
                              props.item.product.price.discountedPrice
                            }}</span>
                      <monetary_unit_logo
                          width="16"
                          height="13"
                          color="#EF4444"
                      />
                    </div>
                    <span
                        class="text-[#EF4444] bg-[#FEF2F2] text-xs font-medium p-0 py-0.5 px-1"
                    >{{ props.item.product.price.discount }} %</span
                    >
                  </div>
                </div>
                <div v-else class="flex flex-row justify-start items-center">
                      <span class="mr-1 text-base font-medium text-[#374151]">{{
                          props.item.product.price.initialPrice
                        }}</span>
                  <monetary_unit_logo
                      width="16"
                      height="13"
                      color="#374151"
                  />
                </div>
              </div>
              <div
                  class="flex-col hidden lg:flex md:flex-row w-full h-auto justify-start md:justify-between md:items-center"
              >
                <div
                    v-if="props.item.product.price.discount > 0"
                    class="flex flex-col"
                >
                  <div
                      class="relative flex flex-row items-center font-normal text-xs text-[#6B7280]"
                  >
                    <svg
                        class="absolute z-40 top-1.5 w-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        height="2"
                        viewBox="0 0 50 2"
                        fill="none"
                    >
                      <path d="M0 1H59" stroke="#4B5563"/>
                    </svg>

                    <span class="mr-0.5">
                          {{ props.item.product.price.initialPrice }}</span
                    >
                    <monetary_unit_logo
                        width="13"
                        height="10"
                        color="#6B7280"
                    />
                  </div>
                  <div class="flex flex-row items-center">
                    <div class="flex flex-row items-center mr-3">
                          <span class="mr-0.5 text-[#EF4444]">{{
                              props.item.product.price.discountedPrice
                            }}</span>
                      <monetary_unit_logo
                          width="16"
                          height="13"
                          color="#EF4444"
                      />
                    </div>
                    <span
                        class="text-[#EF4444] bg-[#FEF2F2] text-xs font-medium p-0 py-0.5 px-1"
                    >{{ props.item.product.price.discount }} %</span
                    >
                  </div>
                </div>
                <div v-else class="flex flex-row justify-start items-center">
                      <span class="mr-1 text-base font-medium text-[#374151]">{{
                          props.item.product.price.initialPrice
                        }}</span>
                  <monetary_unit_logo
                      width="16"
                      height="13"
                      color="#374151"
                  />
                </div>

                <div
                    class="flex flex-col md:flex-row justify-start md:justify-center items-start md:items-center w-full md:w-auto"
                >
                  <div
                      class="flex flex-row items-center justify-between m-0 md:mr-20 mb-5 md:mb-0"
                  >
                    <div
                        @click="removeProductInBasket(props.item.product.id)"
                        class="w-6 h-6"
                        :class="{
                            'cursor-pointer': props.item.count > 1,
                            'cursor-not-allowed': props.item.count == 1,
                          }"
                    >
                      <img
                          class="w-6 h-6"
                          src="@/assets/img/minus.png"
                          alt=""
                      />
                    </div>

                    <div>
                      <input
                          @keyup="
                              changeProductCount(props.item.product.id, $event)
                            "
                          v-model="props.item.count"
                          class="outline-none hover:outline-none border-none w-16 text-center basket-number-input"
                          type="number"
                          min="1"
                          @input="writeValue"
                      />
                    </div>
                    <div
                        @click="addProductInBasket(props.item.product.id)"
                        class="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                    >
                      <img
                          class="w-auto h-4"
                          src="@/assets/img/plus.png"
                          alt=""
                      />
                    </div>
                  </div>

                  <div
                      class="break-words w-36 text-right text-[#1F2937] font-semibold text-base flex items-center justify-end"
                  >
                        <span class="mr-2">
                          {{ props.item.totalPrice }}
                        </span>
                    <monetary_unit_logo
                        width="16"
                        height="13"
                        color="#374151"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
              class="flex lg:hidden flex-row justify-between items-start md:items-center w-full md:w-auto mt-4"
          >
            <div class="flex flex-row items-center justify-between m-0 p-0">
              <div
                  @click="removeProductInBasket(props.item.product.id)"
                  class="w-6 h-6"
                  :class="{
                      'cursor-pointer': props.item.count > 1,
                      'cursor-not-allowed': props.item.count == 1,
                    }"
              >
                <img class="w-6 h-6" src="../../assets/img/minus.png" alt=""/>
              </div>
              <div>
                <input
                    @keyup="changeProductCount(props.item.product.id, $event)"
                    v-model="props.item.count"
                    class="outline-none hover:outline-none border-none w-16 text-center basket-number-input"
                    type="number"
                    min="1"
                    @input="writeValue"
                />
              </div>
              <div
                  @click="addProductInBasket(props.item.product.id)"
                  class="bg-gray-100 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
              >
                <img
                    class="w-auto h-4"
                    src="../../assets/img/plus.png"
                    alt=""
                />
              </div>
            </div>

            <div
                class="flex flex-row justify-end items-center h-auto text-right text-[#1F2937] font-semibold text-base break-words w-36"
            >
              <span class="mr-2">{{ props.item.totalPrice }}</span>
              <monetary_unit_logo
                  width="16"
                  height="13"
                  color="#374151"
              />
            </div>
          </div>
        </div>
        <div
            v-if="show"
            class="block bg-[#F9FAFB] w-full min-w-full h-auto p-1 mt-3 mb-2"
        >
          <div
              class="inline-flex flex-row justify-start items-center w-full max-w-[304px] h-auto"
          >
            <home_icon/>
            <span class="font-normal text-sm mx-2 text-[#4B5563]"
            >{{ $t("points_of_sale_where_the_product_is_available") }}:
                </span>
          </div>
          <div class="inline-flex h-auto text-[#4B5563] font-bold text-sm">
                <span
                    class="inline-block text-left h-auto text-[#4B5563] font-bold text-sm"
                    :class="{
                    'truncate w-[261px]': !showAllWarehouses,
                    'w-full': showAllWarehouses,
                  }"
                >
                  {{ wareHouses() }}
                </span>
          </div>
          <button
              @click="showAllWarehouse()"
              v-if="wareHouses().length > 35"
              class="inline-flex text-[#16A34A] text-[15px] font-semibold w-[115px]"
          >
            {{ showAllWarehouses ? "Daha az göstər" : "Hamısını göstər " }}
          </button>
        </div>
        <div
            v-if="!props.item.stockSufficient"
            class="flex flex-row mt-4 justify-start items-center"
        >
          <info_icon/>
          <span class="inline-flex text-[#DC2626] font-normal text-sm ml-2">
                Stokda kifayət qədər yoxdur</span
          >
        </div>
        <div
            v-if="!props.item.product.isActive"
            class="flex flex-row mt-4 justify-start items-center"
        >
          <cancel_icon/>
          <span class="inline-flex text-[#DC2626] font-normal text-sm ml-2">
                {{ $t("the_product_is_not_active") }}</span
          >
        </div>
      </div>
    </div>
    <RemoveProductNotificationModal
        @removeFromBasket="removeFromBasket"
        @addToFavorite="addToFavorite"
        @close="handleClose"
        v-if="visibleProductNotification"
    />
  </div>
  <!-- </div> -->
</template>
<script setup lang="ts">
import type {PropType} from "vue";
import type {Item, Product} from "~/utils/types/shopping";
import {useFavoriteProductsStore} from "~/stores/favorite-products-module/favorite-products.stores";

const baseURL = useRuntimeConfig().public.baseURL;
const showAllWarehouses = ref(false);
const visibleProductNotification = ref(false);
const show = reactive({
  typeof: Boolean,
  default: false,
});
const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    default: {} as PropType<Item>,
  },
});
const emit = defineEmits(["sendErrorMessage"]);
const writeValue = function (event: Event | KeyboardEvent) {
  let target = event.target as HTMLInputElement;
  props.item.count = Number(target.value) < 1 ? 1 : Number(target.value);
};
const showAllWarehouse = function () {
  showAllWarehouses.value = !showAllWarehouses.value;
};
const wareHouses = function () {
  let wareHouseList = "";
  props.item.warehouses.map((wareHouse, i) => {
    i == 0
        ? (wareHouseList += wareHouse.name)
        : (wareHouseList += " , " + wareHouse.name);
  });
  return wareHouseList;
};

const addToFavorite = async function () {
  try {
    await useShoppingStore().fetchRemoveShoppingCart(props.item.product.id)
    if (useShoppingStore().getRemoveShoppingCartStatus === "success") {
      await useFavoriteProductsStore().fetchProductAddToFavorite({
        productId: props.item.product.id,
      })
      visibleProductNotification.value = false;
      useFavoriteProductsStore().fetchFavoriteCount()
    }
  } catch (error: any) {
    visibleProductNotification.value = false;
    console.error()
  }

};

const handleClose = function () {
  visibleProductNotification.value = false;
};
const removeFromBasket = async function () {
  try {
    await useShoppingStore().fetchRemoveShoppingCart(props.item.product.id)
    if (useShoppingStore().getRemoveShoppingCartStatus === "success") {
      visibleProductNotification.value = false;
    }
  } catch (error: any) {
    visibleProductNotification.value = false;
    console.error
  }
};
const changeProductCount = function (id: number, event: Event | KeyboardEvent) {
  const target = event.target as HTMLInputElement;
  if (target.value) {
    useShoppingStore().fetchAddShoppingCart({
      count: props.item.count - 1,
      productId: id,
    });
  }
};

const removeGeneralProductInBasket = function (id: number) {
  if (props.item.addedToFavoriteBasket) {
    useShoppingStore().fetchRemoveShoppingCart(id);
  } else {
    visibleProductNotification.value = true;
  }
};
const removeProductInBasket = async function (id: number) {
  if (props.item.count > 1) {
    try {
      emit("sendErrorMessage", {status: 200});
      await useShoppingStore().fetchAddShoppingCart({
        count: props.item.count - 1,
        productId: id,
      });
    } catch (error) {
      if (useShoppingStore().getAddShoppingCartStatus !== "success") {
        props.item.count -= 1;
      }
    }
  }
};
const addProductInBasket = async function (id: number) {
  await useShoppingStore().fetchAddShoppingCart({
    count: props.item.count + 1,
    productId: id,
  });
};
const hasValidThumbnail = function (product: Product) {
  return product.thumbnailPath;
};
//   },
// };
</script>
<style>
@media only screen and (max-width: 768px) {
  .product-image {
    width: 160px;
    min-width: 160px;
    max-width: 160px;
    height: 145px;
    min-height: 145px;
    max-height: 145px;
  }
}

@media only screen and (min-width: 768px) {
  .product-image {
    width: 94px;
    min-width: 94px;
    max-width: 94px;
    height: 94px;
    min-height: 94px;
    max-height: 94px;
  }
}

.basket-number-input::-webkit-outer-spin-button,
.basket-number-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.basket-number-input[type="number"] {
  -moz-appearance: textfield;
}
</style>
