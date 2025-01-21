<template>
  <main class="overflow-hidden pt-3 min-h-screen">
    <section class="max-w-[1224px] container mx-auto px-6 xl:px-0">
      <div class="mt-6 mb-5 md:mb-9">
        <nuxt-link tag="div"
          class="text-gray-600 flex flex-row justify-start items-center md:hidden font-medium text-sm cursor-pointer"
          to="/">
          <left_arrow_icon />
          <span class="ml-3 text-gray-600 font-medium text-sm">
            {{ t("main_page") }}</span>
        </nuxt-link>
        <ClientOnly>
          <a-breadcrumb class="hidden md:flex" separator=">">
            <a-breadcrumb-item class="text-sm leading-5 font-normal" href="">
              <nuxt-link to="/">
                <span class="text-gray-600 font-medium text-sm">
                  {{ t("main_page") }}</span></nuxt-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item class="text-sm leading-5 font-normal">
              <span class="text-gray-800 font-semibold text-sm">
                {{ t("join_us") }}</span>
            </a-breadcrumb-item>
          </a-breadcrumb>
        </ClientOnly>
      </div>
    </section>
    <section class="max-w-[1224px] container mx-auto px-6 xl:px-0" id="demo-form">
      <div class="flex flex-row w-full mb-6">
        <!-- <Advertising/> -->
        <div class="w-full relative">
          <div id="dynamic-title" v-html="title" class="text-3xl font-bold my-6"></div>
          <div class="mb-11" id="dynamic-description" v-html="description"></div>
          <h2 class="block font-semibold text-gray-700 text-3xl md:hidden m-0 p-0 mb-6">
            {{ t("join_us") }}
          </h2>
          <div style="
              box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
                0px 4px 6px -4px rgba(0, 0, 0, 0.1);
            " class="w-full border border-t-white border-gray-100 shadow-lg px-3 md:px-11 py-6 mb-6">
            <ClientOnly>
              <a-form class="flex flex-col w-full">
                <div class="flex flex-col md:flex-row w-full min-w-full">
                  <div class="w-full mr-6">
                    <a-form-item v-bind="validateInfos.name" class="w-full">
                      <TitleUploadInput :explanation="'not'" :labelText="fullName" />
                      <a-input allow-clear class="w-full text-left" id="_name" size="large" :placeholder="placeholder"
                        name="name" v-model:value="formData.name" />
                    </a-form-item>
                  </div>
                  <div class="w-full">
                    <a-form-item v-bind="validateInfos.companyName" class="w-full">
                      <TitleUploadInput :explanation="'not'" :labelText="LegalName" />
                      <a-input allow-clear class="w-full text-left" id="_name" size="large" :placeholder="placeholder"
                        name="companyName" v-model:value="formData.companyName" />
                    </a-form-item>
                  </div>
                </div>
                <div class="flex flex-col md:flex-row w-full min-w-full">
                  <div class="w-full mr-6">
                    <a-form-item v-bind="validateInfos.phoneNumber" class="w-full">
                      <TitleUploadInput :explanation="'not'" :labelText="phone" />
                      <a-input class="w-full text-left" addon-before="+994" id="_phone" size="large"
                        placeholder="55 000 00 00" v-model:value="formData.phoneNumber" />
                    </a-form-item>
                  </div>
                  <div class="w-full">
                    <a-form-item v-bind="validateInfos.emailAddress" class="text-left w-full">
                      <TitleUploadInput :explanation="'not'" :labelText="email" />
                      <a-input id="_email" size="large" class="text-left" name="emailAddress" data-vv-as="Email"
                        :placeholder="placeholder" v-model:value="formData.emailAddress" />
                    </a-form-item>
                  </div>
                </div>
                <div class="flex flex-col justify-start items-start min-w-full w-full h-auto my-6">
                  <div class="flex flex-col md:flex-row justify-start items-start w-full min-w-full h-auto mb-6">
                    <div class="flex flex-col justify-start items-start w-full md:mr-6">
                      <TitleUploadInput :explanation="t(
                        'the_copy_of_the_certificate_that_you_are_taxpayer'
                      )
                        " :labelText="t('copy_of_certificate')" />
                      <UploadFile v-if="certificates.length < 3" :key="11" :ID="0" @handleUpload="uploadCertificateFile"
                        class="" />
                      <CatalogFileList @removeFile="(event: Event) => removeFile(event, 'certificates')" :key="0"
                        :catalogFileList="certificates" />
                      <span class="text-[#f5222d]" v-if="certificates.length == 0 && checkCatalog">{{
                        t("this_field_is_mandatory") }}</span>
                    </div>
                    <div class="flex flex-col justify-start items-start w-full">
                      <TitleUploadInput :explanation="t(
                        'copy_of_extract_from_the_register_related_to_state_registration_of_legal_entities'
                      )
                        " :labelText="t('copy_of_the_receipt')" />
                      <UploadFile v-if="certificateOfExtracts.length < 3" :key="12" :ID="1"
                        @handleUpload="uploadCertificateOfExtract" />
                      <CatalogFileList @removeFile="(event: Event) => removeFile(event, 'certificateOfExtracts')
                        " :key="1" :catalogFileList="certificateOfExtracts" />
                      <span class="text-[#f5222d]" v-if="certificateOfExtracts.length == 0 && checkCatalog">{{
                        t("this_field_is_mandatory") }}</span>
                    </div>
                  </div>
                  <div class="flex flex-col md:flex-row justify-start items-start w-full min-w-full h-auto">
                    <div class="flex flex-col justify-start items-start w-full md:mr-6">
                      <TitleUploadInput :explanation="t('copy_of_bank_details_on_your_business_account')
                        " :labelText="t('copy_of_bank_details')" />
                      <UploadFile v-if="bankDetails.length < 3" :key="13" :ID="2" @handleUpload="uploadBankDetail"
                        class="m-0 p-0" />
                      <CatalogFileList @removeFile="(event: Event) => removeFile(event, 'bankDetails')" :key="2"
                        :catalogFileList="bankDetails" />
                      <span class="text-[#f5222d]" v-if="bankDetails.length == 0 && checkCatalog">{{
                        t("this_field_is_mandatory") }}</span>
                    </div>

                    <div class="flex flex-col justify-start items-start w-full">
                      <TitleUploadInput :explanation="t('directors_ID_card_copy')"
                        :labelText="t('the_copy_of_the_directors_license')" />
                      <UploadFile v-if="directorIDs.length < 3" :key="14" :ID="3" @handleUpload="uploadDirectorID" />
                      <CatalogFileList @removeFile="(event: Event) => removeFile(event, 'directorIDs')" :key="3"
                        :catalogFileList="directorIDs" />
                      <span class="text-[#f5222d]" v-if="directorIDs.length == 0 && checkCatalog">{{
                        t("this_field_is_mandatory") }}</span>
                    </div>
                  </div>
                </div>

                <div class="w-full h-auto">
                  <a-form-item class="text-left">
                    <label v-html="note" class="font-medium text-sm" for="_email"></label>
                    <a-textarea :placeholder="placeholder" :maxlength="1024" name="note" allow-clear
                      v-model="formData.note" :rows="3" />
                  </a-form-item>
                </div>
              </a-form>
            </ClientOnly>

            <!-- <div
              class="inline-flex flex-col justify-start items-start mb-6"
              :class="{
                'border-2 border-[#f5222d]': checkRecaptcha == 'error',
                'border-0 border-transparent': checkRecaptcha == 'success',
              }"
            >
              <div id="recaptcha-widget"></div>

              <recaptcha @error="onError" @success="onSuccess" />
            </div> -->
            <a-config-provider :theme="{
              token: {
                colorPrimary: '#16a34a',
              },
            }">
              <!-- <div>
                <input
                  @click="onSuccess"
                  class="g-recaptcha"
                  :data-sitekey="useRuntimeConfig().public.RECAPTCHA_SITE_KEY"
                  data-callback="onSubmit"
                  type="checkbox"
                  id="scales"
                  name="scales"
                />
                <label for="scales">Scales</label>
              </div> -->
              <a-button :disabled="submitLoading" html-type="submit" size="large" @click.prevent="onSuccess"
                class="flex justify-center items-center w-full text-base font-semibold text-white bg-green-600 hover:bg-green-700 px-20 py-2 rounded"
                v-html="btnText"></a-button>
            </a-config-provider>
          </div>
        </div>
      </div>
    </section>
    <section id="faq" class="w-full h-auto max-w-[816px] container mx-auto px-6 py-11">
      <FAQ />
    </section>
    <a-modal @cancel="handleCancel" :open="visibleSavedInfo" width="600px" :footer="null" centered>
      <div class="flex flex-col pt-12 pb-10">
        <div class="flex justify-center items-center mb-5">
          <span class="w-16 h-16 rounded-full flex justify-center items-center bg-[#22C55E] text-white">
            <a-icon class="text-4xl" type="check" />
          </span>
        </div>
        <div class="flex flex-col justify-center items-center mb-4">
          <p class="p-0 m-0 text-[#262626] font-medium text-2xl mb-1">
            {{ t("your_request_has_been_registered") }}
          </p>
        </div>
        <div class="flex justify-center items-center mb-4">
          <div style="background-color: #f6ffed; border: 1px solid #b7eb8f" class="flex flex-row px-4 py-3 rounded-sm">
            <span style="background-color: #52c41a"
              class="w-4 h-4 rounded-full flex justify-center items-center text-white mr-3">
              i
            </span>
            <span class="p-0 m-0 text-gray-400 font-normal text-sm">
              {{ t("we_will_contact_you_soon") }}
            </span>
          </div>
        </div>

        <div class="flex flex-col justify-center items-center">
          <span class="mb-6"> {{ t("thank_you") }} </span>
          <nuxt-link tag="button" to="/"
            class="flex flex-row justify-center items-center w-full max-w-[130px] border-2 border-[#16A34A] font-semibold text-sm bg-[#16A34A] rounded-md text-white px-3 py-2">
            {{ t("main_page") }}
          </nuxt-link>
        </div>
      </div>
    </a-modal>
  </main>
</template>

<script setup lang="ts">
import useGoogleRecaptcha, {
  RecaptchaAction,
} from "~/composables/useGoogleRecaptcha";
const { executeRecaptcha } = useGoogleRecaptcha();
const { locale, t } = useI18n({ useScope: "global" });
import { Form } from "ant-design-vue";
const { $recaptcha } = useNuxtApp();
const useForm = Form.useForm;
interface Filter {
  emailAddress: string;
  companyName: string;
  name: string;
  note: string;
  phoneNumber: string;
}
const verified = ref(false);
const checkRecaptcha = ref<string | undefined>(undefined);
const submitLoading = ref(false);
const title = ref("");
const description = ref();
const fullName = ref();
const LegalName = ref();
const phone = ref();
const email = ref();
const note = ref();
const placeholder = ref();
const btnText = ref();
const visibleSavedInfo = ref(false);
let formData = reactive<Filter>({
  emailAddress: "",
  companyName: "",
  name: "",
  note: "",
  phoneNumber: "",
});
const checkCatalog = ref(false);
let certificates = reactive<Array<File | any>>([]);
let certificateOfExtracts = reactive<Array<File | any>>([]);
let bankDetails = reactive<Array<File | any>>([]);
let directorIDs = reactive<Array<File | any>>([]);
let documents = reactive<Array<File | any>>([]);

//methods
const rulesRef = reactive({
  phoneNumber: [
    {
      required: true,
      message: t("required"),
    },
    {
      min: 9,
      message: t("min", { min: 9 }),
      trigger: "change",
    },
    {
      digit: 9,
      message: "digit 9 olmalidir",
    },
    {
      max: 9,
      message: t("max", { max: 9 }),
      trigger: "change",
    },
  ],
  name: [
    {
      required: true,
      message: t("required"),
    },
  ],
  companyName: [
    {
      required: true,
      message: t("required"),
    },
  ],
  emailAddress: [
    {
      required: true,
      message: t("required"),
    },
    {
      email: true,
      message: "Email olmalidir",
    },
  ],
});
const { resetFields, validate, validateInfos } = useForm(formData, rulesRef);
const onSubmit = () => {
  validate()
    .then((result) => {
      if (verified.value == false) checkRecaptcha.value = "error";
      // if (!result || !verified.value || !checkCatalogList) {
      if (checkCatalogList.value || !verified.value) {
        checkCatalog.value = false;
      } else {
        checkCatalog.value = true;
        return;
      }
      submitLoading.value = true;
      let FormDataMethod = new FormData();
      FormDataMethod.append("emailAddress", formData.emailAddress);
      FormDataMethod.append("companyName", formData.companyName);
      FormDataMethod.append("name", formData.name);
      FormDataMethod.append("note", formData.note);
      FormDataMethod.append("phoneNumber", formData.phoneNumber);
      documents.forEach((document: any, index: number) => {
        FormDataMethod.append(`documents[${index}].type`, document.type);
        FormDataMethod.append(`documents[${index}].file`, document.file);
      });
      useJoinUsStore()
        .fetchApplications(FormDataMethod)
        .then(() => {
          visibleSavedInfo.value = true;
          formData = {} as Filter;
          // this.$validator.reset();
          resetFields();
          certificates = [];
          certificateOfExtracts = [];
          bankDetails = [];
          directorIDs = [];
          documents = [];
        })
        .finally(() => {
          submitLoading.value = false;
        });
    })
    .catch((err) => {
    });

};
const handleCancel = function () {
  visibleSavedInfo.value = false;
};
watch(locale, (newLocale) => {
  fetchAndMapSections();
});

// const { executeRecaptcha } = useGoogleRecaptcha();
const removeFile = function (data: any, document: string) {
  switch (document) {
    case "certificates":
      certificates.splice(data.index, 1);
      break;
    case "certificateOfExtracts":
      certificateOfExtracts.splice(data.index, 1);
      break;
    case "bankDetails":
      bankDetails.splice(data.index, 1);
      break;
    case "directorIDs":
      directorIDs.splice(data.index, 1);
      break;
    default:
      break;
  }
  documents = documents.filter((document: File | any) => {
    return (
      document && document.file.lastModified !== data.document.file.lastModified
    );
  });
};
const uploadCertificateFile = function (file: File | any) {
  certificates.push(file);
  documents.push({
    type: "TAX_PAYER_CERTIFICATE",
    file: file.file,
  });
};
const uploadCertificateOfExtract = function (file: File | any) {
  certificateOfExtracts.push(file);
  documents.push({
    type: "LEGAL_ENTITIES_STATE_REGISTRATION_EXTRACT",
    file: file.file,
  });
};
const uploadBankDetail = function (file: File | any) {
  bankDetails.push(file);
  documents.push({
    type: "BUSINESS_ACCOUNT_BANK_DETAILS",
    file: file.file,
  });
};
const uploadDirectorID = function (file: File | any) {
  directorIDs.push(file);
  documents.push({
    type: "DIRECTOR_ID_CARD",
    file: file.file,
  });
};
const onError = function (error: Error) {
  // this.$recaptcha.reset();
};
const onSuccess = async function () {
  try {
    const { token } = await executeRecaptcha(RecaptchaAction.login);
    console.log(token);

    await useRecaptchaStore().fetchRecaptcha({ response: token });
    if (useRecaptchaStore().getStatus === "success") {
      verified.value = true;
      checkRecaptcha.value = "success";
      onSubmit();
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

onMounted(() => { });
const fetchAndMapSections = async () => {
  await useJoinUsStore().fetchSections({ page: "JOIN_US" });

  if (
    useJoinUsStore().getStatus === "success" &&
    useJoinUsStore().getSections.length > 0
  ) {
    const parser = new DOMParser();
    useJoinUsStore().getSections.map((item) => {
      switch (item.keyword) {
        case "JoinUs.Title":
          title.value = item.content;
          break;
        case "JoinUs.Description":
          description.value = item.content;
          break;
        case "JoinUs.Form.Input.Label.FullName":
          fullName.value = item.content;
          break;
        case "JoinUs.Form.Input.Label.LegalName":
          LegalName.value = item.content;
          break;
        case "JoinUs.Form.Input.Label.Phone":
          phone.value = item.content;
          break;
        case "JoinUs.Form.Input.Label.Email":
          email.value = item.content;
          break;
        case "JoinUs.Form.Input.Label.Note":
          note.value = item.content;
          break;
        case "JoinUs.Form.Input.Placeholder":
          placeholder.value = parser.parseFromString(
            item.content,
            "text/html"
          ).body.textContent;
          break;
        case "JoinUs.Form.Button.Text":
          btnText.value = parser.parseFromString(
            item.content,
            "text/html"
          ).body.textContent;
          break;
        default:
          title.value = "";
          btnText.value = "";
          break;
      }
    });
  }
};
fetchAndMapSections();

const checkCatalogList = computed(() => {
  return (
    certificates.length > 0 &&
    certificateOfExtracts.length > 0 &&
    bankDetails.length > 0 &&
    directorIDs.length > 0
  );
});
</script>
<style>
#dynamic-description :is(h1, h2, h3, h4, h5, h6),
#dynamic-description s,
#dynamic-description u,
#dynamic-description strong,
#dynamic-description em,
#dynamic-description blockquote {
  color: #6b7280;
}

#dynamic-description ul {
  color: #6b7280;
  list-style: none;
  padding: 0;
  margin: 0;
}

#dynamic-description ul li {
  padding-left: 1em;
  text-indent: -0.7em;
  color: #6b7280;
  font-size: 20px;
  margin-bottom: 12px;
}

#dynamic-description ul li::before {
  content: "• ";
  color: #6b7280;
}

label :is(h1, h2, h3, h4, h5, h6),
label strong,
label u,
label em,
label em {
  display: inline-block;
}

/* .ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 50px;
} */
</style>
