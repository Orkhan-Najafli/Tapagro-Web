<template>
  <div class="flex flex-col w-full min-h-screen">
    <section v-if="props.mobile" class="flex flex-col w-full h-auto">
      <div class="flex flex-row justify-between items-center">
        <span class="text-gray-700 text-base font-medium">{{
          $t("filter")
        }}</span>
        <button
          @click="resetFilterFields"
          class="text-gray-800 font-semibold text-sm"
        >
          {{ $t("reset") }}
        </button>
      </div>
      <hr class="mt-6 bg-gray-200" />
    </section>
    <section
      class="my-6"
      v-if="
        useRoute().path === '/mehsullar' ||
        useRoute().params.category !== 'fermer-mehsullari'
      "
    >
      <label
        :class="{
          'bg-gray-50': isDiscount,
        }"
        class="text-gray-200 w-full cursor-pointer flex flex-row justify-start items-center hover:bg-gray-50"
      >
        <input
          style="
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
          "
          class="form-checkbox inline-flex justify-center items-center h-4 w-4 bg-white border border-gray-200 rounded checked:bg-green-600 checked:border-green-600 checked:text-white appearance-none mr-2"
          type="checkbox"
          v-model="isDiscount"
          @change="changeDiscountFilter"
        />
        <span class="font-medium text-base text-gray-800">
          {{ $t("discounted") }}
        </span>
      </label>
    </section>
    <section v-if="useRoute().params.id" class="flex flex-col w-full h-auto">
      <hr class="mb-6 bg-gray-200" />
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
      <div>
        <tree v-show="categoriesBoxShow" />
      </div>
      <!-- <categories-tree
        v-show="categoriesBoxShow"
        :baseCategoryId="baseCategory ? baseCategory.id : undefined"
        :reset="resetFilter"
        :baseCategoryType="baseCategory ? baseCategory.label : undefined"
      /> -->
      <hr class="my-6" />
    </section>
    <section class="flex flex-col w-full h-auto">
      <button
        class="text-gray-700 text-base font-bold hover:text-gray-700 flex flex-row items-center justify-between mb-3"
        @click="regionBoxShow = !regionBoxShow"
      >
        <span class="">{{ $t("district") }}</span>

        <DownOutlined
          :class="{
            'rotate-180': regionBoxShow,
            'rotate-0': !regionBoxShow,
          }"
          class="transform"
        />
      </button>
      <div
        v-show="regionBoxShow"
        class="flex flex-col w-full h-72 overflow-y-scroll scroll-design pb-3 pr-2"
      >
        <div class="">
          <div
            class="flex w-full sticky top-0 flex-row justify-start items-center bg-white z-20"
          >
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <search-logo-in-store />
            </div>
            <input
              class="px-4 outline-none h-11 pl-10 w-full border rounded-l-md border-gray-200"
              type="text"
              @input="loadCities"
              :placeholder="$t('search_the_region')"
            />
          </div>
          <ul class="mt-3">
            <a-spin
              size="large"
              class="mt-16 flex justify-center"
              :spinning="useCitiesStore().getStatus !== 'success'"
            >
              <li
                class="mb-3 flex flex-row justify-start items-center w-full min-w-full cursor-pointer hover:bg-gray-50"
                v-for="(region, index) in useCitiesStore().getCities"
                :key="index"
                :class="{
                  'bg-gray-50': selectedRegions.includes(region.id),
                }"
              >
                <label
                  class="text-gray-200 w-full cursor-pointer flex flex-row justify-start items-center"
                >
                  <input
                    style="
                      -webkit-appearance: none;
                      -moz-appearance: none;
                      appearance: none;
                    "
                    :checked="selectedRegions.includes(region.id)"
                    @change="changeUrlCity"
                    class="form-checkbox inline-flex justify-center items-center h-4 w-4 bg-white border border-gray-200 rounded checked:bg-green-600 checked:border-green-600 checked:text-white appearance-none mr-2"
                    type="checkbox"
                    :value="region.id"
                  />
                  <span class="font-medium text-base text-gray-800">
                    {{ region.name }}
                  </span>
                </label>
              </li>
            </a-spin>
          </ul>
        </div>
      </div>
      <hr class="my-6" />
    </section>
    <!-- Magaza -->
    <store />
    <!-- Magaza -->
    <section>
      <button
        class="w-full text-gray-700 text-base font-bold hover:text-gray-700 flex flex-row items-center justify-between mb-3"
        @click="priceBoxShow = !priceBoxShow"
      >
        <span class="">{{ $t("price") }}</span>
        <DownOutlined
          :class="{
            'rotate-180': priceBoxShow,
            'rotate-0': !priceBoxShow,
          }"
          class="transform"
        />
      </button>
      <div v-show="priceBoxShow" class="flex flex-row justify-between">
        <label class="w-1/2 mr-3 inline-flex flex-col text-sm">
          <input
            v-model="minPrice"
            class="mt-2 w-full min-w-full h-8 border border-gray-200 outline-none px-3 rounded-sm focus:border-green-500 hover:border-green-500"
            :placeholder="$t('minimum')"
            allow-clear
            ref="num"
            :maxLength="30"
            @keypress="check"
            @paste="pasteNone"
            @change="changeUrlMinPrice"
          />
        </label>
        <label class="w-1/2 inline-flex flex-col text-sm">
          <input
            v-model="maxPrice"
            class="mt-2 w-full min-w-full h-8 border border-gray-200 outline-none px-3 rounded-sm focus:border-green-500 hover:border-green-500"
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
    </section>
    <section
      v-if="
        $route.path == '/mehsullar' ||
        $route.params.category != 'fermer-mehsullari'
      "
      class="flex flex-col w-full h-auto"
    >
      <hr class="my-6" />
      <button
        class="text-gray-700 text-base font-bold hover:text-gray-700 flex flex-row items-center justify-between mb-3"
        @click="raitingBoxShow = !raitingBoxShow"
      >
        <span class="">{{ $t("rating_title") }}</span>

        <DownOutlined
          :class="{
            'rotate-180': raitingBoxShow,
            'rotate-0': !raitingBoxShow,
          }"
          class="transform"
        />
      </button>
      <div
        v-show="raitingBoxShow"
        class="flex flex-col w-full h-auto overflow-y-scroll scroll-design pb-3 pr-2"
      >
        <ul class="m-0 p-0 flex flex-col justify-start items-start h-[132px]">
          <li
            @click="changeUrlRating(rating)"
            v-for="(rating, index) in ratings"
            :key="index"
            :class="{
              'bg-gray-100 rounded': minAverageRating == rating.rating,
              'bg-white': minAverageRating == rating.rating,
            }"
            class="flex hover:bg-gray-100 hover:rounded flex-row justify-between items-center mb-3 w-full min-w-full h-auto cursor-pointer"
          >
            <div class="flex flex-row justify-start items-center">
              <span
                class="whitespace-nowrap w-auto mx-2.5 -mt-1 -ml-[1px] cursor-pointer"
              >
                <a-rate
                  disabled
                  class="m-0 p-0 cursor-pointer"
                  :value="rating.rating"
                />
              </span>
              <span class="text-xs font-medium text-[#1F2937]"
                >{{ rating.rating }} {{ $t("and_more_than_four") }}</span
              >
            </div>
            <div
              :class="{
                'inline-block mr-1 ': minAverageRating == rating.rating,
                hidden: minAverageRating != rating.rating,
              }"
            >
              <tick_in_filter_rating />
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
const categoriesBoxShow = ref(true);
const regionBoxShow = ref(true);
const priceBoxShow = ref(true);
const raitingBoxShow = ref(true);
const minPrice = ref<number | undefined>(undefined);
const maxPrice = ref<number | undefined>(undefined);
const minAverageRating = ref<number | undefined>(undefined);
const isDiscount = ref(false);
let selectedRegions = reactive<Array<number>>([]);
const ratings = reactive<Array<{ rating: number }>>([
  { rating: 4 },
  { rating: 3 },
  { rating: 2 },
  { rating: 1 },
]);
const num = ref<HTMLElement | any>();
const resetFilter = ref(false);
const props = defineProps({
  mobile: {
    type: Boolean,
    default: true,
  },
});

useCitiesStore().fetchCities();

const loadCities: any = function (event?: Event | undefined | any) {
  useCitiesStore().resetCities();
  useCitiesStore().fetchCities(`${event.target.value!}`);
};
//   created() {
if (useRoute().query) {
  let queryString = useRoute().query;
  let cityIdsQueryParam = queryString.cityIds || [];
  if (!Array.isArray(cityIdsQueryParam)) {
    cityIdsQueryParam = cityIdsQueryParam.split(",");
  }
  selectedRegions = cityIdsQueryParam.map((regionId: any) => Number(regionId));
  minPrice.value = Number(queryString.minPrice) || undefined;
  maxPrice.value = Number(queryString.maxPrice) || undefined;
  minAverageRating.value = Number(queryString.minAverageRating) || undefined;
  if (useRoute().params.category !== "fermer-mehsullari") {
    isDiscount.value = queryString.endirimli === "beli";
  }
}
const pasteNone = function (event: Event) {
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
const changeUrlCity = function (event: Event | any) {
  if (event.target.checked) {
    selectedRegions.push(event.target.value);
  } else {
    const index = selectedRegions.indexOf(event.target.value);
    if (index > -1) {
      selectedRegions.splice(index, 1);
    }
  }
  useRouter().replace({
    query: {
      ...useRoute().query,
      cityIds:
        selectedRegions.length > 0 ? selectedRegions.join(",") : undefined,
      page: undefined,
      page_vip: undefined,
    },
  });
};
const changeUrlMaxPrice = function () {
  useRouter().replace({
    query: {
      ...useRoute().query,
      maxPrice: maxPrice.value || undefined,
      page: undefined,
      page_vip: undefined,
    },
  });
};
const changeUrlMinPrice = function () {
  useRouter().replace({
    query: {
      ...useRoute().query,
      minPrice: minPrice.value || undefined,
      page: undefined,
      page_vip: undefined,
    },
  });
};
const changeDiscountFilter = function () {
  useRouter().replace({
    query: {
      ...useRoute().query,
      endirimli: isDiscount.value ? "beli" : undefined,
      page: undefined,
      page_vip: undefined,
    },
  });
};
const changeUrlRating = function (rating: any) {
  minAverageRating.value = rating.rating;
  useRouter().replace({
    query: {
      ...useRoute().query,
      minAverageRating: rating.rating || undefined,
      page: undefined,
      page_vip: undefined,
    },
  });
};
const resetFilterFields = function () {
  selectedRegions = [];
  minPrice.value = undefined;
  maxPrice.value = undefined;
  minAverageRating.value = undefined;
  isDiscount.value = false;
  resetFilter.value = !resetFilter.value;
  useRouter().replace({
    query: {
      ...useRoute().query,
      minPrice: undefined,
      maxPrice: undefined,
      cityIds: undefined,
      storeIds: undefined,
      productTypeLabels: undefined,
      endirimli: undefined,
      minAverageRating: undefined,
    },
  });
};
</script>
<style>
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

input[type="checkbox"]:checked {
  background-color: #16a34a;
}

input[type="checkbox"]:checked:after {
  content: "";
  display: block;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 1.5px 1.5px 0;
  transform: rotate(45deg);
  margin: auto;
}
</style>
