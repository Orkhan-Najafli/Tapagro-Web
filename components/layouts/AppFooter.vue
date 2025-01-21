<template>
  <footer class="flex w-full min-w-full h-auto bg-gray-50 z-30">
    <div class="px-6 xl:px-0 max-w-[1224px] container mx-auto">
      <div class="block md:pt-10 pt-9 md:flex">
        <div class="md:w-1/2 w-full mb-7 md:mb-0">
          <div class="flex-shrink-0 cursor-pointer">
            <a v-if="useRoute().path == '/'" href="/">
              <TapagroLogo />
            </a>
            <nuxt-link to="/" tag="a" v-else href="/" class="flex-shrink-0 cursor-pointer">
              <TapagroLogo />
            </nuxt-link>
          </div>
          <p class="text-sm font-normal text-gray-600 md:w-2/3 leading-7 m-0 p-0">
            {{ t("about_tapagro") }}
          </p>
        </div>
        <div class="flex flex-col md:flex-row md:mt-3.5 w-auto justify-between items-start md:w-1/2">
          <div class="w-full md:w-auto">
            <h3 class="text-sm font-bold text-gray-600 mb-4 md:mb-3">
              {{ t("main_links") }}
            </h3>
            <ul class="flex flex-col lg:flex-row justify-between md:px-0 md:block m-0">
              <nuxt-link tag="li" to="/magazalar"
                class="block cursor-pointer hover:text-green-500 text-sm leading-4 font-normal text-gray-600 mb-3 md:mb-2">{{
                  t("stores") }}
              </nuxt-link>
              <nuxt-link tag="li" to="/mehsullar"
                class="block cursor-pointer hover:text-green-500 text-sm leading-4 font-normal text-gray-600 mb-3 md:mb-2">{{
                  t("products") }}
              </nuxt-link>
              <nuxt-link tag="li" to="/fermer-mehsullari/yeni-elan"
                class="block cursor-pointer hover:text-green-500 text-sm leading-4 font-normal text-gray-600 mb-3 md:mb-2">{{
                  t("post_an_ad") }}
              </nuxt-link>
              <nuxt-link tag="li" to="/fermerler"
                class="block cursor-pointer hover:text-green-500 text-sm leading-4 font-normal text-gray-600 mb-3">{{
                  t("farmers") }}
              </nuxt-link>
            </ul>
          </div>
          <div class="w-full md:w-auto">
            <h3 class="text-sm h-5 font-bold text-gray-600 m-0 p-0 md:mb-3">
              <!-- {{ text["tapagro-links"] }} -->
            </h3>
            <ul class="flex flex-col lg:flex-row justify-between md:px-0 md:block m-0">
              <nuxt-link tag="li" to="/haqqimizda"
                class="block cursor-pointer hover:text-green-500 text-sm leading-4 font-normal text-gray-600 mb-3 md:mb-2">{{
                  t("about") }}
              </nuxt-link>
              <nuxt-link tag="li" to="/"
                class="block cursor-pointer hover:text-green-500 text-sm leading-4 font-normal text-gray-600 mb-3 md:mb-2">{{
                  t("terms_of_use") }}
              </nuxt-link>
              <nuxt-link tag="li" to="/advertising"
                class="block cursor-pointer hover:text-green-500 text-sm leading-4 font-normal text-gray-600 mb-3 md:mb-2">{{
                  t("ad_banner") }}
              </nuxt-link>
              <nuxt-link tag="li" to="/bize-qosul"
                class="block cursor-pointer hover:text-green-500 text-sm leading-4 font-medium text-gray-600 mb-3 md:mb-2">{{
                  t("join_us") }}
              </nuxt-link>
            </ul>
          </div>
          <div class="w-full md:w-auto">
            <h3 class="text-sm font-bold text-gray-600 mb-4 md:mb-2 mt-5 md:mt-0">
              {{ t("contanct_us") }}
            </h3>
            <ul class="flex flex-col lg:flex-row justify-between md:px-0 md:block m-0">
              <li
                class="cursor-pointer text-sm leading-4 font-semibold text-[#059669] mb-1.5 flex justify-start items-center">
                <span class="w-6 h-6 mr-2 bg-[#ECFDF5] rounded-md flex justify-center items-center">
                  <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.199951 1.29995C0.199951 0.96858 0.46858 0.699951 0.799951 0.699951H2.09168C2.38498 0.699951 2.63529 0.911999 2.68351 1.20131L3.1271 3.86284C3.1704 4.12266 3.03919 4.38033 2.80359 4.49813L1.87471 4.96257C2.54449 6.62694 3.87296 7.95542 5.53733 8.6252L6.00177 7.69631C6.11957 7.46072 6.37725 7.3295 6.63707 7.3728L9.29859 7.81639C9.5879 7.86461 9.79995 8.11492 9.79995 8.40823V9.69995C9.79995 10.0313 9.53132 10.3 9.19995 10.3H7.99995C3.69213 10.3 0.199951 6.80777 0.199951 2.49995V1.29995Z"
                      fill="#059669" />
                  </svg>
                </span>
                <span> +994 70 555 75 58</span>
              </li>
              <li class="cursor-pointer text-sm leading-4 font-semibold text-[#059669] flex items-center">
                <span class="w-6 h-6 mr-2 bg-[#ECFDF5] rounded-md flex justify-center items-center">
                  <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.202012 2.03004L4.99998 4.42902L9.79801 2.03C9.76182 1.39979 9.23929 0.899902 8.60001 0.899902H1.40001C0.760723 0.899902 0.238193 1.39981 0.202012 2.03004Z"
                      fill="#059669" />
                    <path
                      d="M9.80001 3.37065L4.99998 5.77066L0.200012 3.37068V6.8999C0.200012 7.56264 0.737271 8.0999 1.40001 8.0999H8.60001C9.26275 8.0999 9.80001 7.56264 9.80001 6.8999V3.37065Z"
                      fill="#059669" />
                  </svg></span>
                <span>Info@tapagro.az</span>
              </li>
            </ul>
            <div class="w-full mt-6">
              <div class="flex-col text-sm font-normal text-gray-600 flex items-start justify-start">
                <span class="mb-2 text-[#4B5563] font-bold text-sm">
                  {{ t("social_media") }}
                </span>
                <div class="flex flex-row text-[#059669]">
                  <a target="_blank" href="https://www.facebook.com/profile.php?id=100091985179382"
                    class="text-[#059669] mr-3">
                    <a-icon type="facebook" theme="filled" class="bg-[#ECFDF5] p-1" />
                  </a>
                  <a target="_blank" href="https://www.instagram.com/tapagro.az/" class="text-[#059669]">
                    <a-icon type="instagram" theme="filled" class="bg-[#ECFDF5] p-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr class="my-6" />
      <div class="flex flex-col lg:flex-row justify-between items-center pb-4">
        <p class="text-xs font-light text-gray-500 leading-6 p-0 m-0 mb-4 md:mb-0">
          {{ t("copyright") }}
        </p>

        <p class="text-gray-500 text-sm p-0 m-0" v-html="t('platform_developed_by_the_company', {
          tag: `<a
          href=&quot;https://digirella.az/&quot;
          target=&quot;_blank&quot;
          class=&quot;text-[#7DC819] hover:text-[#7DC819]&quot;
                  a </a
        >`,
            })
          "></p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
