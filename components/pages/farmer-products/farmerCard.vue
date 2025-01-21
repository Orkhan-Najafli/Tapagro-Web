<template>
  <nuxt-link
    tag="a"
    :to="`/fermerler/fermer-etraflisi/${props.data.id}`"
    class="flex flex-col justify-between w-full shadow-sm hover:shadow-md rounded-md bg-white border border-gray-200 p-8"
  >
    <div class="flex flex-row items-center">
      <div
        class="w-20 h-20 flex flex-shrink-0 justify-center items-center rounded-full text-center bg-[#F0FDF4] mr-5"
      >
        <farmer-icon class="md:w-10 md:h-10" />
      </div>

      <div>
        <h4 class="font-semibold text-lg text-[#4B5563]">
          {{ props.data.name }}
        </h4>
        <span class="font-normal text-sm text-[#6B7280]">
          {{ props.data.farmerProductCount }} {{ $t("ad") }}
        </span>
      </div>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
import type { Farmer } from "~/utils/types/farmer-product";

const props = defineProps({
  data: {
    type: Object as PropType<Farmer>,
    default: {},
  },
});
</script>
