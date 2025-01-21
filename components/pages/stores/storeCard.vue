<template>
  <nuxt-link
    tag="a"
    @click="useStoreDetailStore().fetchStore(data.id)"
    :to="`/magazalar/magaza-etraflisi/${data.id}`"
    class="flex flex-col justify-between w-full shadow-sm hover:shadow-md rounded-md bg-white border border-gray-200 p-8"
  >
    <div class="flex flex-row items-center">
      <div
        class="w-20 h-20 p-3 flex flex-shrink-0 justify-center items-center rounded-full text-center bg-[#F0FDF4] mr-5"
      >
        <img
          class="w-full h-full"
          :src="`${useRuntimeConfig().public.baseURL}/${props.data.logoPath}`"
          @error="setDefaultStoreImage"
        />
      </div>

      <div>
        <h4 class="font-semibold text-lg text-[#4B5563]">
          {{ props.data.name }}
        </h4>
        <span class="font-normal text-sm text-[#6B7280]">
          {{ props.data.productCount }} {{ $t("product") }}
        </span>
      </div>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object,
    default: {},
    required: true,
  },
});

const defaultImagePath = await import("@/assets/img/store_logo.svg");
const setDefaultStoreImage = (event: Event | any) => {
  event.target.src = defaultImagePath.default;
  event.target.className = "p-2";
};
</script>
