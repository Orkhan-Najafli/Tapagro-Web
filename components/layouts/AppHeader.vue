<template>
  <nav class="flex flex-col w-full bg-white">
    <div ref="navbar" class="w-full h-auto min-w-full z-50 bg-white">
      <div class="h-auto w-full flex items-start justify-between mx-auto px-6 xl:px-0 max-w-[1224px] container">
        <div class="flex flex-col items-center w-full h-auto justify-between">
          <div class="flex flex-row justify-between items-center w-full h-auto">
            <div class="">
              <a v-if="useRoute().path == '/'" href="/"
                class="flex-shrink-0 cursor-pointer text-emerald-600 hover:text-emerald-600">
                <TapagroLogo />
              </a>
              <nuxt-link to="/" tag="a" v-else href="/" class="flex-shrink-0 cursor-pointer">
                <TapagroLogo />
              </nuxt-link>
            </div>

            <div class="hidden lg:flex flex-row items-center">
              <a-tooltip placement="bottom">
                <template #title>
                  <span>
                    {{ t("frequently_asked_questions") }}
                  </span>
                </template>
                <div @click="showFAQ" class="flex flex-row items-center cursor-pointer ml-6">
                  <question_icon />
                </div>
              </a-tooltip>
              <a-tooltip v-if="useAuthenticator().getToken" placement="bottom">
                <template #title>
                  <span>
                    {{ t("region") }}
                  </span>
                </template>
                <div @click="selectRegion" class="flex flex-row items-center cursor-pointer ml-6">
                  <div
                    class="w-9 h-9 rounded-full overflow-hidden flex mr-2 justify-center items-center bg-emerald-100">
                    <img width="20px" height="26px" class="block" src="../../assets/img/areas.svg" alt="" />
                  </div>
                  <p v-if="useUsersStore().getUserData?.city" class="text-gray-500 p-0 m-0">
                    {{ useUsersStore().getUserData?.city?.name }}
                  </p>
                  <p v-else class="p-0 m-0 text-gray-500">{{ t("region") }}</p>
                </div>
              </a-tooltip>

              <div class="m-0 p-0 mx-6">
                <a-tooltip placement="bottom">
                  <template #title>
                    <span>
                      {{ t("my_favorite") }}
                    </span>
                  </template>
                  <ClientOnly>

                    <a-badge @click="$event.stopPropagation()"
                      :count="useAuthenticator().getToken ? useFavoriteProductsStore().getCount : useCookie<number[]>('favoriteProducts', { default: () => [] }).value.length"
                      :number-style="{
                        backgroundColor: '#FCD34D',
                        color: '#065F46',
                        minWidth: '15px',
                        height: '15px',
                        lineHeight: '15px',
                      }">
                      <nuxt-link tag="a" class="relative p-0 m-0 cursor-pointer" to="/beyenilmis-mehsullar">
                        <favorite_icon />
                      </nuxt-link>
                    </a-badge>
                  </ClientOnly>
                </a-tooltip>

              </div>
              <nuxt-link v-if="useAuthenticator().getToken" tag="a"
                class="relative text-emerald-800 hover:text-emerald-800 mr-9 text-base leading-4 font-normal cursor-pointer"
                to="/sebet">
                <ClientOnly>
                  <a-badge v-if="
                    useShoppingStore().getShoppingCartsCountStatus ===
                    'success'
                  " :count="useShoppingStore().getShoppingCartsCount" :number-style="{
                    backgroundColor: '#FCD34D',
                    color: '#065F46',
                    minWidth: '15px',
                    height: '15px',
                    lineHeight: '15px',
                  }">
                    <ShoppingCartOutlined class="text-2xl text-emerald-800" />
                  </a-badge>
                </ClientOnly>
              </nuxt-link>
              <div class="m-0 p-0 mr-9">
                <a-tooltip placement="bottom">
                  <template #title>
                    <span>
                      {{ t("compare") }}
                    </span>
                  </template>

                  <a-badge @click="$event.stopPropagation()" :count="useAuthenticator().getToken
                    ? useComparisonBasketsStore().getComparisonCount
                    : useProductsStore().getProducts.size
                    " :number-style="{
                      backgroundColor: '#FCD34D',
                      color: '#065F46',
                      minWidth: '15px',
                      height: '15px',
                      lineHeight: '15px',
                    }">
                    <nuxt-link tag="a" class="relative p-0 m-0 cursor-pointer" to="/mehsullarin-muqayisesi">
                      <scale_logo_in_header />
                    </nuxt-link>
                  </a-badge>
                </a-tooltip>
              </div>

              <div class="mr-8">
                <a-dropdown :trigger="['click']" placement="bottom" :arrow="{ pointAtCenter: true }">
                  <div class="inline-flex justify-start items-center flex-row cursor-pointer">
                    <span>
                      <img v-if="useCookie('flagPath').value"
                        class="border border-gray-400 min-w-[28px] min-h-[21px] w-7 h-[21px] rounded-sm"
                        :src="`${baseURL}/${useCookie('flagPath').value}`" @error="setDefaultImage" />
                      <AZE v-else />
                    </span>
                    <DownOutlined class="text-green-600 ml-1" />
                  </div>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item v-for="(language, index) in useLanguagesStore()
                        .getLanguages" :key="index" @click="changeLang(language)">
                        <div class="flex flex-row justify-start items-center">
                          <img class="min-w-[28px] min-h-[21px] w-7 h-[21px] rounded-sm"
                            :src="`${baseURL}/${language.flagPath}`" @error="setDefaultImage" />
                          <span class="ml-2">{{ language.countryCode }}</span>
                        </div>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </div>
              <div>
                <button @click="useAuthenticator().fetchGenerateUrl()" v-if="!useAuthenticator().getToken"
                  class="flex flex-row justify-center items-center cursor-pointer px-5 py-3 rounded-xl border border-lime-700">
                  <Digital />
                  <Login class="mx-1" />
                  <span class="bg-[#0059FF] w-[7px] h-[7px] rounded-full"></span>
                </button>
                <div v-else class="flex flex-row justify-between items-center cursor-pointer">
                  <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link text-gray-500 flex flex-row justify-between items-center cursor-pointer"
                      @click="(e) => e.preventDefault()">
                      <span
                        class="w-9 h-9 rounded-full flex justify-center items-center bg-emerald-50 text-emerald-600 m-0 p-0 mr-3">
                        <UserOutlined class="text-emerald-600 text-sm" />
                      </span>
                      <span class="text-emerald-800">
                        <DownOutlined class=" text-sm" />
                      </span>
                    </a>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item class="border-b border-gray-300 !mb-1" key="0">
                          <p class="p-0 m-0 font-medium text-base text-[#9CA3AF]">
                            {{
                              useUsersStore().getUserData &&
                              `${useUsersStore().getUserData.firstName} ${useUsersStore().getUserData.lastName
                              }`
                            }}
                          </p>
                        </a-menu-item>
                        <a-menu-item key="1">
                          <nuxt-link to="/kabinet/tenzimlemelerim" tag="a" active-class="text-emerald-600" style="
                              display: flex;
                              justify-content: flex-start;
                              align-items: center;
                            " class="flex m-0 p-0">
                            <span class="w-4 h-4 rounded-full inline-flex justify-center items-center m-0 p-0 mr-3">
                              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M3.12104 15.8037C5.15267 14.6554 7.4998 14 10 14C12.5002 14 14.8473 14.6554 16.879 15.8037M13 8C13 9.65685 11.6569 11 10 11C8.34315 11 7 9.65685 7 8C7 6.34315 8.34315 5 10 5C11.6569 5 13 6.34315 13 8ZM19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                                  stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                            </span>
                            <p class="p-0 m-0 font-medium text-base inline-block">
                              {{ t("my_account") }}
                            </p>
                          </nuxt-link>
                        </a-menu-item>
                        <a-menu-item @click="useAuthenticator().logOut()" key="2">
                          <!-- @click="SSO.logout" -->
                          <div class="flex flex-row items-center m-0 p-0">
                            <span class="w-4 h-4 rounded-full flex justify-center items-center m-0 p-0 mr-3">
                              <svg width="16" height="16" viewBox="0 0 20 18" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M15 13L19 9M19 9L15 5M19 9L5 9M11 13V14C11 15.6569 9.65686 17 8 17H4C2.34315 17 1 15.6569 1 14V4C1 2.34315 2.34315 1 4 1H8C9.65686 1 11 2.34315 11 4V5"
                                  stroke="#374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                              </svg>
                            </span>
                            <p class="p-0 m-0 font-medium text-base">
                              {{ t("log_out") }}
                            </p>
                          </div>
                        </a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- lg:hidden -->
        <div class="flex flex-row lg:hidden relative h-14 items-center cursor-pointer mobile-box z-40">
          <div>
            <a-tooltip placement="bottom">
              <template #title>
                <span>
                  {{ t("frequently_asked_questions") }}
                </span>
              </template>
              <div @click="showFAQ" class="flex flex-row items-center cursor-pointer">
                <question_icon />
              </div>
            </a-tooltip>
          </div>

          <div class="m-0 p-0 mx-6">
            <a-tooltip placement="bottom">
              <template #title>
                <span>
                  {{ t("my_favorite") }}
                </span>
              </template>

              <a-badge @click="$event.stopPropagation()"
                :count="useAuthenticator().getToken ? useFavoriteProductsStore().getCount : useCookie<number[]>('favoriteProducts', { default: () => [] }).value.length"
                :number-style="{
                  backgroundColor: '#FCD34D',
                  color: '#065F46',
                  minWidth: '15px',
                  height: '15px',
                  lineHeight: '15px',
                }">
                <!-- :count="
              loggedIn ? getFavoriteCount : getFavoriteProducts.length
            " -->
                <nuxt-link tag="a" class="relative p-0 m-0 cursor-pointer" to="/beyenilmis-mehsullar">
                  <favorite_icon />
                </nuxt-link>
              </a-badge>
            </a-tooltip>
          </div>
          <div v-if="useAuthenticator().getToken">
            <a class="text-emerald-800 hover:text-green-800">
              <nuxt-link tag="a" class="relative text-base leading-4 text-emerald-800 font-normal cursor-pointer"
                to="/sebet">
                <a-badge :count="useShoppingStore().getShoppingCartsCountStatus ===
                  'success' && useShoppingStore().getShoppingCartsCount
                  " :number-style="{
                    backgroundColor: '#FCD34D',
                    color: '#065F46',
                    minWidth: '15px',
                    height: '15px',
                    lineHeight: '15px',
                  }">
                  <!-- basketCount -->
                  <ShoppingCartOutlined class="text-2xl text-emerald-800" />
                </a-badge>
              </nuxt-link>
            </a>
          </div>
          <div class="m-0 p-0 mx-6">
            <a-tooltip placement="bottom">
              <template #title>
                <span>{{ t("compare") }}</span>
              </template>

              <a-badge @click="$event.stopPropagation()" :count="3" :number-style="{
                backgroundColor: '#FCD34D',
                color: '#065F46',
                minWidth: '15px',
                height: '15px',
                lineHeight: '15px',
              }">
                <!-- :count="loggedIn ? getCount : getCompareProducts.length" -->
                <nuxt-link tag="a" class="relative p-0 m-0 cursor-pointer" to="/mehsullarin-muqayisesi">
                  <scale_logo_in_header />
                </nuxt-link>
              </a-badge>
            </a-tooltip>
          </div>
          <div @click="mobileMenu" class="relative inline-block w-6 h-6 bg-transparent overflow-hidden">
            <span :class="{
              'mt-2 rotate-45': mobileMenuShow,
            }" class="absolute bg-black h-0.5 w-10 top-1 -left-1 block transform transition-all duration-200"></span>
            <span :class="{
              'left-10': mobileMenuShow,
            }" class="absolute bg-black h-0.5 w-10 top-3 -left-1 block transform transition-all duration-200"></span>
            <span :class="{
              '-mt-3.5 -rotate-45': mobileMenuShow,
            }" class="absolute bg-black h-0.5 w-10 top-5 -left-1 block transform transition-all duration-200"></span>
          </div>

          <ul :class="{
            'h-0 pb-0': !mobileMenuShow,
            'h-auto pb-4': mobileMenuShow,
          }"
            class="bg-white absolute w-56 right-0 top-0 mt-11 flex flex-col gap-3 shadow-2xl transition-all duration-300 overflow-hidden rounded-md">
            <li class="pl-5 pt-4 border-b border-gray-300 pb-4">
              <button v-if="!useAuthenticator().getToken"
                class="flex flex-row justify-center items-center cursor-pointer px-5 py-3 rounded-xl border border-lime-700">
                <!-- @click="SSO.generateLoginUrl" -->

                <Digital />
                <Login class="mx-1" />
                <span class="bg-[#0059FF] w-[7px] h-[7px] rounded-full"></span>
              </button>
              <div v-else>
                <nuxt-link tag="a" to="/kabinet/tenzimlemelerim" class="flex flex-row items-center cursor-pointer"
                  active-class="text-emerald-600">
                  <p @click="mobileMenuShow = false"
                    class="p-0 m-0 font-medium text-base mr-3 text-[#9CA3AF] capitalize">
                    {{
                      useUsersStore().getUserData &&
                      `${useUsersStore().getUserData.firstName} ${useUsersStore().getUserData.lastName
                      }`
                    }}
                  </p>
                </nuxt-link>
              </div>
            </li>
            <li @click="addQueryRouteProduct">
              <nuxt-link tag="a" class="cursor-pointer pt-1 pb-1 px-5 w-28 h-6 text-sm leading-4 text-gray-700"
                active-class="text-green-500" to="/mehsullar">
                {{ t("products") }}
              </nuxt-link>
            </li>
            <li @click="addQueryRouteStore">
              <nuxt-link tag="a" class="cursor-pointer pt-1 pb-1 px-5 w-28 h-6 text-sm leading-4 text-gray-700"
                active-class="text-green-500" to="/fermerler">
                {{ t("farmers") }}
              </nuxt-link>
            </li>
            <li @click="addQueryRouteStore">
              <nuxt-link tag="a" class="cursor-pointer pt-1 pb-1 px-5 w-28 h-6 text-sm leading-4 text-gray-700"
                active-class="text-green-500" to="/magazalar">
                {{ t("stores") }}
              </nuxt-link>
            </li>

            <li @click="mobileMenuShow = false">
              <nuxt-link exact tag="a" class="cursor-pointer pt-1 pb-1 px-5 w-28 h-6 text-sm leading-4 text-gray-700"
                active-class="text-green-500" to="/haqqimizda">
                {{ t("about") }}
              </nuxt-link>
            </li>
            <li @click="mobileMenuShow = false">
              <nuxt-link @click="contactInfo" exact to="/bize-qosul" tag="a"
                class="cursor-pointer pt-1 pb-1 px-5 w-28 h-6 text-sm leading-4 text-gray-700"
                active-class="text-green-500">
                {{ t("join_us") }}
              </nuxt-link>
            </li>
            <li v-if="useAuthenticator().getToken" class="w-full border-b border-gray-300"></li>
            <li @click="mobileMenuShow = false" v-if="useAuthenticator().getToken">
              <nuxt-link tag="a" class="cursor-pointer pt-1 pb-1 px-5 w-28 h-6 text-sm leading-4 text-gray-700"
                active-class="text-green-500" to="/kabinet/tenzimlemelerim">
                {{ t("my_account") }}
              </nuxt-link>
            </li>
            <li @click="mobileMenuShow = false" v-if="useAuthenticator().getToken">
              <div @click="useAuthenticator().logOut()"
                class="cursor-pointer py-1 px-5 w-28 h-6 text-sm leading-4 text-gray-700">
                {{ t("log_out") }}
              </div>
            </li>

            <li class="py-1 px-5">
              <a-dropdown :trigger="['click']" placement="bottom" :arrow="{ pointAtCenter: true }">
                <div class="inline-flex justify-start items-center flex-row cursor-pointer">
                  <span>
                    <img v-if="useCookie('flagPath').value"
                      class="border border-gray-400 min-w-[28px] min-h-[21px] w-7 h-[21px] rounded-sm"
                      :src="`${baseURL}/${useCookie('flagPath').value}`" @error="setDefaultImage" />
                    <AZE v-else />
                  </span>
                  <DownOutlined class="text-green-600 ml-1" />
                </div>
                <!-- <a-button></a-button> -->
                <template #overlay>
                  <a-menu>
                    <a-menu-item v-for="(language, index) in useLanguagesStore()
                      .getLanguages" :key="index" @click="changeLang(language)">
                      <div class="flex flex-row justify-start items-center">
                        <img class="min-w-[28px] min-h-[21px] w-7 h-[21px] rounded-sm"
                          :src="`${baseURL}/${language.flagPath}`" @error="setDefaultImage" />
                        <span class="ml-2">{{ language.countryCode }}</span>
                      </div>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </li>
          </ul>
        </div>
        <!-- lg:hidden -->


      </div>

      <div v-if="useAuthenticator().getToken"
        class="flex lg:hidden py-1 pt-4 px-5 justify-start items-center w-full h-auto border-t border-gray-300 bg-white">
        <a-tooltip placement="bottom">
          <template #title>
            <span>
              {{ t("region") }}
            </span>
          </template>
          <div @click="selectRegion" class="flex flex-row items-center cursor-pointer">
            <div class="w-9 h-9 rounded-full overflow-hidden flex mr-2 justify-center items-center bg-emerald-100">
              <img width="20px" height="26px" class="block" src="../../assets/img/areas.svg" alt="" />
            </div>
            <p v-if="useUsersStore().getUserData?.city" class="text-emerald-800 p-0 m-0">
              {{ useUsersStore().getUserData?.city?.name }}
            </p>
            <p v-else class="p-0 m-0 text-emerald-800">
              {{ t("region") }}
            </p>
          </div>
        </a-tooltip>
      </div>
      <div class="w-full min-w-full h-auto">
        <warning-message></warning-message>
      </div>

      <div class="hidden lg:flex items-center justify-between w-full h-auto">
        <ul class="flex flex-row justify-center items-center w-full m-0 bg-neutral-50 py-3">
          <li @click="addQueryRouteProduct">
            <nuxt-link tag="a"
              class="relative py-1 px-1 w-28 h-6 text-gray-500 hover:text-green-500 text-base leading-4 font-normal cursor-pointer"
              to="/mehsullar" active-class="text-green-500 border-b border-green-500 pb-2">
              {{ t("products") }}
            </nuxt-link>
          </li>
          <li @click="addQueryRouteStore">
            <nuxt-link tag="a"
              class="relative py-1 px-1 ml-4 w-28 h-6 text-gray-500 hover:text-green-500 text-base leading-4 font-normal cursor-pointer"
              to="/magazalar" active-class="text-green-500 border-b border-green-500 pb-2">
              {{ t("stores") }}
            </nuxt-link>
          </li>
          <li @click="addQueryRouteStore">
            <nuxt-link tag="a"
              class="relative py-1 px-1 mx-4 w-28 h-6 text-gray-500 hover:text-green-500 text-base leading-4 font-normal cursor-pointer"
              to="/fermerler" active-class="text-green-500 border-b border-green-500 pb-2">
              {{ t("farmers") }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link exact="" tag="a"
              class="relative pt-1 px-1 w-28 h-6 text-gray-500 hover:text-green-500 text-base leading-4 font-normal cursor-pointer"
              active-class=" text-green-500 border-b border-green-500 pb-2" to="/haqqimizda">
              {{ t("about") }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link tag="a" @click="contactInfo" exact to="/bize-qosul"
              class="relative pt-1 px-1 mx-4 w-28 h-6 text-gray-500 hover:text-green-500 text-base leading-4 font-normal cursor-pointer"
              active-class="text-green-500 border-b border-green-500 pb-2">
              {{ t("join_us") }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <FAQModal @handleCancel="visibleFAQ = false" v-if="visibleFAQ" />
    <ShoppingModal />
    <LoginRequiredModal />
  </nav>
</template>
<script setup lang="ts">
import AZE from "@/components/svg/aze_icon.vue";
import type { Language } from "~/utils/types/language";
// variables
const { t } = useI18n();
const { locale } = useI18n({ useScope: "global" });
const baseURL = useRuntimeConfig().public.baseURL;
const mobileMenuShow = ref(false);
const visibleFAQ = ref(false);
const showFAQ = function () {
  visibleFAQ.value = true;
};
const navbar = ref<HTMLElement>();

//methods
useFavoriteProductsStore().fetchFavoriteCount()
useShoppingStore().fetchShoppingCartsCount();
useUsersStore().fetchUserData();
useLanguagesStore().fetchLanguages();
const scrollListener = function () {
  var scrollHeight = window.scrollY;

  if (scrollHeight > 0) {
    navbar.value?.classList.add("fixed");
  } else {
    navbar.value?.classList.remove("fixed");
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

const changeLang = async function (language: Language) {
  await useLanguagesStore().fetchLanguages();
  locale.value = language.countryCode;
  refreshCookie("lang");
  ref(useCookie("countryCode")).value = language.countryCode;
  ref(useCookie("flagPath")).value = language.flagPath;
  await useCategoriesStore().fetchBaseCategories();
};
changeLang({
  countryCode: ref(useCookie("countryCode")).value
    ? `${ref(useCookie("countryCode")).value}`
    : "AZE",
  flagPath: `${ref(useCookie("flagPath")).value}`,
});

const mobileMenu = function (event: Event) {
  let box = document.getElementsByClassName("mobile-box")[0];
  if (event.composedPath().includes(box)) {
    mobileMenuShow.value = !mobileMenuShow.value;
  }
};
const selectRegion = function () {
  //   this.$store.commit("setShowRegion", true);
};
const addQueryRouteStore = function () {
  mobileMenuShow.value = false;
};
const addQueryRouteProduct = function () {
  mobileMenuShow.value = false;
};
const contactInfo = function () {
  mobileMenuShow.value = false;
};
const setDefaultImage = async (event: Event | any) => {
  const noImage = await import("@/assets/img/no-image.svg");
  event.target.src = noImage.default;
  event.target.className = "w-[28px] h-[21px]";
};
// watch
// watch(
//   () => useCookie("token"),
//   (value: any, oldValue: any) => {
//     console.log("token watch....", value, oldValue);
//     useCookie("refresh-token") && useAuthenticator().fetchRefresh();
//   },
//   { deep: true }
// );
</script>
