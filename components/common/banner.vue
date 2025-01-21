<template>
  <div
    style="height: 200px; min-height: 200px; max-height: 200px"
    class="hidden lg:block relative z-30 overflow-hidden"
  >
    <div
      class="rounded-md flex flex-col transition-all duration-500 justify-end items-center"
      v-if="!tapagrobannerShow && useBannerStore().getBanner"
      :style="{
        position: bannerFixed ? 'sticky' : 'relative',
        top: bannerFixed ? top_height : '',
      }"
    >
      <a
        v-if="useBannerStore().getBanner.redirectTo"
        target="_blank"
        :href="`${useBannerStore().getBanner.redirectTo}`"
      >
        <img
          class="bg-image-position"
          :src="`${baseURL}/${useBannerStore().getBanner.path}`"
          alt=""
        />
      </a>
      <a v-if="!useBannerStore().getBanner.redirectTo">
        <img
          class="bg-image-position"
          :src="`${baseURL}/${useBannerStore().getBanner.path}`"
          alt=""
        />
      </a>
    </div>
    <nuxt-link
      tag="div"
      :style="{
        position: bannerFixed ? 'sticky' : 'relative',
        top: bannerFixed ? top_height : '',
      }"
      v-if="tapagrobannerShow"
      :to="`/reklam-banneri`"
      class="rounded-md flex flex-col transition-all duration-500 justify-end items-center cursor-pointer"
    >
      <img
        class="bg-image-position"
        :src="`${baseURL}/${useBannerStore().getBanner.path}`"
        alt=""
      />
    </nuxt-link>
  </div>
</template>
<script setup lang="ts">
// variables
const baseURL = useRuntimeConfig().public.baseURL;
const top_height = ref("182px");
const bannerFixed = ref(false);
const tapagrobannerShow = ref(false);

// methods
ref(useCookie("bannerID")).value
  ? useBannerStore().fetchBanner({
      id: Number(ref(useCookie("bannerID")).value),
    })
  : useBannerStore().fetchBanner();
if (useRoute().path == "/fermer-mehsullari") {
  top_height.value = "200px";
}
const scrollListener = function () {
  if (window.scrollY > 96) {
    bannerFixed.value = true;
  } else {
    bannerFixed.value = false;
  }
};
onBeforeMount(() => {
  window.addEventListener("scroll", scrollListener);
});

onMounted(() => {
  scrollListener();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", scrollListener);
});
</script>
<style scoped>
.bg-image-position {
  background-origin: border-box;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  min-width: 100%;
  height: 200px;
  min-height: 200px;
  max-height: 200px;
}
</style>
