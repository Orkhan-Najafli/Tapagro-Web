<template>
  <a-modal
    :open="useShoppingStore().getShoppingVisible"
    width="695px"
    :closable="false"
    :footer="null"
    centered
    class="basket_modal"
  >
    <div class="border-b border-gray-300">
      <div class="flex flex-row justify-between items-center p-6">
        <div class="flex flex-row items-center">
          <span class="flex justify-center items-center mr-4">
            <check_circle />
          </span>
          <span class="text-[#1F2937] font-medium text-2xl p-0 m-0">
            {{ $t("basket_modal_title") }}
          </span>
        </div>
        <div class="cursor-pointer w-3 h-3">
          <img
            @click="hideBasketModal"
            width="12"
            height="12"
            src="@/assets/img/closeX.png"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col overflow-auto h-96 mt-3 mx-7 px-2">
      <ProductInBasket
        class="mt-6"
        v-for="(item, index) in useShoppingStore().getShoppingCarts.items || []"
        :item="item"
        :key="index"
      ></ProductInBasket>
    </div>
    <div class="border-t border-gray-300">
      <div class="flex flex-col md:flex-row justify-between p-6">
        <div class="w-full flex md:order-1 order-2 my-3 md:my-0">
          <button
            @click="hideBasketModal"
            class="w-full text-[#6B7280] text-sm font-semibold hover:text-neutral-500 border-2 border-[#E5E7EB] bg-white rounded-md px-3 py-2"
          >
            {{ $t("continue_shopping_btn") }}
          </button>
        </div>
        <div class="w-full flex md:order-2 order-3 md:mx-3">
          <nuxt-link
            tag="a"
            to="/sebet"
            class="text-[#6B7280] hover:text-neutral-500 rounded-md w-full"
          >
            <button
              @click="hideBasketModal"
              class="text-[#6B7280] text-sm hover:text-neutral-500 w-full border-2 border-[#E5E7EB] bg-white rounded-md px-3 py-2 flex justify-center items-center font-semibold"
            >
              <Shopping_icon />
              <span>{{ $t("look_at_the_basket_btn") }}</span>
            </button>
          </nuxt-link>
        </div>
        <div
          v-if="useShoppingStore().getShoppingCarts.items"
          class="flex w-full md:order-3 order-1"
        >
          <a-tooltip placement="bottom">
            <template
              v-if="
                useShoppingStore().getShoppingCarts.stockSufficientList.includes(
                  false
                ) || !useShoppingStore().getShoppingCarts.isActive
              "
              #title
            >
              <span
                v-if="
                  useShoppingStore().getShoppingCarts.stockSufficientList.includes(
                    false
                  )
                "
                >{{ $t("out_of_stock") }}</span
              >
              <span v-if="!useShoppingStore().getShoppingCarts.isActive">{{
                $t("inactive_product")
              }}</span>
            </template>
            <button
              @click="
                orderDid(
                  !useShoppingStore().getShoppingCarts.stockSufficientList.includes(
                    false
                  ),
                  useShoppingStore().getShoppingCarts.isActive
                )
              "
              :class="{
                'bg-opacity-40':
                  useShoppingStore().getShoppingCarts.stockSufficientList.includes(
                    false
                  ) || !useShoppingStore().getShoppingCarts.isActive,
                'bg-opacity-100': !(
                  useShoppingStore().getShoppingCarts.stockSufficientList.includes(
                    false
                  ) || !useShoppingStore().getShoppingCarts.isActive
                ),
              }"
              class="flex flex-row justify-center items-center w-full h-auto font-semibold text-sm bg-green-600 rounded-md m-0 p-0 px-3 py-2 text-white cursor-default"
            >
              {{ $t("place_an_order") }}
            </button>
          </a-tooltip>
        </div>
      </div>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
useShoppingStore().fetchShoppingCarts();
//watch
// watch(
//   () => useShoppingStore().getShoppingCarts,
//   (to: any) => {
//     if (to && to.items && to.items.length) {
//       hideBasketModal();
//     }
//   },
//   { deep: true }
// );
//   methods
const orderDid = function (stockSufficient: boolean, isActive: boolean) {
  if (stockSufficient && isActive) {
    useRouter().push({
      path: "/sifarisin-resmilesdirilmesi",
    });
    useShoppingStore().setShoppingVisible(false);
    // setTimeout(() => {
    //   useShoppingStore().setShoppingVisible(false);
    // }, 500);
  }
};
const hideBasketModal = function () {
  useShoppingStore().setShoppingVisible(false);
  // setTimeout(() => {
  //   useShoppingStore().setShoppingVisible(false);
  // }, 500);
};
</script>
<style>
.basket_modal .ant-modal-body {
  padding: 0 !important;
}
</style>
