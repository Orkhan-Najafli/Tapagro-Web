<template>
  <main class="pt-3 min-h-screen bg-gray-100">
    <section style="max-width: 1224px" class="lg:container mx-auto px-6">
      <nuxt-link
          tag="div"
          class="text-gray-600 flex flex-row justify-start items-center md:hidden font-medium text-sm cursor-pointer"
          to="/"
      >
        <arrow_left_icon/>
        <span class="ml-3 text-gray-600 font-medium text-sm">
            {{ t("main_page") }}
          </span>
      </nuxt-link>
      <div class="mt-6 mb-5 md:mb-11 lg:block hidden">
        <a-breadcrumb class="hidden md:block" separator=">">
          <a-breadcrumb-item class="text-sm leading-5 font-normal" href="">
            <nuxt-link to="/">
              <span class="text-gray-600 font-medium text-sm">
                {{ t("main_page") }}
              </span>
            </nuxt-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item class="text-sm leading-5 font-normal" href="">
            <nuxt-link tag="a" to="/mehsullar">
                  <span class="text-gray-600 font-medium text-sm">
                {{ t("products") }}
              </span>
            </nuxt-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item class="text-sm leading-5 font-semibold">
               <span class="text-gray-800 font-semibold text-sm">
               {{ t("my_basket") }}
               </span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </section>
    <section style="max-width: 1224px" class="lg:container mx-auto px-6">
      <h2
          class="block h-auto w-full min-w-full text-[#111827] font-bold text-3xl m-0 p-0 mb-9"
      >
        {{ t("my_basket") }}
      </h2>
      <div class="flex flex-row w-full">
        <div class="w-full relative">
          <section
              v-if="shoppingCarts && shoppingCarts?.items?.length"
              class="flex flex-col lg:flex-row w-full justify-between">
            <div
                class="w-full lg:w-3/4 h-auto lg:mr-6 bg-white p-6 mb-6 lg:mb-16"
            >
              <div class="flex flex-col">
                <div class="text-xl font-semibold mb-9">
                  <span class="text-[#111827]"> {{ t("selected_products") }}</span>
                  <span class="text-[#111827]">({{
                      shoppingCarts && shoppingCarts?.items?.length
                    }} {{ t("number") }})</span
                  >
                </div>
                <div
                    v-for="(item, index) in shoppingCarts && shoppingCarts?.items">
                  <ProductInBasket
                      @sendErrorMessage="sendErrorMessage"
                      class="mb-9"
                      :item="item"
                      :key="index"
                      :basketList="item"
                  />
                </div>
              </div>
            </div>
            <div class="w-full lg:w-1/4 lg:pb-16">
              <TotalPayment :shoppingCarts="shoppingCarts"/>
            </div>
          </section>
          <section v-if="shoppingCarts && !shoppingCarts?.items?.length">
            <div>
              <div
                  class="flex justify-center items-center w-full min-w-full text-gray-400"
              >
                <a-icon type="shopping-cart" class="text-6xl"></a-icon>
              </div>
              <p
                  class="m-0 p-0 block w-full text-center text-neutral-800 mt-7 mb-14 text-2xl font-medium"
              >
                {{ t("no_products_have_been_added_to_the_product") }}
              </p>
              <div class="flex justify-center items-center">
                <nuxt-link
                    class="text-green-600 hover:text-green-600 text-base font-semibold"
                    tag="a"
                    to="/"
                >{{ t("main_page") }}
                </nuxt-link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import {useShoppingStore} from "~/stores/shopping-module/shopping.stores";

const {t} = useI18n()
const shoppingCarts = computed(() => useShoppingStore().getShoppingCarts);
</script>

