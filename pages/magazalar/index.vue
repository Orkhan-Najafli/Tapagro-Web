<template>
  <main class="overflow-hidden pt-3 min-h-screen">
    <section class="flex w-full px-6 xl:px-0 max-w-[1224px] container mx-auto">
      <div class="mt-6 mb-5 md:mb-9">
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
        <a-breadcrumb class="hidden md:block" separator=">">
          <a-breadcrumb-item class="text-sm leading-5 font-normal" href="">
            <nuxt-link to="/">
              <span class="text-gray-600 font-medium text-sm">
                {{ t("main_page") }}
              </span></nuxt-link
            >
          </a-breadcrumb-item>
          <a-breadcrumb-item class="text-sm leading-5 font-normal">
            <span class="text-gray-800 font-semibold text-sm">
              {{ t("stores") }}</span
            >
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </section>
    <section class="flex w-full px-6 xl:px-0 max-w-[1224px] container mx-auto">
      <div class="flex flex-row w-full mb-6 md:mb-10">
        <div class="w-full relative overflow-hidden">
          <section>
            <div>
              <div class="mb-6">
                <h1 class="text-2xl font-bold">{{ t("stores") }}</h1>
              </div>

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
                    v-model:value="queryParams.storeNamePhrase"
                    :allowClear="true"
                    enter-button
                    @change="submitFilter"
                    @keyup.enter="submitFilter"
                >
                </a-input-search>
              </a-config-provider>
            </div>
            <a-spin
                :spinning="useStoresStore().getStoresStatus !== 'success'"
                size="large"
                wrapper-class-name="text-green-800"
            >
              <section class="flex flex-col mb-6 md:mb-10">
                <div v-if="useStoresStore().getTotalElements <= 0">
                  <div class="text-base text-gray-600">
                    {{ t("no_store_matching_your_search_was_found") }}
                  </div>
                </div>
                <div
                    v-if="useStoresStore().getTotalElements > 0"
                    class="grid gap-9 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                >
                  <StoreCard
                      class="cursor-pointer"
                      id="store-card"
                      v-for="(farmer, index) in useStoresStore().getStores"
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
              useStoresStore().getStores.size !==
              useStoresStore().getTotalElements
            "
          >
            <div class="block w-full min-w-full rounded text-center">
              <button
                  @click="loadMoreStores"
                  class="px-8 py-1 rounded text-amber-400 border border-amber-400 hover:text-white bg-white hover:bg-amber-400 text-sm font-semibold"
              >
                {{ t("more_products") }}
              </button>
            </div>
          </section>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const {t} = useI18n()
const queryParams = reactive({
  page: useRoute().query.page ? Number(useRoute().query.page) : 0,
  size: useRoute().query.page ? (Number(useRoute().query.page) + 1) * 15 : 15,
  storeNamePhrase: useRoute().query.storeNamePhrase
      ? String(useRoute().query.storeNamePhrase)
      : undefined,
});
useStoresStore().resetStores();
useStoresStore().fetchStores({...queryParams, page: 0});

const loadMoreStores = function () {
  queryParams.page++;
  queryParams.size = 15;
  useRouter().push({query: {...useRoute().query, page: queryParams.page}});
};
const submitFilter = function () {
  useStoresStore().resetStores();
  useRouter().push({
    query: {
      ...useRoute().query,
      page: 0,
      size: 15,
      storeNamePhrase: queryParams.storeNamePhrase,
    },
  });
};
watch(
    () => useRoute().query,
    (to: any) => {
      useStoresStore().fetchStores({...queryParams, ...useRoute().query});
    },
    {deep: true}
);
</script>
