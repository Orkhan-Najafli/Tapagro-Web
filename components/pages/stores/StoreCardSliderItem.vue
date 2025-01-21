<template>
  <nuxt-link
    tag="span"
    :to="`/magazalar/${props.store.id}`"
    class="flex flex-col justify-between w-full my-2 shadow-sm hover:shadow-md p-4 rounded-md bg-white border border-gray-200"
  >
    <div
      class="flex flex-col justify-between items-center pt-6 pb-5 w-full h-full"
    >
      <div
        class="w-28 h-28 p-4 flex justify-center items-center rounded-full text-center bg-green-50"
      >
        <img
          class="w-full h-full"
          :src="`${baseURL}/${props.store.logoPath}`"
          @error="setDefaultStoreImage"
          :alt="store.name"
        />
      </div>
      <h4
        class="font-medium text-lg text-center text-gray-600 mt-5 mb-4 md:mt-6 md:mb-8"
      >
        {{ props.store.name }}
      </h4>

      <div>
        <span class="font-normal text-sm text-center text-gray-400"
          >{{ props.store.productCount }} {{ $t("product") }}</span
        >
      </div>
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
import type { Store } from "~/utils/types/stores";

let props = defineProps({
  store: {
    type: Object as PropType<Store>,
    default: new Set(),
  },
});
// variables
const baseURL = useRuntimeConfig().public.baseURL;

// methods
const defaultImagePath = await import("@/assets/img/store_logo.svg");
const setDefaultStoreImage = (event: Event | any) => {
  event.target.src = defaultImagePath.default;
  event.target.className = "p-2";
};
</script>

<style scoped>
.store-preview-card {
  background-color: #fafffd;
}

.img-div {
  background: linear-gradient(
    180deg,
    rgba(214, 252, 236, 0.53) 0%,
    rgba(238, 254, 244, 0.58) 100%
  );
}
</style>
