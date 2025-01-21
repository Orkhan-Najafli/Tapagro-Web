import { HeaderConfigs, parseUrl } from "@/utils/configs";
import { defineStore } from "pinia";
import urls from "@/utils/urls.json";
import { useRuntimeConfig } from "#app";
import type {
  Categories,
  CategoriesProductType,
} from "~/utils/types/categories";

export const useFarmerCategoriesStore = defineStore("farmer-categories", {
  state: () => ({
    categories: [] as Array<Categories>,
    status: "" as string,
    error: null as null | Error,
    productTypes: [] as Array<CategoriesProductType>,

    baseCategory: undefined as Categories | undefined,
    baseURL: useRuntimeConfig().public.baseURL,
  }),
  getters: {
    getStatus: (state) => state.status,
    getCategories: (state) => state.categories,
  },
  actions: {
    setBaseCategory(category: Categories) {
      this.baseCategory = category;
    },
    setProductTypes(index: number) {
      this.categories[index].hide = !this.categories[index].hide;
    },
    setAllProductTypes(index: number, allProductTypeChecked?: boolean) {
      this.categories[index].productTypes = this.categories[
        index
      ].productTypes.map((type: CategoriesProductType) => {
        return {
          ...type,
          checked: allProductTypeChecked,
        };
      });
    },

    async fetchCategories() {
      const { data, status, error } = await useAsyncData<Categories[]>(
        "farmer-categories",
        () =>
          $fetch(`${this.baseURL}${urls.subcategories}`, {
            headers: {
              ...HeaderConfigs({
                Authorization: useCookie("token").value || "",
              }),
            },
            method: "GET",
          })
      );

      for (const category of data!.value!) {
        try {
          await $fetch(
            `${this.baseURL}${parseUrl(urls["farmer-product-types"], {
              id: category.id,
            })}`,

            {
              headers: {
                ...HeaderConfigs({
                  Authorization: useCookie("token").value || "",
                }),
              },
              method: "GET",
            }
          ).then((result: CategoriesProductType[] | any) => {
            category.productTypes = result.map(
              (productType: CategoriesProductType) => {
                return {
                  ...productType,
                  hide: false,
                  checked: false,
                };
              }
            );
          });
          category.hide = false;
          category.apiCalled = true;
        } catch (err) {
          console.error(
            `Failed to fetch product types for category ${category.id}`,
            err
          );
        }
      }

      // Finally update categories
      this.categories = data!.value!;
      this.status = status.value;
      this.error = error?.value;
    },
  },
});
