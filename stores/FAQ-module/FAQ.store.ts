import { HeaderConfigs } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { FrequentlyAskedQuestions } from "~/utils/types/FAQ";

export const useFAQStore = defineStore("FAQ", {
  state: () => ({
    frequently_asked_questions: [] as Array<FrequentlyAskedQuestions>,
    status: "" as string,
    error: null as null | Error,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getFrequentlyAskedQuestions: (state) => state.frequently_asked_questions,
    getStatus: (state) => state.status,
  },
  actions: {
    async fetchFAQ(queryData?: any) {
      const { data, status, error } = await useAsyncData<
        Array<FrequentlyAskedQuestions>
      >("FAQ-fetch", () =>
        $fetch(`${this.baseURL}${urls.frequently_asked_questions}`, {
          headers: {
            ...HeaderConfigs({
              Authorization: useCookie("token").value || "",
            }),
          },
          query: queryData,
        })
      );
      this.frequently_asked_questions = data?.value?.map((item) => {
        return {
          ...item,
          visible: false,
        };
      }) as Array<FrequentlyAskedQuestions>;
      this.status = status.value;
      this.error = error.value;
    },
  },
});
