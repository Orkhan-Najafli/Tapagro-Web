<template>
  <main
    class="overflow-hidden max-w-[1224px] mx-auto pt-3 px-6 xl:px-0 min-h-screen"
  >
    <section class="container">
      <div class="mt-6 mb-5 md:mb-9">
        <nuxt-link
          tag="div"
          class="text-gray-600 flex flex-row justify-start items-center md:hidden font-medium text-sm cursor-pointer"
          to="/"
        >
          <span class="font-semibold mr-0.5"> < </span>

          <span class="ml-3 text-gray-600 font-medium text-sm">
            {{ t("main_page") }}</span
          >
        </nuxt-link>
        <div class="hidden md:block">
          <nuxt-link
            class="text-gray-600 font-medium text-sm"
            tag="span"
            to="/"
          >
            {{ t("main_page") }}</nuxt-link
          >
          <span> > </span>
          <span class="text-gray-800 font-semibold text-sm">{{
            t("farmers")
          }}</span>
        </div>
      </div>
    </section>
    <section class="container">
      <div class="flex flex-row w-full mb-6 md:mb-10">
        <div class="w-full relative overflow-hidden">
          <section>
            <div>
              <div class="mb-6">
                <h1 class="text-2xl font-bold">{{ t("farmers") }}</h1>
              </div>

              <div class="flex flex-row mb-6">
                <a-config-provider
                  :theme="{
                    token: {
                      colorPrimary: '#16a34a',
                    },
                  }"
                >
                  <a-input-search
                    :placeholder="t('product_name')"
                    size="large"
                    class="w-full min-w-full h-auto mb-6 md:mb-11"
                    :maxLength="255"
                    v-model:value="queryParams.farmerNamePhrase"
                    :allowClear="true"
                    enter-button
                    @change="onSearch"
                    @keyup.enter="onSearch"
                  >
                  </a-input-search>
                </a-config-provider>
              </div>
            </div>

            <a-spin
              :spinning="useFarmersStore().getStatus !== 'success'"
              size="large"
              wrapper-class-name="text-green-800"
            >
              <section class="flex flex-col mb-6 md:mb-10">
                <div v-if="useFarmersStore().totalElements <= 0">
                  <div class="text-base text-gray-600">
                    {{ t("no_farmer_matching_the_search_was_found") }}
                  </div>
                </div>
                <div
                  v-if="useFarmersStore().totalElements > 0"
                  class="grid gap-9 grid-cols-1 md:grid-cols-3"
                >
                  <FarmerCard
                    class="cursor-pointer"
                    v-for="(farmer, index) in useFarmersStore().getFarmers"
                    :key="index"
                    :data="farmer"
                  />
                </div>
              </section>
            </a-spin>
          </section>
          <section
            class="flex flex-row justify-end mb-6 md:mb-10"
            v-if="
              useFarmersStore().getFarmers.size !==
              useFarmersStore().getTotalElements
            "
          >
            <div class="block w-full min-w-full rounded text-center">
              <button
                @click="loadMoreFarmers"
                class="px-8 py-1 rounded text-amber-400 border border-amber-400 hover:text-white bg-white hover:bg-amber-400 text-sm font-semibold"
              >
                {{ t("show_more") }}
              </button>
            </div>
          </section>
        </div>
      </div>
      <!-- </section> -->
    </section>
  </main>
</template>

<script setup lang="ts">
const { t } = useI18n()
const queryParams = reactive({
  page: useRoute().query.page ? Number(useRoute().query.page) : 0,
  size: useRoute().query.page ? (Number(useRoute().query.page) + 1) * 15 : 15,
  farmerNamePhrase: useRoute().query.farmerNamePhrase
    ? String(useRoute().query.farmerNamePhrase)
    : undefined,
});
useFarmersStore().resetFarmers();
useFarmersStore().fetchFarmers({ ...queryParams, page: 0 });

const loadMoreFarmers = function () {
  queryParams.page++;
  queryParams.size = 15;
  useRouter().push({ query: { ...useRoute().query, page: queryParams.page } });
};
const onSearch = function () {
  useFarmersStore().resetFarmers();
  useRouter().push({
    query: {
      ...useRoute().query,
      page: 0,
      size: 15,
      farmerNamePhrase: queryParams.farmerNamePhrase,
    },
  });
};
watch(
  () => useRoute().query,
  (to: any) => {
    useFarmersStore().fetchFarmers({ ...queryParams, ...useRoute().query });
  },
  { deep: true }
);
</script>
