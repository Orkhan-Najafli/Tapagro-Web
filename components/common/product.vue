<template>
  <div @click="loadProduct" v-if="props.product">
    <nuxt-link v-if="link == 'mehsullar'" tag="a" :to="`/mehsullar/mehsul-etraflisi/${props.product?.id}`"
      class="flex flex-col group overflow-hidden relative cursor-pointer z-10 align-baseline h-full">
      <div class="flex w-full h-auto relative">
        <div>
          <slot name="compare"></slot>
          <slot name="favorite"></slot>
        </div>
        <picture class="w-full overflow-hidden flex relative justify-center items-center rounded">
          <img v-if="hasValidThumbnail(props.product)" :src="`${baseURL}/${props.product.thumbnailPath}`"
            :alt="props.product.name" :title="props.product.name" @load="setheight"
            :style="{ height: imageHeight + 'px' }" style="
              width: 100%;
              min-width: 100%;
              max-width: 100%;
              /*height: 145px;*/
              /*max-height: 145px;*/
            " class="object-cover duration-500 max-h-[264px] transform group-hover:scale-125"
            @error="setDefaultImage" />
          <img v-else :src="require(`@/assets/img/no-image.svg`)" style="
              width: 100%;
              max-width: 100%;
              height: 264px !important;
              max-height: 264px !important;
            " class="p-16 duration-300 max-h-[264px] transform group-hover:scale-125" alt="Image not available" />
        </picture>

        <div v-if="!props.product.isActive"
          class="absolute flex flex-row justify-center items-center bottom-3 left-3 bg-white px-2 py-1 rounded-md">
          <cancel_icon />
          <span class="inline-flex text-[#DC2626] font-normal text-sm ml-2">
            {{ t("the_product_is_not_active") }}
            {{ props.product.isActive }}</span>
        </div>
      </div>
      <div class="pt-3 border-t border-gray-100 grow">
        <p class="text-gray-500 p-0 m-0 mb-2 text-sm font-medium truncate" :title="props.product.name">
          {{ props.product.name }}
        </p>
        <h4 v-if="!farmer" class="text-xs font-normal text-gray-400 line-clamp-1 m-0 p-0"
          :title="props.product.storeName">
          {{ props.product.storeName }}
        </h4>
      </div>
      <div class="flex flex-col justify-start items-start mt-3">
        <span class="text-base leading-6 font-semibold text-gray-600" v-if="!farmer && props.product.bargainMethod">
          {{ props.product.bargainMethod.status }}
        </span>

        <div v-else class="flex flex-col text-lg font-semibold text-gray-600">
          <div v-if="props.product.price && props.product.price.discount > 0" class="flex flex-col">
            <div class="relative flex flex-row items-center font-normal text-xs text-[#6B7280]">
              <svg class="absolute z-40 top-1.5 w-auto" xmlns="http://www.w3.org/2000/svg" height="2" viewBox="0 0 50 2"
                fill="none">
                <path d="M0 1H59" stroke="#4B5563" />
              </svg>

              <span class="mr-0.5">
                {{
                  props.product.price && props.product.price.initialPrice
                }}</span>
              <!-- <monetary_unit_logo
                :styleSVG="{ widht: 13, height: 10, color: '#6B7280' }"
              /> -->
            </div>
            <div class="flex flex-row items-center">
              <div v-if="props.product.price" class="flex flex-row items-center mr-3">
                <span v-if="fixed" class="mr-0.5 text-[#EF4444]">{{
                  typeof props.product.price != "number" &&
                  props.product.price.discountedPrice
                }}
                </span>
                <span @mouseenter="tofixed = false" @mouseleave="tofixed = true" v-else class="mr-0.5 text-[#EF4444]">{{
                  tofixed
                    ? `${typeof props.product.price != "number" &&
                    Math.floor(props.product.price.discountedPrice)
                    }.${typeof props.product.price != "number" &&
                    props.product.price.discountedPrice
                      .toString()
                      .split(".")[1][0]
                    }${(typeof props.product.price != "number" &&
                      props.product.price.discountedPrice
                        .toString()
                        .split(".")[1][1]) ||
                    ""
                    }`
                    : typeof props.product.price != "number" &&
                    props.product.price.discountedPrice
                }}
                </span>
                <!-- <monetary_unit_logo
                  :styleSVG="{ widht: 16, height: 13, color: '#EF4444' }"
                /> -->
              </div>
              <span class="text-[#EF4444] bg-[#FEF2F2] text-xs font-medium p-0 py-0.5 px-1">
                -{{
                  typeof props.product.price != "number" &&
                  props.product.price.discount
                }}
                %</span>
            </div>
          </div>
          <div v-else class="flex flex-row justify-start items-center">
            <span class="mr-1 text-base font-medium text-[#374151]">{{
              typeof props.product.price != "number" &&
              props.product.price.initialPrice
            }}</span>
            <!-- <monetary_unit_logo
              :styleSVG="{ widht: 16, height: 13, color: '#374151' }"
            /> -->
          </div>
        </div>
        <nuxt-link v-if="!farmer" @click="$event.stopPropagation()" tag="a"
          :to="`/mehsullar/mehsul-etraflisi/${props.product.id}#rating`"
          class="flex flex-row items-center justify-start mb-5 mt-3">
          <span class="text-[#1F2937] text-xs md:text-sm font-medium">{{
            props.product.reviewSummary &&
            Number(props.product.reviewSummary.averageRating).toFixed(1)
          }}</span>
          <span class="inline-flex justify-between items-center mx-1 md:mx-2.5">
            <a-rate :value="rateSet(
              product.reviewSummary && product.reviewSummary.averageRating
            )
              " class="m-0 p-0 w-full h-auto" allow-half>
              <template #character>
                <rate_icon class="inline-block md:hidden -mt-[5px]" :size="{ widht: 15, height: 15 }" />
                <rate_icon class="hidden md:inline-block -mt-[5px]" :size="{ widht: 20, height: 20 }" />
              </template>
            </a-rate>
          </span>
          <span class="text-[#1F2937] text-xs md:text-sm font-medium">
            ({{
              props.product.reviewSummary &&
              props.product.reviewSummary.reviewCount
            }})
          </span>
        </nuxt-link>
        <a @click="stopPropagationProduct($event)" class="text-white z-30 block w-full h-auto">
          <a-tooltip v-if="
            !props.product.eligibleToShoppingCart || !props.product.isActive
          " placement="bottom">
            <template #title>
              <span v-if="!props.product.isActive">{{ t("the_product_is_not_active") }} <br /></span>
              <template v-if="!props.product.eligibleToShoppingCart">
                <span v-if="props.product.price">{{
                  t("product_is_out_of_stock")
                }}</span>
                <span v-else> {{ t("contact_the_store_to_order") }} </span>
              </template>
            </template>
            <button
              class="flex flex-row justify-center items-center w-full h-auto font-semibold text-sm bg-opacity-40 bg-green-600 rounded-md m-0 p-0 px-3 py-2 text-white cursor-default">
              <basket_logo />
              <span class="ml-2"> {{ t("add_to_cart") }}</span>
            </button>
          </a-tooltip>
          <button v-else @click="showBasketModal($event, props.product.id)"
            class="flex flex-row justify-center items-center w-full h-auto font-semibold text-sm bg-green-600 hover:bg-green-700 rounded-md m-0 p-0 px-3 py-2 text-white">
            <basket_logo />
            <span class="ml-2"> {{ t("add_to_cart") }}</span>
          </button>
        </a>
      </div>
    </nuxt-link>
    <nuxt-link v-if="link === 'fermer-mehsullari'" tag="a" :to="`/fermer-mehsullari/${props.product.id}`"
      class="flex flex-col group overflow-hidden relative cursor-pointer z-10">
      <div class="flex w-full h-auto relative">
        <template>
          <nuxt-link tag="div" :to="``" @click="$event.stopPropagation()">
            <slot name="compare"></slot>
          </nuxt-link>
        </template>
        <picture class="w-full overflow-hidden flex relative justify-center items-center">
          <img v-if="hasValidThumbnail(props.product)" :src="`${baseURL}/${props.product.thumbnailPath}`"
            :alt="props.product.name" :title="props.product.name" style="width: 100%; min-width: 100%; max-width: 100%"
            @load="setheight" :style="{ height: imageHeight + 'px' }"
            class="object-cover duration-500 max-h-[264px] transform group-hover:scale-125" @error="setDefaultImage" />
          <img v-else :src="require(`@/assets/img/no-image.svg`)" style="width: 100%; max-width: 100%" @load="setheight"
            :style="{ height: imageHeight + 'px' }"
            class="p-16 duration-300 max-h-[264px] transform group-hover:scale-125" alt="Şəkil yoxdur." />
        </picture>

        <div v-if="props.product.vipAt"
          class="absolute left-2 top-2 md:left-5 md:top-5 z-40 w-[30px] h-[30px] py-2 px-1 flex justify-center items-center shadow-lg bg-black rounded-md">
          <!-- <vip_icon2 /> -->
        </div>
      </div>
      <div class="pt-3 border-t border-gray-100 grow">
        <p class="text-gray-500 mb-4 line-clamp-2 text-sm font-medium" :title="props.product.name">
          {{ props.product.name }}
        </p>
      </div>
      <div class="flex flex-col justify-start items-start mt-2">
        <h4 class="text-xs font-normal text-gray-400 mb-4 line-clamp-1" :title="props.product.fullName">
          {{ props.product.fullName }}
        </h4>
        <div class="flex flex-row justify-start items-center text-lg leading-6 font-semibold text-[#374151]">
          <span class="mr-1"> {{ props.product.price }}</span>
          <!-- <monetary_unit_logo
            :styleSVG="{ widht: 16, height: 13, color: '#374151' }"
          /> -->
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
<script setup lang="ts">
import basket_logo from "@/components/svg/basket_logo.vue";
import type { FarmerProduct } from "~/utils/types/farmer-product";
import type { Product } from "~/utils/types/product";
const { t } = useI18n();
const baseURL = useRuntimeConfig().public.baseURL;
const fixed = ref(false);
const imageHeight = ref(145);
const tofixed = ref(true);
let props = defineProps({
  product: {
    type: Object as PropType<Product | FarmerProduct>,
    default: "",
  },
  link: {
    type: String,
  },
  farmer: {
    type: Boolean,
  },
});
const loadProduct = async function () {
  if (!props.product || !props.product.id) {
    console.error("Product or product ID is missing!");
    return; // Or handle the missing product gracefully
  }

  try {
    await useProductDetailStore().fetchProduct(Number(props.product.id))
  } catch (error) {
    console.error("Error in fetchProduct:", error); // Log the error for debugging
    throw new Error(`Error fetching product: ${error}`); // Re-throw with more context
  }
}

const stopPropagationProduct = function (event: Event | any) {
  event.stopPropagation();
  event.preventDefault();
};

const priceFixed = function () {
  if (
    props.product &&
    !Number.isInteger(
      typeof props.product.price != "number" &&
      Number(props.product?.price.discountedPrice)
    )
  ) {
    fixed.value = false;
  } else {
    fixed.value = true;
  }
};
if (props.product) {
  priceFixed();
}
const rateSet = function (value: number) {
  if (!Number.isInteger(Number(value))) {
    return Number(`${Math.floor(value)}.${5}`);
  } else {
    return value;
  }
};
const setheight = function (event: Event | any) {
  let image = event.target;
  imageHeight.value = image.clientWidth;
};
const showBasketModal = function (event: Event, id: number) {
  event.stopPropagation();
  event.preventDefault();
  if (useAuthenticator().getToken) {
    useShoppingStore().fetchAddShoppingCart({ productId: id, count: 1 });
    useShoppingStore().setShoppingVisible(true);
  } else {
    useAuthenticator().setRequiredLoginVisible(true);
  }
};

const setDefaultImage = async function (event: Event | any) {
  const noImage = await import("@/assets/img/no-image.svg");
  event.target.src = noImage.default;
  event.target.className = "p-16";
};
const hasValidThumbnail = function (product: Product | FarmerProduct) {
  return product.thumbnailPath;
};
</script>
