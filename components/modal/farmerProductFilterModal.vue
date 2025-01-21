<template>
  <a-modal :open="true" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      <div class="flex flex-row items-baseline">
        {{ $t("filter") }}
        <filter_logo class="ml-2 mt-2" />
      </div>
    </template>
    <farmerDetailFilter :mobile="false" />
    <template #footer>
      <div class="flex flex-col justify-between items-center">
        <button
          @click="handleOk"
          class="w-full text-base font-semibold px-3 py-2 mb-3 rounded-md border bg-green-600 text-white hover:bg-green-700 transition-all duration-150 ease-in-out"
        >
          {{ $t("search") }}
        </button>
        <button
          @click="handleCancel"
          class="w-full text-base font-semibold px-3 py-2 rounded-md border mr-3 border-gray-200 text-gray-500 hover:text-white hover:bg-gray-500 transition-all duration-150 ease-in-out"
        >
          {{ $t("reset") }}
        </button>
      </div>
    </template>
  </a-modal>
</template>
<script setup lang="ts">
const emit = defineEmits(["handleOk", "handleCancel"]);
const searchParams = reactive({
  sortBy: "createdAt",
  sortDirection: "DESC",
});

const handleOk = function () {
  emit("handleOk");
  useFarmerProductsStore().resetProducts();
  useFarmerProductsStore().fetchProducts({
    ...useRoute().query,
    page: 0,
    size: 2,
    sortBy: convertSortBy(false),
    sortDirection: convertSortBy(true),
  });
};

const convertSortBy = function (direction: any) {
  if (useRoute().query && useRoute().query.sortBy) {
    let item = new String(useRoute().query.sortBy)?.split("-");

    if (direction) {
      return item[1] || searchParams.sortDirection;
    } else {
      return item[0] || searchParams.sortBy;
    }
  } else {
    if (direction) {
      return searchParams.sortDirection;
    } else {
      return searchParams.sortBy;
    }
  }
};
const handleCancel = function () {
  emit("handleCancel");
  useRouter().replace({
    query: {
      ...useRoute().query,
      minPrice: undefined,
      maxPrice: undefined,
      productTypeLabels: undefined,
    },
  });
};
</script>
