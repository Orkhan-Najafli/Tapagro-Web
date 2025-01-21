<template>
  <div
      style="min-width: 320px"
      class="flex relative lg:sticky lg:top-32 w-full lg:w-80 h-auto sticky-height-responsive bg-white mb-6 lg:mb-0"
  >
    <div class="p-6 w-full min-w-full h-auto">
      <h5 class="text-[#111827] font-semibold text-xl mb-16">
        {{ t("total_payment") }}
      </h5>
      <div class="flex flex-col">
        <div
            class="flex flex-row justify-between items-center py-2.5"
        >
                                <span class="text-gray-400 font-medium text-base m-0 p-0"
                                >{{ t('total_amount') }}
                                </span>
          <div class="flex items-center">
                                  <span
                                      class="text-gray-800 font-medium text-base mr-2 p-0"
                                  >
                                    {{ shoppingCarts && shoppingCarts?.totalPrice }}
                                  </span>
            <monetary_unit_logo
                width="16"
                height="13"
                color="#374151"
            />
          </div>
        </div>
        <div
            class="flex flex-row justify-between items-center py-2.5"
        >
                                <span class="text-gray-800 font-medium text-base p-0 m-0"
                                >{{ t("discount_in_basket") }}</span
                                >
          <div class="flex items-center">
                                  <span
                                      class="text-gray-800 font-medium text-base p-0 mr-2"
                                      v-if="shoppingCarts"
                                  >{{
                                      (
                                          shoppingCarts?.totalDiscountedPrice -
                                          shoppingCarts?.totalPrice
                                      ).toFixed(2)
                                    }}</span
                                  >
            <monetary_unit_logo
                width="16"
                height="13"
                color="#374151"
            />
          </div>
        </div>
        <hr class="bg-[#CBD5E1] my-3"/>
        <div
            class="flex flex-row justify-between items-center py-2.5"
        >
                                <span class="text-gray-800 font-medium text-base p-0 m-0"
                                >{{ t('final_amount') }}</span
                                >
          <div class="flex items-center">
                                  <span
                                      class="text-gray-800 font-medium text-base p-0 mr-2"
                                  >
                                    {{ shoppingCarts && shoppingCarts?.totalDiscountedPrice }}
                                  </span>
            <monetary_unit_logo
                width="16"
                height="13"
                color="#374151"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-center mt-7 items-center">
        <a-tooltip placement="bottom">
          <template
              v-if="
                                    shoppingCarts?.stockSufficientList.includes(false) ||
                                    !shoppingCarts?.isActive
                                  "
              #title
          >
                                  <span
                                      v-if="shoppingCarts?.stockSufficientList.includes(false)"
                                  >{{ t("out_of_stock") }}</span
                                  >
            <span v-if="!shoppingCarts?.isActive"
            >{{ t("inactive_product") }}</span
            >
          </template>
          <button
              @click="
                                    orderDid(
                                      !shoppingCarts?.stockSufficientList.includes(false),
                                      shoppingCarts?.isActive
                                    )
                                  "
              :class="{
                                    'bg-opacity-40 cursor-not-allowed':
                                      shoppingCarts?.stockSufficientList.includes(false) ||
                                      !shoppingCarts?.isActive,
                                    'bg-opacity-100': !(
                                      shoppingCarts?.stockSufficientList.includes(false) ||
                                      !shoppingCarts?.isActive
                                    ),
                                  }"
              class="w-full p-0 m-0 px-3 py-2 mb-3 bg-[#16A34A] hover:bg-emerald-600 text-white text-base font-semibold rounded-md cursor-pointer"
          >
            {{ t("place_an_order") }}
          </button>
        </a-tooltip>
        <nuxt-link
            tag="div"
            class="w-full min-w-full"
            :to="`/`"
        >
          <button
              class="w-full p-0 m-0 px-3 py-2 text-[#6B7280] border-2 border-[#E5E7EB] text-base font-semibold rounded-md"
          >
            {{ t("continue_shopping_btn") }}
          </button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type {PropType} from "vue";
import type {Item, Shopping} from "~/utils/types/shopping";

const {t} = useI18n()
const props = defineProps({
  shoppingCarts: {
    type: Object as Shopping,
    default: {} as PropType<Item>,
  },
});
</script>
<style></style>
