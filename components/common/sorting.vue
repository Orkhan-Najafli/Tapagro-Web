<template>
  <div>
    <div class="flex md:hidden relative w-auto h-auto mobile-box">
      <button class="cursor-pointer" @click="mobileMenu">
        <order_filter_logo />
      </button>
      <ul
        v-show="showOrderMenu"
        class="flex flex-col justify-start absolute bg-white top-8 right-0 z-30 w-36 h-auto border rounded"
      >
        <li
          class="py-1.5 px-2 hover:bg-green-50 cursor-pointer"
          :class="{ 'bg-green-50': item.value === sortByData }"
          v-for="item in list"
          :key="`sm-${item.name}`"
          @click="handleSortSelect(item.value)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <form class="hidden md:block">
      <a-select
        style="width: 150px"
        class="bg-white rounded-sm"
        name="sort"
        id="sort"
        :showArrow="true"
        v-model:value="sortByData"
        @change="handleSortSelect"
      >
        <a-select-option
          v-for="item in list"
          :key="item.name"
          class="my-1 w-full min-w-full"
          :value="item.value"
        >
          {{ item.name }}
        </a-select-option>
      </a-select>
    </form>
  </div>
</template>
<script setup lang="ts">
let props = defineProps({
  farmer: {
    type: Boolean,
  },
});
const { t } = useI18n();
let list = props.farmer
  ? reactive([
      { name: t("sort_by"), value: "default" },
      { name: t("by_date"), value: "createdAt-DESC" },
      // { name: t("rating"), value: "averageRating" },
      { name: t("price_low_to_high"), value: "price-ASC" },
      { name: t("price_high_to_low"), value: "price-DESC" },
      // { name: t("discount"), value: "ecommerceDiscount " },
    ])
  : reactive([
      { name: t("sort_by"), value: "default" },
      { name: t("by_date"), value: "createdAt-DESC" },
      { name: t("rating"), value: "averageRating" },
      { name: t("price_low_to_high"), value: "price-ASC" },
      { name: t("price_high_to_low"), value: "price-DESC" },
      { name: t("discount"), value: "ecommerceDiscount" },
    ]);

const sortByData = ref(
  useRoute().query.sortBy ? useRoute().query.sortBy : "default"
);
const showOrderMenu = ref(false);
const regex = new RegExp("fermer");

const mobileMenu = function (event: Event) {
  let box = document.getElementsByClassName("mobile-box")[0];
  if (!event.composedPath().includes(box)) {
    showOrderMenu.value = !showOrderMenu.value;
  }
};
const handleSortSelect = function (value?: any) {
  if (value) {
    showOrderMenu.value = false;
    sortByData.value = value;
  }
  useRouter().push({
    query: {
      ...useRoute().query,
      sortBy: sortByData.value !== "default" ? sortByData.value : undefined,
    },
  });
};

onMounted(() => {
  if (regex.test(useRouter().currentRoute.value.fullPath)) {
    list = list.filter((item: any, index: number) => {
      if (item.value != "averageRating" && item.value != "ecommerceDiscount") {
        return item;
      }
    });
    if (useRoute().query) {
      if (useRoute().query.sortBy) {
        let item = list.find(
          (item: any) => item.value === useRoute().query.sortBy
        );
        sortByData.value = item ? item.value : "default";
        if (sortByData.value === "default") {
          handleSortSelect();
        }
      }
    }
  }
});
</script>
