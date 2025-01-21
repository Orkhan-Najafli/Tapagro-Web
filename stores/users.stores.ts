import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { HeaderConfigs } from "@/utils/configs";
import { useRuntimeConfig } from "#app";
import type { User } from "~/utils/types/users";

export const useUsersStore = defineStore("Users", {
  state: () => ({
    userData: {} as User,
    userError: null as any,
    userStatus: "",
    userEditError: null as any,
    userEditStatus: "",
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getUserData: (state) => state.userData,
    getUserStatus: (state) => state.userStatus,
    getUserEditError: (state) => state.userEditError,
    getUserEditStatus: (state) => state.userEditStatus,
  },
  actions: {
    resetUserData(){
      this.userStatus = ""
      this.userError = null
    },
    //userData
    async fetchUserData() {
      // navigateTo("/");
      const { data, status, error } = await useAsyncData<User>("Users", () =>
        $fetch(`${this.baseURL}${urls.users}`, {
          headers: {
            ...HeaderConfigs({ Authorization: useCookie("token").value || "" }),
          },
          method: "GET",
        })
      );

      this.userStatus = status.value;
      this.userError = error.value || null;
      this.userData = data.value!;
    },
    async fetchEditUserData(queryParams:any) {
      // navigateTo("/");
      const { data, status, error } = await useAsyncData<User>("Users", () =>
        $fetch(`${this.baseURL}${urls.users}`, {
          headers: {
            ...HeaderConfigs({ Authorization: useCookie("token").value || "" }),
          },
          body:queryParams,
          method: "PATCH",
        })
      );

      this.userEditStatus = status.value;
      this.userEditError = error.value || null;
    },
  },
});
