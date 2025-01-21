import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { JoinUs } from "~/utils/types/join-us";

export const useJoinUsStore = defineStore("Join-us", {
  state: () => ({
    sections: [] as Array<JoinUs>,
    status: "" as string,
    statusApplications: "" as string,
    error: null as null | Error,
    errorApplications: null as null | Error,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getSections: (state) => state.sections,
    getStatus: (state) => state.status,
  },
  actions: {
    async fetchSections(queryData?: any) {
      const { data, status, error } = await useAsyncData<Array<JoinUs>>(
        "join-us",
        () =>
          $fetch(`${this.baseURL}${urls.join_us_sections}`, {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
            },
            query: queryData,
          })
      );
      this.sections = data.value as Array<JoinUs>;
      this.status = status.value;
      this.error = error.value;
    },
    async fetchApplications(queryData?: any) {

      const { data, status, error } = await useAsyncData<any>(
        "applications-post",
        () =>
          $fetch(`${this.baseURL}${urls.join_us_applications}`, {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
              // "Content-Type": "multipart/form-data",
              "Content-Disposition": queryData,
            },
            body: queryData,
            method: "POST",
          })
      );

      this.statusApplications = status.value;
      this.errorApplications = error.value;
    },
  },
});
