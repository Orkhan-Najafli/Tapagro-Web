<template>
  <div class="bg-gray-100 pt-3 min-h-screen">
    <div class=" flex flex-col max-w-[1224px] w-full px-6 xl:px-0 container mx-auto">
      <!-- <div class="flex flex-row "> -->
      <div class="flex flex-col mt-6 mb-5 md:mb-9">
        <nuxt-link tag="a"
          class="text-gray-600 flex flex-row justify-start items-center md:hidden font-medium text-sm cursor-pointer"
          to="/">
          <svg width="6" height="9" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 8.5L1 5L4.5 1.5" stroke="#111827" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>

          <span class="ml-3 text-gray-600 font-medium text-sm">
            {{ t("main_page") }}</span>
        </nuxt-link>
        <ClientOnly>
          <a-breadcrumb class="hidden md:block" separator=">">
            <a-breadcrumb-item class="text-sm leading-5 font-normal" href="">
              <nuxt-link to="/">
                <span class="text-gray-600 font-medium text-sm">
                  {{ t("main_page") }}</span></nuxt-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item class="text-sm leading-5 font-normal">
              <span class="text-gray-800 font-semibold text-sm">
                {{ t("cabinet") }}</span>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </ClientOnly>
      </div>
      <div class="flex flex-col xl:flex-row pb-28 w-full min-w-full h-auto">
        <div class="lg:mr-14">
          <AsideInCabinet />
        </div>
        <div class="w-full">
          <NuxtPage />
        </div>
      </div>
      <!-- </div> -->
    </div>

  </div>
</template>

<script setup lang="ts">

const { t } = useI18n()
definePageMeta({
  middleware: ['guest'],
  // key: route => route.slug,
  transition: {
    name: 'page',
  },
  keepalive: {
    // exclude: ['']
  },
})
// export default {
//   // layout: "landing-page-layout",
//   middleware: "auth",
//   components: {
//     GeneralAside,
//   },
//   data() {
//     return {
//       screenHeight: 0,
//     };
// },
// };
</script>
<style>
* {
  font-family: "Inter", sans-serif;
  font-style: normal;
}
</style>
