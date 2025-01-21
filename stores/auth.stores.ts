import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { HeaderConfigs } from "@/utils/configs";
import { useRuntimeConfig } from "#app";
import type { Login } from "~/utils/types/auth";

export const useAuthenticator = defineStore("Authenticator", {
  state: () => ({
    url: "",
    access: {} as Login,
    refreshError: null as null | Error,
    refreshStatus: "",
    loginError: null as any,
    loginStatus: "",
    generateUrlError: null as any,
    generateUrlStatus: "",
    token: useCookie("token"),
    refresh_token: useCookie("refresh_token"),
    requiredLoginVisible: false,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getToken: (state) => state.token,
    getRefreshToken: (state) => state.refresh_token,
    getRequiredLoginVisible: (state) => state.requiredLoginVisible,
  },
  actions: {
    setRequiredLoginVisible(visible: boolean) {
      this.requiredLoginVisible = visible;
    },

    //logout
    async logOut(){
      useCookie('token').value=undefined
      useCookie('refresh_token').value=undefined
      this.token=undefined
      this.refresh_token = undefined
      this.loginStatus = ""
      this.loginError = null
    },
    //Generate-url
    async fetchGenerateUrl() {
      const { data, status, error } = await useAsyncData<{ url: string }>(
        "GenerateUrl",
        () =>
          $fetch(`${this.baseURL}${urls["generate-url"]}`, {
            headers: {
              ...HeaderConfigs(),
            },
            method: "POST",
            body: {
              cabinet: "WEBSITE",
            },
          })
      );
      this.url = data.value?.url || "";
      window.location.href = String(data.value?.url) || "";
      this.generateUrlStatus = status.value;
      this.generateUrlError = error.value || null;
    },
    //login
    async fetchLogin() {
      const { code, state } = useRoute().query;
      const { data, status, error } = await useAsyncData<Login>("Login", () =>
        $fetch(`${this.baseURL}${urls.login}`, {
          headers: {
            ...HeaderConfigs(),
          },
          method: "POST",
          body: {
            code: code,
            state: state,
            cabinet: "WEBSITE",
          },
        })
      );
      if (status.value==='success') {
        let IDs = useCookie<Array<number>>("favoriteProducts").value.map((id) => ({
          productId: id,
        }));
        useAuthenticator().getToken && useFavoriteProductsStore().fetchAllSelectedProductsAddToFavorite({
          productIds: IDs,
        });
      }
      this.access = data.value!;
      this.loginStatus = status.value;
      this.loginError = error.value || null;
      this.token = data.value?.access;
      useCookie("token").value = data.value?.access;
      useCookie("refresh-token").value = data.value?.refresh;
      if (status.value === "success") {
        await useUsersStore().fetchUserData();
        useRouter().push("/");
      } else {
        this.fetchLogin();
      }
    },
    //refresh
    async fetchRefresh() {
      const { data, status, error } = await useAsyncData<any>("Refresh", () =>
        $fetch(`${this.baseURL}${urls.refresh}`, {
          headers: {
            ...HeaderConfigs(),
          },
          method: "POST",
        })
      );
      this.refreshStatus = status.value;
      this.refreshError = error.value || null;
      this.token = data.value?.access;
      useCookie("token").value = data.value?.access;
    },
  },
});
