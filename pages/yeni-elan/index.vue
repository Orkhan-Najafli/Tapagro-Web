<template>
  <main class="block px-6 h-full min-h-screen max-h-full">
    <ClientOnly>
      <section class="max-w-[1224px] container mx-auto px-6 xl:px-0">
        <div class="mt-6 mb-5 md:mb-9">
          <nuxt-link
              tag="div"
              class="text-gray-600 flex flex-row justify-start items-center md:hidden font-medium text-sm cursor-pointer"
              to="/public"
          >
            <ArrowLeftIcon/>
            <span class="ml-3 text-gray-600 font-medium text-sm">
            {{ t("main_page") }}</span
            >
          </nuxt-link>
          <a-breadcrumb class="hidden md:block" separator=">">
            <a-breadcrumb-item class="text-sm leading-5 font-normal" href="">
              <nuxt-link to="/public">
              <span class="text-gray-600 font-medium text-sm">
                {{ t("main_page") }}</span
              ></nuxt-link
              >
            </a-breadcrumb-item>
            <a-breadcrumb-item class="text-sm leading-5 font-normal">
            <span class="text-gray-800 font-semibold text-sm">
              {{ t("ad_placement") }}</span
            >
            </a-breadcrumb-item>
          </a-breadcrumb>
        </div>
      </section>
      <section class="max-w-[1224px] container mx-auto px-6 xl:px-0">
        <div class="flex flex-row w-full mb-6 md:mb-10">
          <div class="w-full relative">
            <p class="text-3xl font-bold text-gray-700">
              {{ t("ad_placement_rules") }}
            </p>
            <ul class="space-y-2">
              <li
                  v-for="item in [t('advertisement_texts.item0'),t('advertisement_texts.item1'),t('advertisement_texts.item2'),t('advertisement_texts.item3')]"
                  key=""
                  class="flex flex-row justify-start items-center mb-3"
              >
                <div
                    class="flex justify-center items-center w-1.5 h-auto text-2xl text-gray-400 mr-6"
                >
                  &#8226;
                </div>
                <span class="text-gray-500 text-xl font-medium">
                              {{ item }}
                            </span>
              </li>
            </ul>
            <p class="text-[#16A34A] mb-11 text-base">
              {{ t("see_the_full_rules_for_posting_an_ad") }}
            </p>
            <div
                style="
              box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
                0px 4px 6px -4px rgba(0, 0, 0, 0.1);
              border-radius: 16px !important;
            "
                class="w-full border border-t-white border-gray-100 shadow-lg px-11 py-6 mb-6"
            >
              <a-form class="block">
                <div class="flex flex-col md:flex-row">
                  <div class="md:mr-6 w-full leading-none">
                    <a-form-item v-bind="validateInfos.typeId" class=" flex flex-col w-full leading-none">
                      <label class="flex flex-row justify-start items-center"> <span
                          class="pt-1 text-red-500 text-xl pr-1">*</span> {{ t("product") }}</label>
                      <!--                      <a-tree-select-->
                      <!--                          class="w-full leading-none"-->
                      <!--                          v-model:value="formData.typeId"-->
                      <!--                          :showSearch="true"-->
                      <!--                          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"-->
                      <!--                          :placeholder="t('select_the_product')"-->
                      <!--                          allow-clear-->
                      <!--                          name="subcategoryId"-->
                      <!--                          :treeDefaultExpandAll="false"-->
                      <!--                          @change="selectSubCategoryChange"-->
                      <!--                          @click="clickCategory"-->
                      <!--                      >-->
                      <!--                        <a-tree-select-node-->
                      <!--                            v-for="(subcategory, index) in useCategoriesStore().getProductCategories.subcategories"-->
                      <!--                            :key="subcategory.id"-->
                      <!--                            :value="subcategory.id"-->
                      <!--                            :title="subcategory.name"-->
                      <!--                            :selectable="false"-->
                      <!--                            :disabled="true"-->
                      <!--                            @click="selectSubCategory(index)"-->
                      <!--                        >-->
                      <!--                          <a-tree-select-node-->
                      <!--                              v-for="(subcategoryType, typeIndex) in useCategoriesStore().getProductCategories.subcategories[index].types"-->
                      <!--                              :key="subcategoryType.id"-->
                      <!--                              :value="subcategoryType.id"-->
                      <!--                              :title="subcategoryType.name"-->
                      <!--                              :selectable="false"-->
                      <!--                          >-->
                      <!--                          </a-tree-select-node>-->
                      <!--                        </a-tree-select-node>-->
                      <!--                      </a-tree-select>-->

                      <a-tree-select
                          v-model:value="formData.typeId"
                          show-search
                          style="width: 100%"
                          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                          :placeholder="t('select_the_product')"
                          allow-clear
                          :tree-data="useCategoriesStore().getProductCategoriesWithChangedValues"
                          tree-node-filter-prop="label"
                          @select="selectSubCategory"
                      >
                        <template #title="{ value: value, label,measurementUnits,subCategoryId }">
                          <div
                              @click="setMeasurementUnits(measurementUnits,subCategoryId)"
                          >
                            {{ label }}
                          </div>
                        </template>
                      </a-tree-select>
                    </a-form-item>

                  </div>
                  <div class="w-full mr-6">
                    <a-form-item v-bind="validateInfos.advertisementName" class="w-full leading-none">
                      <label class="flex flex-row justify-start items-center h-8"> {{ t("ad_name") }}</label>
                      <a-tooltip
                          trigger="click"
                          placement="top"
                          :title="
                        t(
                          'price_and_contact_information_should_not_be_listed_in_the_ad_title_space'
                        )
                      "
                          arrow-point-at-center
                      >
                        <a-input
                            class="w-full"
                            :maxLength="64"
                            v-model:value="formData.name"
                            id="_phone"
                            :placeholder="t('insert')"
                            allow-clear
                            name="advertisementName"
                        >
                        </a-input>
                      </a-tooltip>
                    </a-form-item>
                  </div>
                  <div class="w-full">
                    <a-form-item v-bind="validateInfos.price" class="w-full leading-none">
                      <label class="flex flex-row justify-start items-center"> <span
                          class="pt-1 text-red-500 text-xl pr-1">*</span> {{ t("price") }}</label>
                      <a-input
                          class="w-full"
                          suffix="AZN"
                          id="_price"
                          allow-clear
                          :maxLength="255"
                          v-model:value="formData.price"
                          placeholder="0.00"
                          name="price"
                      />
                    </a-form-item>
                  </div>
                </div>
                <div class="flex flex-col md:flex-row">
                  <div class="w-full mr-6">
                    <a-form-item v-bind="validateInfos.measurementValue" class="w-full leading-none">
                      <label class="flex flex-row justify-start items-center"> <span
                          class="pt-1 text-red-500 text-xl pr-1">*</span> {{ t("unit_quantity_and_size") }}</label>
                      <a-tooltip
                          trigger="click"
                          placement="top"
                          allow-clear
                          :title="t('insert_quantity')"
                          arrow-point-at-center
                      >
                        <a-input
                            class="w-full mt-1"
                            id="_measurementValue"
                            allow-clear
                            v-model:value="formData.measurementValue"
                            :placeholder="t('insert')"
                            name="measurementValue"
                        >
                          <template #addonAfter>
                            <a-select
                                :disabled="measurementUnits.list.length == 0"
                                slot="addonAfter"
                                default-value="kq"
                                allow-clear
                                placeholder="kq"
                                style="width: 90px"
                                v-model="formData.measurementUnitId"
                                @change="measurementUnitIdChange"
                            >
                              <a-select-option
                                  v-for="(measurementUnit, index) in measurementUnits.list"
                                  :key="index"
                                  :value="measurementUnit.id"
                              >
                                {{ measurementUnit.name }}
                              </a-select-option>
                            </a-select>
                          </template>
                        </a-input>
                      </a-tooltip>
                    </a-form-item>
                    <span v-if="visibleMeasurementUnit" class="text-red-500 text-sm"
                    >{{ t("you_must_select_a_unit_of_measure") }}.</span
                    >
                  </div>
                  <div class="w-full md:mr-6">
                    <a-form-item v-bind="validateInfos.cityId" class=" flex flex-col w-full leading-none">
                      <label class="flex flex-row justify-start items-center"> <span
                          class="pt-1 text-red-500 text-xl pr-1">*</span> {{ t("region_title") }}</label>
                      <a-select v-model:value="formData.cityId" class="w-full max-w-full mt-1"
                                id="_city" show-search placeholder="" :options="cities" :filter-option="filterOption"
                                @change="handleChangeCity" @search="handleSearch" allow-clear>

                      </a-select>
                    </a-form-item>
                  </div>
                  <div class="w-full">
                    <a-form-item v-bind="validateInfos.phoneNumber" class="w-full leading-none">
                      <label class="flex flex-row justify-start items-center"> <span
                          class="pt-1 text-red-500 text-xl pr-1">*</span> {{ t("phone_number") }}</label>
                      <a-input
                          addon-before="+994"
                          class="w-full mt-1"
                          allow-clear
                          id="_phone"
                          name="phoneNumber"

                          v-model:value="formData.phoneNumber"
                          placeholder="55 111 11 11"
                      >
                      </a-input>
                    </a-form-item>
                  </div>
                </div>
                <div class="flex w-full h-auto">
                  <a-form-item v-bind="validateInfos.description" class="w-full leading-none">
                    <label class="flex flex-row justify-start items-center"> <span
                        class="pt-1 text-red-500 text-xl pr-1">*</span> {{ t("general_description") }}</label>
                    <a-tooltip
                        trigger="focus"
                        placement="top"
                        :title="t('product_more_description')"
                        arrow-point-at-center
                    >
                      <a-textarea
                          v-model:value="formData.description"
                          :maxLength="1024"
                          :rows="4"
                          name="description"
                          :placeholder="t('product_description_title')"
                      >
                      </a-textarea>
                    </a-tooltip>
                  </a-form-item>

                </div>
                <div class="flex flex-col md:flex-row">
                  <div class="w-full">
                    <a-form-item v-bind="validateInfos.catalogFile" class="w-full leading-none">
                      <label class="flex flex-row justify-start items-center"> <span
                          class="pt-1 text-red-500 text-xl pr-1">*</span> {{ t("catalog_photo") }}</label>
                      <div class="block w-full h-auto my-3">
                        <div v-for="(photo,index) in catalogFile"
                             class=" float-left relative group w-[264px] h-[264px] rounded-lg overflow-hidden border shadow-md mr-2 p-1">
                          <img
                              :src="`${photo.data}`"
                              :alt="photo.name"
                              class="w-full h-full object-cover"
                          />
                          <div
                              class="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <button
                                @click="removeFromCatalogFile(index)"
                                class="text-gray-300 hover:text-white p-2 rounded-full ">
                              <remove_image_icon/>
                            </button>
                          </div>
                        </div>
                        <div
                            v-if="catalogFile.length <= 0"
                            class="clearfix float-left">
                          <a-upload-dragger
                              :before-upload="beforeUpload"
                              accept="image/png, image/gif, image/jpeg"
                              list-type="picture-card"
                              name="catalogFile"
                              class=" flex justify-center items-center min-w-[264px] min-h-[264px] avatar-uploader"
                              :show-upload-list="false"
                              :showDownloadIcon="false"
                          >
                            <div>
                              <plus-outlined/>
                              <div style="margin-top: 8px">{{ t("download") }}</div>
                            </div>
                          </a-upload-dragger>
                        </div>
                      </div>
                    </a-form-item>
                    <div>
                      <p class="leading-7 text-sm">
                        {{ t("catalog_photo_message_1") }}
                        <br/>
                        {{ t("catalog_photo_message_2") }}
                        <span class="bg-gray-100 p-1">1:1</span> ({{
                          t("square")
                        }})
                      </p>
                    </div>
                  </div>
                  <div class="w-full">
                    <a-form-item v-bind="validateInfos.otherFileList" class="w-full leading-none">
                      <label class="flex flex-row justify-start items-center h-8"> {{
                          t("other_images_maximum_number")
                        }}</label>
                      <div v-for="(photo,index) in otherFileList"
                           class=" float-left relative group w-[102px] h-[102px] rounded-lg overflow-hidden border shadow-md mr-2 p-1 mt-1.5">
                        <img
                            :src="`${photo.data}`"
                            :alt="photo.name"
                            class="w-full h-full object-cover"
                        />
                        <div
                            class="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <button
                              @click="removeOtherImage(index)"
                              class="text-gray-300 hover:text-white p-2 rounded-full ">
                            <remove_image_icon/>
                          </button>
                        </div>
                      </div>
                      <div
                          v-if="otherFileList.length < 5"
                          class="clearfix float-left">
                        <a-upload
                            accept="image/png, image/gif, image/jpeg"
                            list-type="picture-card"
                            name="otherFileList"
                            class="avatar-uploader mt-1.5"
                            :show-upload-list="false"
                            :before-upload="beforeUploadOtherFiles"
                            :showDownloadIcon="false"
                        >
                          <div>
                            <plus-outlined/>
                            <div style="margin-top: 8px">{{ t("download") }}</div>
                          </div>
                        </a-upload>
                      </div>
                    </a-form-item>
                  </div>
                </div>
                <div class="w-full my-4 md:w-1/2 order-1 md:order-2">
                  <a-form-item class="w-full leading-none">
                    <span class="mr-4"> {{ t("i_am_delivering") }} </span>
                    <a-switch
                        :checked-children="t('yes_switch')"
                        :un-checked-children="t('no_switch')"
                        :default-checked="formData.isDelivered"
                        v-model:checked="formData.isDelivered"
                    />
                  </a-form-item>

                </div>
                <div class="w-full mb-4 mt-11 text-center">
                  <p v-html="adUseRules"></p>
                </div>
              </a-form>
              <button
                  :disabled="waitResponse"
                  @click="handleOk"
                  class="flex justify-center items-center w-full text-base font-semibold text-white bg-green-600 hover:bg-green-700 px-20 py-2 rounded"
              >
                {{ t("create_an_ad") }}
              </button>
            </div>
          </div>
        </div>
      </section>
    </ClientOnly>
  </main>
</template>
<script setup lang="ts">
import useGoogleRecaptcha, {
  RecaptchaAction,
} from "~/composables/useGoogleRecaptcha";

const {locale, t} = useI18n({useScope: "global"});
import {Form} from "ant-design-vue";
import {Modal} from 'ant-design-vue';

const [modal, contextHolder] = Modal.useModal();
const {$recaptcha} = useNuxtApp();
const useForm = Form.useForm;
const subcategories = reactive([])
let measurementUnits = reactive({
  list: [] as Array<{ name: string, id: number }>
})
let catalogFile = reactive<Array<{ file: any; uid: number; name: any; data: string; id: null; }>>([])
const thumbnailName = ref()
const visibleMeasurementUnit = ref(false)
const formData = reactive({
  cityId: ref(),
  description: ref(),
  isDelivered: ref(false),
  measurementUnitId: ref(),
  measurementValue: ref(),
  name: ref(),
  phoneNumber: ref(),
  price: ref(),
  productPhotos: [
    {
      data: ref(),
      id: ref(),
    },
  ],
  subcategoryId: ref(),
  thumbnail: ref(),
  thumbnailName: ref(),
  typeId: ref(),
})
const otherFileList: any = reactive<Array<any>>([]);
const allowFileTypes = ref(["image/jpeg", "image/png", "image/jpg"])
const allowFileSize = ref(5242880)
const rulesRef = reactive({
  typeId: [
    {
      required: true,
      message: t("required"),
    },
  ],
  price: [
    {
      required: true,
      message: t("required"),
    },
    {
      pattern: /^[0-9]+(\.[0-9]{1,6})?$/,
      message: t("decimal", {decimals: 6}),
      trigger: "change",
    },
  ],
  measurementValue: [
    {
      required: true,
      message: t("required"),
    },
    {
      pattern: /^[0-9]+(\.[0-9]{1,6})?$/,
      message: t("decimal", {decimals: 6}),
      trigger: "change",
    },
  ],
  cityId: [
    {
      required: true,
      message: t("required"),
    },
  ],
  phoneNumber: [
    {
      required: true,
      message: t("required"), // Tərcümə edilmiş mesaj
    },
    {
      pattern: /^(55|51|99|77|70|12)\d{7}$/,
      message: t("enter_a_valid_phone_number"),
      trigger: "change",
    },
  ],
  description: [
    {
      required: true,
      message: t("required"),
    },
    {
      min: 3,
      message: t("min", {min: 9}),
      trigger: "change",
    },
    {
      max: 1024,
      message: t("max", {max: 9}),
      trigger: "change",
    },
  ],
  catalogFile: [
    {
      required: true,
      message: t("required"),
    },
  ]
})
const clickCategoryData = ref(false)
const waitResponse = ref(false)
const adUseRules = computed(() => t('ad_use_rules'));
const announcementsStore = useAnnouncementsStore()
useCitiesStore().fetchCities()
useCategoriesStore().fetchProductCategories()

function getBase64Async(img: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(img);
  });
}

const {resetFields, validate, validateInfos} = useForm(formData, rulesRef);
const handleSearch = (value: string) => {
  useCitiesStore().fetchCities(value)
};
const handleChangeCity = (value: any, options: any) => {
  formData.cityId.value = options.id;
};
const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const cities = computed(() => useCitiesStore().getCities.map(item => ({value: item.name, id: item.id})))

const measurementUnitIdChange = function (value: any) {
  value != null
      ? (visibleMeasurementUnit.value = false)
      : (visibleMeasurementUnit.value = true);
}
const setMeasurementUnits = function (value: any, subCategoryId: number) {
  if (value) measurementUnits.list = value
  if (subCategoryId != null) formData.subcategoryId.value = subCategoryId
}
const selectSubCategory = function (key: any) {
  formData.typeId.value = key;
}
const selectSubCategoryChange = function (value: any) {
  if (value == null) {
    measurementUnits.list = [];
    formData.measurementUnitId.value = undefined;
  }
}
const beforeUpload = function (file: any) {
  if (file && allowFileTypes.value.includes(file.type)) {
    if (file.size <= allowFileSize.value) {
      let obj = {
        file,
        uid: Date.now(),
        name: file && file.name,
        data: "",
        id: null,
      };
      getBase64Async(file).then((imageUrl: string) => {
        obj.data = imageUrl;
        thumbnailName.value = file.name;
        catalogFile.push(obj);
        // photos.value.push({data: imageUrl, name: file.name});
      });
      console.log(catalogFile)
    } else {
      message['error']("Faylın ölçüsü 5 mb-dən çox ola bilməz");
    }
  } else {
    message["error"]("Fayl tipi düzgün deyil");
  }
  return false;
};
const beforeUploadOtherFiles = function (file: any) {
  if (file && allowFileTypes.value.includes(file.type)) {
    if (file.size <= allowFileSize.value) {
      const obj = {
        file,
        uid: Date.now(),
        name: file && file.name,
        data: "",
        id: null,
      };
      getBase64Async(file).then((imageUrl: string) => {
        obj.data = imageUrl;
        otherFileList.push(obj);
        // hasChange.value = false;
      });
    } else {
      message['error']("Faylın ölçüsü 5 mb-dən çox ola bilməz");
    }
  } else {
    message["error"]("Fayl tipi düzgün deyil");
  }
  return false;
};
const removeFromCatalogFile = function (index: number) {
  catalogFile.splice(index, 1);
}
const removeOtherImage = function (index: number) {
  otherFileList.splice(index, 1);
};
const handleOk = function () {
  validate().then((result) => {
    // if (verified.value == false) this.checkRecaptcha = "error";
    // if (!result || !this.verified) return;
    // if (!formData.measurementUnitId.value) {
    //   visibleMeasurementUnit.value = true;
    //   return;
    // } else {
    //   visibleMeasurementUnit.value = false;
    // }
//         if (!this.formData.measurementUnitId) {
//           this.visibleMeasurementUnit = true;
//           return;
//         } else {
//           this.visibleMeasurementUnit = false;
//         }
//         if (this.verified == false) this.checkRecaptcha = "error";
//         if (!result || !this.verified) return;
    modal.confirm({
      title: t("are_you_sure_you_want_to_create_a_new_ad"),
      content: "",
      okText: t("yes"),
      cancelText: t("no"),
      onOk: async () => {
        waitResponse.value = true;
        let sendFormData = {
          cityId: formData.cityId.value,
          description: formData.description.value,
          measurementUnitId: formData.measurementUnitId.value,
          measurementValue: Number(formData.measurementValue.value),
          name: formData.name.value,
          price: Number(formData.price.value),
          phoneNumber: formData.phoneNumber.value,
          typeId: formData.typeId.value,
          subcategoryId: formData.subcategoryId.value,
          isDelivered: formData.isDelivered,
        };
        await announcementsStore.fetchCreateNewAnnouncement(sendFormData)
        if (announcementsStore.getCreateNewAnnouncementStatus === 'success') {
          let formData = new FormData();
          formData.append(
              "thumbnail",
              catalogFile[0] && catalogFile[0].file
          );
          otherFileList.forEach((item: any, index: number) => {
            formData.append(`productPhotos[${index}]`, item.file);
          });
          await announcementsStore.fetchCreatedAnnouncementPhotos({
            data: formData,
            id: announcementsStore.getCreatedNewAnnouncementResult.id,
          })
          if (announcementsStore.getCreatedAnnouncementPhotosStatus === 'success') {
            useRouter().push("/kabinet/elanlarim");
            message['success'](
                t("operation_was_successful"),
                1.5
            )
          } else {
            useRouter().push("/yeni-elan");
            waitResponse.value = false;
          }
        }
      },
    })
  })

}


//     loadProductCategories() {
//       this.$store
//           .dispatch("advertisement/getProductCategories")
//           .then((response) => {
//             if (response.subcategories.length) {
//               for (
//                   let index = 0;
//                   index < response.subcategories.length;
//                   index++
//               ) {
//                 response.subcategories[index] = Object.assign(
//                     response.subcategories[index],
//                     { subIndex: index }
//                 );
//               }
//               this.subcategories = response.subcategories;
//             }
//           });
//     },

const clickCategory = function () {
  clickCategoryData.value &&
  setTimeout(() => {
    addClickEvent();
  }, 500);
}
const addClickEvent = function () {
  const buttons = document.querySelectorAll(
      ".ant-select-tree-node-content-wrapper"
  );
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      previousSibling.click();
    });
  });
  clickCategoryData.value = true;
}
//   },
// };
</script>
<style>
.ant-switch-checked {
  background-color: #16a34a !important;
}

.ant-form-item-label > label::after {
  content: "" !important;
}
</style>
