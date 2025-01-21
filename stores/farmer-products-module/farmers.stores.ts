import { HeaderConfigs, parseUrl } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type { ApiBase } from "~/utils/types";
import type {
  Farmer,
  FarmerContact,
  FarmerDTO,
} from "~/utils/types/farmer-product";

export const useFarmersStore = defineStore("farmers", {
  state: () => ({
    farmers: new Set<Farmer>() || ([] as Array<Farmer>),
    totalElements: 0 as number,
    totalPages: 0 as number,
    status: "" as string,
    error: null as null | Error,

    farmer: {} as FarmerDTO,
    farmerStatus: "" as string,

    farmerContact: {} as FarmerContact,
    farmerContactStatus: "" as string,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getFarmers: (state) => state.farmers,
    getFarmer: (state) => state.farmer,
    getFarmerContact: (state) => state.farmerContact,
    getFarmerStatus: (state) => state.farmerStatus,
    getFarmerContactStatus: (state) => state.farmerContactStatus,
    getTotalElements: (state) => state.totalElements,
    getTotalPages: (state) => state.totalPages,
    getStatus: (state) => state.status,
  },
  actions: {
    resetFarmers() {
      this.farmers = new Set();
      this.totalElements = 0;
      this.totalPages = 0;
      this.status = "";
      this.error = null;
    },
    resetFarmerContact() {
      this.farmerContact = {} as FarmerContact;
      this.farmerContactStatus = "";
    },
    async fetchFarmers(queryData: any) {
      const { data, status, error } = await useAsyncData<ApiBase<Farmer>>(
        "farmers",
        () =>
          $fetch(`${this.baseURL}${urls.farmers}`, {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
            },
            query: queryData,
          })
      );
      this.totalElements = data.value?.totalElements!;
      this.totalPages = data.value?.totalPages!;
      data.value?.content.forEach((item: Farmer) => {
        this.farmers.add(item);
      });
      this.status = status.value;
      this.error = error.value;
    },
    async fetchFarmer(queryData: any) {
      const { data, status, error } = await useAsyncData<FarmerDTO>(
        "farmer",
        () =>
          $fetch(`${this.baseURL}${urls.farmer}/${queryData}`, {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
            },
            // query: queryData,
          })
      );
      this.farmer = data.value!;
      this.farmerStatus = status.value;
      this.error = error.value;
    },
    async fetchFarmerContact(queryData: any) {
      const { data, status, error } = await useAsyncData<FarmerContact>(
        "farmer-contact",
        () =>
          $fetch(
            `${this.baseURL}${parseUrl(urls.farmer_contact, {
              id: queryData,
            })}`,
            {
              headers: {
                ...HeaderConfigs({
                  Authorization: useCookie("token").value || "",
                }),
              },
            }
          )
      );
      this.farmerContact = data.value!;
      this.farmerContactStatus = status.value;
      this.error = error.value;
    },
  },
});
