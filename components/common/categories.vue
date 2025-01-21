<template>
  <div class="flex flex-col">
    <div @scroll="scrollParent" ref="divScrollWidth"
      class="overflow-x-scroll flex flex-col scroll-hide w-auto transition-all duration-700 ease-in-out">
      <ul v-if="true" ref="ulWidth"
        class="inline-flex flex-row justify-start w-full h-auto items-center whitespace-nowrap transition-all duration-700 ease-in-out">
        <!-- v-if="categories" -->

        <li v-for="(item, index) in useCategoriesStore()!.getBaseCategories || []" :key="index"
          @click="setBaseCategory(item)" class="flex flex-row w-auto mr-6">
          <nuxt-link :to="`/mehsullar/kateqoriyalar/${item.label}`" tag="a" active-class="border-green-500 border-2 "
            class="flex flex-row w-auto min-h-[134px] min-w-[180px] group hover:border-2 hover:border-green-500 hover:shadow-lg bg-green-50 rounded cursor-pointer transition-all duration-100 mr-6">
            <div class="flex flex-col justify-center items-center w-full min-w-full h-auto py-3 z-30">
              <img :src="`${useRuntimeConfig().public.baseURL}/${item.iconPath}`" width="56px" height="56px"
                class="mb-3 w-14 h-14" alt="" />
              <span class="text-gray-700 text-sm text-center w-24 font-normal whitespace-normal">
                {{ item.name }}
              </span>
            </div>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="flex flex-row justify-end items-center my-2">
      <span @click="IsGoingLeft" :class="{
        'bg-gray-300': !arrowScroll,
        'bg-green-700 cursor-pointer': arrowScroll,
      }" class="flex justify-center items-center rounded-full w-5 h-5 text-white">
        <svg class="transform rotate-180 text-white" width="14" height="14" viewBox="0 0 14 14" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M8.16667 2.91663L12.25 6.99996M12.25 6.99996L8.16667 11.0833M12.25 6.99996L1.75 6.99996"
            stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <!-- <a-icon class="font-extrabold" type="arrow-left" /> -->
      </span>
      <span @click="IsGoingRight" :class="{
        'bg-gray-300': arrowScroll,
        'bg-green-700 cursor-pointer': !arrowScroll,
      }" class="flex justify-center items-center rounded-full w-5 h-5 text-white ml-2">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.16667 2.91663L12.25 6.99996M12.25 6.99996L8.16667 11.0833M12.25 6.99996L1.75 6.99996"
            stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Categories } from "~/utils/types/categories";

//data
const divScrollWidth = ref<HTMLElement>();
const ulWidth = ref<HTMLElement>();
const arrowScroll = ref(true);

//methods
useCategoriesStore().fetchBaseCategories();
const initialScrollValue = function () {
  if (divScrollWidth.value?.scrollLeft! > 10) {
    arrowScroll.value = true;
  } else {
    arrowScroll.value = false;
  }
};

initialScrollValue();
const scrollParent = function (event: Event) {
  if (divScrollWidth.value?.scrollLeft! > 10) {
    arrowScroll.value = true;
  } else {
    arrowScroll.value = false;
  }
};
const IsGoingLeft = function () {
  divScrollWidth.value?.scrollBy({
    top: undefined,
    left: -(divScrollWidth.value?.scrollWidth! - ulWidth.value?.offsetWidth!),
    behavior: "smooth",
  });
};
const IsGoingRight = function () {
  divScrollWidth.value?.scrollBy({
    top: undefined,
    left: divScrollWidth.value?.scrollWidth! - ulWidth.value?.offsetWidth!,
    behavior: "smooth",
  });
};

useCategoriesStore().getBaseCategoriesStatus === "success" &&
  useCategoriesStore().getBaseCategories.forEach((category: Categories) => {
    if (useRoute().params.id === category.label) {
      useCategoriesStore().setBaseCategory(category);
    }
  });
const setBaseCategory = function (category: Categories) {
  useCategoriesStore().setBaseCategory(category);
  useCategoriesStore().fetchCategories(category.id);
  useCookie<number>("categoryID").value = category.id;
};
</script>
<style scoped>
li {
  max-height: 134px;
  min-height: 134px;
  min-width: 180px;
}

.scroll-hide::-webkit-scrollbar {
  display: none;
}

.scroll-hide {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}
</style>
