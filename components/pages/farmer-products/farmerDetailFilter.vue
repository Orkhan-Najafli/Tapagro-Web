<template>
  <div class="mt-1 w-auto relative">
    <section v-if="props.mobile" class="flex flex-col w-full h-auto">
      <div class="flex flex-row justify-between items-center">
        <span class="text-[#374151] text-base font-medium">{{
          $t("filter")
        }}</span>
        <button
          @click="resetFilterFields"
          class="text-gray-800 font-semibold text-sm"
        >
          {{ $t("reset") }}
        </button>
      </div>
      <hr class="my-6 bg-gray-200" />
    </section>
    <a-form>
      <div class="flex flex-col w-full h-auto">
        <button
          class="text-gray-700 text-base font-bold hover:text-gray-700 flex flex-row items-center justify-between mb-3"
          @click="categoriesBoxShow = !categoriesBoxShow"
        >
          <span class="">{{ $t("subcategories") }}</span>
          <DownOutlined
            :class="{
              'rotate-180': categoriesBoxShow,
              'rotate-0': !categoriesBoxShow,
            }"
            class="transform"
          />
        </button>
        <a-spin
          size="large"
          class="mt-1 flex justify-center"
          :spinning="useFarmerCategoriesStore().getStatus !== 'success'"
        >
          <Tree v-show="categoriesBoxShow" />
        </a-spin>
      </div>

      <hr class="my-6 bg-gray-200" />

      <div>
        <a
          class="text-gray-700 text-base font-bold hover:text-gray-700 flex flex-row items-center justify-between mb-3"
          @click="priceBoxShow = !priceBoxShow"
        >
          <span class="">{{ $t("price") }}</span>
          <a-icon
            :class="{
              'rotate-180': priceBoxShow,
              'rotate-0': !priceBoxShow,
            }"
            class="transform"
            type="down"
          />
        </a>
        <div v-show="priceBoxShow" class="flex flex-row justify-between">
          <div class="w-1/2 mr-3">
            <label class="w-full min-w-full inline-flex flex-col text-sm">
              <a-input
                v-model:value="minPrice"
                class="mt-2 w-full min-w-full"
                :placeholder="$t('minimum')"
                allow-clear
                ref="num"
                :maxLength="30"
                @keypress="check"
                @paste="pasteNone"
                @change="changeUrlMinPrice"
              />
            </label>
          </div>
          <div class="w-1/2">
            <label class="w-full min-w-full inline-flex flex-col text-sm">
              <a-input
                v-model:value="maxPrice"
                class="mt-2 w-full min-w-full"
                :placeholder="$t('maximum')"
                :maxLength="30"
                allow-clear
                ref="num"
                @keypress="check"
                @paste="pasteNone"
                @change="changeUrlMaxPrice"
              />
            </label>
          </div>
        </div>
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
const minPrice = ref<number | undefined>(
  Number(useRoute().query.minPrice) || undefined
);
const maxPrice = ref<number | undefined>(
  Number(useRoute().query.maxPrice) || undefined
);
const num = ref<HTMLElement | any>();
const categoriesBoxShow = ref(true);
const priceBoxShow = ref(true);
const resetFilter = ref(false);
const props = defineProps({
  mobile: {
    type: Boolean,
    default: true,
  },
});
useFarmerCategoriesStore().fetchCategories();

const pasteNone = function (event: Event | any) {
  event.preventDefault();
};
const check = function (event: Event | any) {
  if (
    (event.charCode >= 48 && event.charCode <= 57) ||
    event.charCode == 46 ||
    event.charCode == 0
  ) {
    if (num.value.indexOf(".") > -1) {
      if (event.charCode == 46) {
        event.preventDefault();
      }
    }
  } else event.preventDefault();
};
//     },
const changeUrlMaxPrice = function () {
  useRouter().replace({
    query: {
      ...useRoute().query,
      maxPrice: maxPrice.value || undefined,
      //   page: undefined,
    },
  });
};
const changeUrlMinPrice = function () {
  useRouter().replace({
    query: {
      ...useRoute().query,
      minPrice: minPrice.value || undefined,
      // page: undefined,
    },
  });
};
const resetFilterFields = function () {
  minPrice.value = undefined;
  maxPrice.value = undefined;
  resetFilter.value = !resetFilter.value;
  useRouter().replace({
    query: {
      ...useRoute().query,
      minPrice: undefined,
      maxPrice: undefined,
      productTypeLabels: undefined,
    },
  });
};
//   },
// };
</script>
<style>
.ant-btn:hover,
.ant-btn:focus {
  border-color: #34d399;
  color: #34d399;
  box-shadow: none;
}

div.scroll-design::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

div.scroll-design::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

div.scroll-design::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: none;
}
</style>
