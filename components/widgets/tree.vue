<template>
  <div class="w-full">
    <ul class="w-auto h-auto m-0 p-0 max-w-[350px]">
      <li class="w-full h-auto m-0 p-0" v-for="(category, index) in useRoute().params.id ===
        'fermer-mehsullari' ||
        useRoute().fullPath.includes('fermer-etraflisi')
        ? useFarmerCategoriesStore().getCategories
        : useCategoriesStore().getCategories" :key="index">
        <div @click="getProductTypes(index)"
          class="flex flex-row justify-between items-center w-full h-auto min-w-full cursor-pointer hover:bg-[#f9fafb] p-2 rounded">
          <span class="flex justify-start items-center">
            <input class="cursor-pointer outline-none accent-[#16A34A] h-4 w-4 border-[#d9d9d9] mr-2"
              @click="getProductTypesWithChecked($event, index, category)" type="checkbox"
              :id="`${category.name}-${category.id}`" :name="`${category.name}-${category.id}`" />
            <label class="cursor-pointer"> {{ category.name }} </label>
          </span>
          <DownOutlined v-if="category.productTypes.length > 0" class="text-sm transform transition-transform" :class="{
            '-rotate-180': category.hide,
            'rotate-0': !category.hide,
          }" />
        </div>

        <ul v-if="category.productTypes.length > 0" class="w-auto overflow-hidden transition-all duration-500 pl-7"
          :class="{
            'h-auto my-3': category.hide,
            'h-0 my-0': !category.hide,
          }">
          <li
            class="flex flex-row justify-between items-center w-full h-auto text-green-500 cursor-pointer hover:bg-[#f9fafb] px-[2px] py-0.5"
            v-for="(productType, index) in category.productTypes" :key="index">
            <span class="flex flex-row justify-start items-center">
              <input type="checkbox" class="h-4 w-4 mr-2.5 accent-[#16A34A] block"
                :id="`${productType.name}-${productType.id}`" :name="`${productType.name}-${productType.id}`"
                :checked="productType.checked" />
              <label class="cursor-pointer text-[#6B7280]" :for="`${productType.name}-${productType.id}`">{{
                productType.name }}</label>
            </span>
            <span class="bg-[#F3F4F6] text-gray-500 px-[3px] py-[1px] rounded-sm">{{ productType.productCount }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import type {
  Categories,
  CategoriesProductType,
} from "~/utils/types/categories";

// methods
const getProductTypes = function (index: number) {
  useRoute().params.id === "fermer-mehsullari" ||
    useRoute().fullPath.includes("fermer-etraflisi")
    ? useFarmerCategoriesStore().setProductTypes(index)
    : useCategoriesStore().setProductTypes(index);
};
if (useRoute().query.productTypeLabels) {
}

const getProductTypesWithChecked = function (
  event: Event | any,
  index: number,
  category: Categories
) {
  event.stopPropagation();

  let productTypeLabels = [] as string[];
  event.target.checked
    ? category.productTypes.forEach((type: CategoriesProductType, index) => {
      productTypeLabels.push(type.label);
    })
    : (productTypeLabels = []);
  useRouter().replace({
    query: {
      ...useRoute().query,
      productTypeLabels:
        productTypeLabels.length > 0 ? productTypeLabels.join(",") : undefined,
    },
  });

  // useRoute().params.id === "fermer-mehsullari"
  //   ? useFarmerCategoriesStore().setAllProductTypes(index, event.target.checked)
  //   : useCategoriesStore().setAllProductTypes(index, event.target.checked);
};
</script>
<style>
input[type="checkbox"]:checked:after {
  content: "";
  display: block;
  width: 4px;
  height: 12px !important;
}
</style>
