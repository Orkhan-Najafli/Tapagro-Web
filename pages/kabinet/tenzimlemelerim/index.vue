<template>
  <div class="mt-9 xl:mt-0">
    <a-skeleton active :loading="useUsersStore().getUserStatus !== 'success'" />
    <a-form v-if="useUsersStore().getUserStatus === 'success'" ref="formRef" :model="userData" :rules="rules as any">
      <div class="block text-left mb-3.5">
        <h3 class="text-emerald-600 font-semibold text-xl">
          {{ t("my_information") }}
        </h3>
      </div>
      <div class="block">
        <!-- <ClientOnly> -->
        <div class="bg-white rounded-xl border border-gray-200">
          <div class="flex flex-row items-center bordered border-b-2 py-5 px-6 text-emerald-900">
            <span class="w-14 h-14 bg-[#F0FDF4] rounded-full flex justify-center items-center mr-5">
              <UserOutlined class="text-lg" />
            </span>

            <p class="p-0 m-0 font-medium text-lg">
              {{ t("my_personal_information") }}
            </p>
          </div>
          <div class="flex flex-col md:flex-row mt-6 px-6">
            <div class="flex flex-col mr-32">
              <h5 class="text-gray-400 font-medium text-base p-0 m-0 mb-2">
                {{ t("surname_first_name_patronymic") }}
              </h5>
              <p class="text-zinc-900 font-medium text-lg p-0 m-0">
                {{
                  `${useUsersStore().getUserData.firstName} ${useUsersStore().getUserData.lastName
                  }
                ${useUsersStore().getUserData.fatherName}`
                }}
              </p>
            </div>
          </div>

          <div class="flex flex-col md:flex-row px-6">
            <div class="flex flex-col text-left w-full md:w-[382px] md:max-w-[382px]">
              <a-form-item class="text-left" ref="storeName" name="storeName">
                <label class="text-gray-400 font-medium text-base" for="_storeName">{{ t("seller_name") }}</label>
                <a-config-provider :theme="{
                  token: {
                    colorPrimary: '#16a34a',
                  },
                }">
                  <a-input size="large" id="_storeName" class="text-left" v-model:value="userData.storeName" />
                </a-config-provider>
              </a-form-item>
            </div>
          </div>
          <div class="flex flex-col md:flex-row px-6">
            <div class="flex flex-col w-full md:w-[382px] md:max-w-[382px] mr-16 justify-start items-start">
              <a-form-item class="text-left w-full" ref="phoneNumber" name="phoneNumber">
                <label class="text-gray-400 font-medium text-base" for="_phone">{{ t("mobile_number") }}</label>
                <a-config-provider :theme="{
                  token: {
                    colorPrimary: '#16a34a',
                  },
                }">
                  <a-input size="large" id="_phone" placeholder="55 111 11 11" class="text-left w-full"
                    v-model:value="userData.phoneNumber" />
                </a-config-provider>
              </a-form-item>
            </div>
            <div class="flex flex-col text-left w-full md:w-[382px] md:max-w-[382px]">
              <a-form-item class="text-left w-full" ref="emailAddress" name="emailAddress">
                <label class="text-gray-400 font-medium text-base" for="_email">{{ t("e_mail") }}</label>
                <a-config-provider :theme="{
                  token: {
                    colorPrimary: '#16a34a',
                  },
                }">
                  <a-input size="large" id="_email" placeholder="email@gmail.com" class="text-left w-full"
                    v-model:value="userData.emailAddress" />
                </a-config-provider>
              </a-form-item>
            </div>
          </div>
        </div>
        <!-- </ClientOnly> -->
      </div>
      <div class="block mt-6 h-auto">
        <div class="bg-white rounded-xl border border-gray-200">
          <div class="flex flex-row items-center bordered border-b-2 py-5 px-3 md:px-6 text-emerald-900">
            <span class="w-14 h-14 bg-[#F0FDF4] rounded-full flex justify-center items-center mr-5">
              <img width="20px" height="26px" src="../../../assets/img/areas.svg" alt="" />
            </span>

            <p class="p-0 m-0 font-medium text-lg">
              {{ t("my_shopping_area") }}
            </p>
          </div>
          <div class="flex flex-row mt-5 px-3 md:px-6 mb-6">
            <div class="flex flex-col w-full">
              <a-form-item class="text-left w-full" ref="city" name="city">
                <label class=" flex w-full text-gray-400 font-medium text-base" for="_city">{{ t("region_title")
                  }}</label>
                <a-config-provider :theme="{
                  token: {
                    colorPrimary: '#16a34a',
                  },
                }">

                  <a-select :value="userData.city.name" class="w-full max-w-full md:w-[320px] md:max-w-[320px]"
                    id="_city" size="large" show-search placeholder="" :options="cities" :filter-option="filterOption"
                    @change="handleChange" @search="handleSearch">

                  </a-select>
                </a-config-provider>
              </a-form-item>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-6">
        <button @click="onSuccessWithRecaptcha" :disabled="submitLoading"
          class="bg-[#16A34A] h-[38px] px-10 py-2 rounded-md font-semibold text-base text-white">
          {{ t("save") }}
        </button>
      </div>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import type { User } from '~/utils/types/users';
const { t, locale } = useI18n();
import { Form } from "ant-design-vue";
const useForm = Form.useForm;
import useGoogleRecaptcha, {
  RecaptchaAction,
} from "~/composables/useGoogleRecaptcha";
const { executeRecaptcha } = useGoogleRecaptcha();
useCitiesStore().fetchCities()
const formRef = ref();
const verified = ref(false);
const checkRecaptcha = ref<string | undefined>(undefined);
const submitLoading = ref(false);
const userData = reactive<User | any>({
  cityId: undefined,
  emailAddress: undefined,
  phoneNumber: undefined,
  city: {
    name: undefined,
    id: undefined,
  },
  storeName: undefined,
});

// onUnmounted(() => {
useUsersStore().resetUserData()
// });
useUsersStore().fetchUserData()
const handleSearch = (value: string) => {
  useCitiesStore().fetchCities(value)
};
const handleChange = (value: any, options: any) => {
  userData.city.name = options.value
  userData.city.id = options.id
  userData.cityId = options.id
};
const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const cities = computed(() => useCitiesStore().getCities.map(item => ({ value: item.name, id: item.id })))

const rules = computed(() => ({
  storeName: [
    // { required: true, message: t("required"), trigger: ["change", "blur"] },
    { min: 3, message: t("min", 3), trigger: ["change", "blur"] },
    { max: 255, message: t("max", 255), trigger: ["change", "blur"] },
    {
      pattern: /^[a-zA-Z\s]+$/, // Ancaq hərflər və boşluqlar
      message: t("alpha_spaces"),
      trigger: ["change", "blur"],
    },
  ],
  phoneNumber: [
    {
      pattern: /^\d{9}$/, // Tam olaraq 9 rəqəm olmalıdır
      message: t("digits", { length: 9 }),
      trigger: ["change", "blur"],
    },
  ],
  emailAddress: [
    {
      pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: t("email", { email: "Email adres" }),
      trigger: ["change", "blur"],
    },
  ],
}));
watch(locale, () => {
  formRef.value?.clearValidate();
});
const { resetFields, validate } = useForm(userData, rules);
const handleSubmit = async function (event?: Event) {
  try {
    validate().then(async result => {
      submitLoading.value = true;
      const usersStore = useUsersStore();
      // API sorğusunu gözləyirik
      await usersStore.fetchEditUserData({
        cityId: userData.cityId || userData.city.id,
        emailAddress: userData.emailAddress || null,
        phoneNumber: userData.phoneNumber || null,
        storeName: userData.storeName || null,
      });

      // Cavab "success" olduqda aşağıdakı kod işləsin
      if (usersStore.getUserEditStatus === "success") {
        submitLoading.value = false;
        notification.success({
          message: t("attention"),
          placement: "bottomRight",
          duration: 3,
          description: t("your_changes_have_been_successfully_saved"),
        });
      }
      else {
        submitLoading.value = false;
        notification.error({
          message: t("error"),
          placement: "bottomRight",
          duration: 3,
          description: t("something_went_wrong"),
        });
      }
    })
  } catch (error) {
    submitLoading.value = false;
    console.error(error);
    notification.error({
      message: t("error"),
      placement: "bottomRight",
      duration: 3,
      description: t("something_went_wrong"),
    });
  }
};

// const handleSubmit = function (event?: Event) {
//   validate()
//     .then((result) => {
//       console.log(result);

//       if (verified.value == false) checkRecaptcha.value = "error";
//       // if (!result || !verified.value) return

//       submitLoading.value = true;
//       useUsersStore().fetchEditUserData({
//         cityId: userData.cityId || userData.city.id,
//         emailAddress: userData.emailAddress || null,
//         phoneNumber: userData.phoneNumber || null,
//         storeName: userData.storeName || null,
//       })
//       if (useUsersStore().getUserEditStatus === 'success') {
//         submitLoading.value = false
//         notification.success({
//           message: t("attention"),
//           placement: "bottomRight",
//           duration: 3,
//           description: t("your_changes_have_been_successfully_saved"),
//         });
//       }
//     });
// };
const onSuccessWithRecaptcha = async function (event: Event) {
  try {
    const { token } = await executeRecaptcha(RecaptchaAction.login);
    console.log(token);

    await useRecaptchaStore().fetchRecaptcha({ response: token });
    if (useRecaptchaStore().getStatus === "success") {
      verified.value = true;
      checkRecaptcha.value = "success";
      handleSubmit();
    } else {
      verified.value = false;
      checkRecaptcha.value = "error";
    }
  } catch (err) {
    console.error("reCAPTCHA xətası:", err);
    verified.value = false;
    checkRecaptcha.value = "error";
  }
};
const setUserData = function () {
  userData.emailAddress = useAuthenticator().getToken
    ? useUsersStore().getUserData.contactDetails.emailAddress
    : undefined;
  userData.phoneNumber = useAuthenticator().getToken
    ? useUsersStore().getUserData.contactDetails.phoneNumber
    : undefined;
  userData.city = useUsersStore().getUserData.city;
  userData.cityId = useUsersStore().getUserData.city.id;
  userData.storeName = useUsersStore().getUserData.storeName;
}
watch(() => useUsersStore().getUserStatus, (newStatus) => {
  if (useUsersStore().getUserStatus === 'success') {
    setUserData();
  }
}, { immediate: true });

</script>
<style>
.select2-container--default .select2-selection--single {
  height: 44px;
  display: flex;
  align-items: center;
  padding-left: 13px;
  padding-right: 13px;
}

.select2-container--default .select2-selection--single .select2-selection__arrow {
  top: 10px;
  right: 13px;
}
</style>
