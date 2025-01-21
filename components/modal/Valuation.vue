<template>
  <a-modal
      :open="true"
      width="724px"
      :dialog-style="{ top: '20px' }"
      @cancel="handleCancel"
  >
    <template #title>
      <h2 class="text-3xl font-bold text-gray-700 max-w-[400px]">{{
          t('product_evaluation')
        }}</h2>
    </template>
    <a-form :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }">
      <div class="overflow-y-auto">
        <ul class="m-0 p-0 flex flex-col justify-start items-start">
          <li class="flex flex-col w-full min-w-full h-auto mb-3">
            <div
                v-if="action.action == 'detail' || action.action == 'edit'"
                class="flex flex-col md:flex-row justify-start items-start md:items-center w-full h-auto mb-3"
            >
              <!-- Detail and Edit -->
              <a :href="`/mehsullar/${props.product.product.id}`" target="_blank">
                <div
                    class="m-0 p-0 mr-6 w-auto overflow-hidden inline-flex relative justify-center items-center"
                >
                  <img
                      :src="`${useRuntimeConfig().public.baseURL}/${props.product.product.thumbnail}`"
                      :alt="props.product.product.name"
                      class="w-[86px] h-[86px] max-w-[86px] max-h-[86px] min-w-[86px] min-h-[86px] object-cover"
                      @error="setDefaultImage"
                  />
                </div>
              </a>
              <div class="flex flex-col items-start justify-start">
                <span class="flex flex-col md:flex-row w-full h-auto mb-3">
                  <span class="text-xl font-medium text-[#6B7280] mr-3"
                  >{{ t("product") }}:
                  </span>
                  <a
                      :href="`/mehsullar/${props.product.product.id}`"
                      target="_blank"
                      class="text-[#374151] text-xl font-semibold"
                  >
                    {{ props.product.product.name }}</a
                  >
                </span>
                <span class="flex flex-col md:flex-row w-full h-auto">
                  <span class="text-xl font-medium text-[#6B7280] mr-3"
                  >{{ t("store") }}:
                  </span>
                  <a
                      :href="`/magazalar/${props.product.store.id}`"
                      target="_blank"
                      class="text-[#374151] text-xl font-semibold"
                  >
                    {{ props.product.store.name }}</a
                  >
                </span>
              </div>
            </div>
            <div
                v-else
                class="flex flex-col md:flex-row justify-start items-start md:items-center w-full h-auto mb-3"
            >
              <a :href="`/mehsullar/${product.id}`" target="_blank">
                <picture
                    class="m-0 p-0 mr-6 w-auto overflow-hidden inline-flex relative justify-center items-center"
                >
                  <img
                      v-if="hasValidThumbnail(props.product)"
                      :src="`${useRuntimeConfig().public.baseURL}/${props.product.product.thumbnail}`"
                      :alt="props.product.product.name"
                      class="w-[86px] h-[86px] max-w-[86px] max-h-[86px] min-w-[86px] min-h-[86px] object-cover"
                      @error="setDefaultImage"
                  />
                </picture>
              </a>
              <div class="flex flex-col items-start justify-start">
                <span class="flex flex-col md:flex-row w-full h-auto mb-3">
                  <span class="text-xl font-medium text-[#6B7280] mr-3"
                  >{{ t("product") }}:
                  </span>
                  <a
                      :href="`/mehsullar/${props.product.product.id}`"
                      target="_blank"
                      class="text-[#374151] text-xl font-semibold"
                  >
                    {{ props.product.product.name }}</a
                  >
                </span>
                <span class="flex flex-col md:flex-row w-full h-auto">
                  <span class="text-xl font-medium text-[#6B7280] mr-3"
                  >{{ t("store") }}:
                  </span>
                  <a
                      :href="`/magazalar/${props.product.store.id}`"
                      target="_blank"
                      class="text-[#374151] text-xl font-semibold"
                  >
                    {{ props.product.store.name }}</a
                  >
                </span>
              </div>
            </div>
            <hr class="w-full min-w-full h-[1px] bg-[#CBD5E1] my-3"/>
          </li>
          <li class="flex flex-col w-full min-w-full h-auto mb-3">
            <div
                class="flex flex-col md:flex-row justify-start items-start md:items-center w-full h-auto mb-3"
            >
              <a-form-item class="!m-0">
                <template #label>
                  <label
                      class="ant-form-item-required text-[#374151] text-2xl font-semibold"
                  >{{ t("rating_title") }}</label
                  >
                </template>
                <div class="flex flex-col whitespace-nowrap w-auto m-0 p-0">
                  <div class="flex items-center space-x-0.5">
                    <template v-for="i in 5" :key="i">
                      <a-tooltip :title="t(`desc.${i - 1}`)" trigger="hover">
                        <div
                            class="w-8 h-8 cursor-pointer flex items-center justify-center"
                            @mouseover="hoverRating = i"
                            @mouseout="hoverRating = 0"
                            @click="setRating(i)"
                        >
                          <!-- Ulduz ikonu -->
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              class="w-6 h-6"
                              :class="i <= (hoverRating || formData.rating) ? 'text-yellow-400' : 'text-gray-300'"
                          >
                            <path
                                d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.788 1.4 8.173L12 18.897l-7.334 3.857 1.4-8.173-5.934-5.788 8.2-1.193z"
                            />
                          </svg>
                        </div>
                      </a-tooltip>
                    </template>
                  </div>
                  <span class="text-[#6B7280] text-base font-medium italic">{{
                      rateValueText
                    }}</span>
                </div>
              </a-form-item>
            </div>
            <hr class="w-full min-w-full h-[1px] bg-[#CBD5E1] my-3"/>
          </li>
          <li class="flex flex-col w-full min-w-full h-auto mb-3">
            <div class="flex flex-col justify-start items-start w-full h-auto">
              <a-form-item
                  class="w-full m-0 p-0"

              >
                <template #label>
                  <label
                      for="_phone"
                      class="text-[#374151] text-2xl font-semibold m-0 p-0"
                  >{{ t("product_review") }}</label
                  >
                </template>
                <div
                    v-if="props.action.action == 'detail'"
                    class="flex flex-col justify-start items-start w-full h-auto p-0 m-0"
                >
                  <span
                      class="text-[#374151] text-xl font-semibold leading-7"
                  >{{ props.product.comment }}</span
                  >
                </div>
                <a-textarea
                    v-else
                    @change="calculateTextSymbolCount"
                    :rows="6"
                    v-model:value="formData.comment"
                    :maxLength="300"
                    name="comment"
                    placeholder=""
                >
                </a-textarea>
              </a-form-item>
              <div
                  v-if="props.action.action != 'detail'"
                  class="text-right w-full min-w-full h-auto text-[#262626] text-xs font-normal"
              >
                {{ descriptionLength }}
                {{ t("symbol_title") }}
              </div>
            </div>
            <hr class="w-full min-w-full h-[1px] bg-[#CBD5E1] my-3"/>
          </li>
          <li class="flex flex-col w-full min-w-full h-auto">
            <label
                class="text-[#374151] w-full text-2xl font-semibold m-0 p-0"
            >{{ t("picture_title") }}
            </label>
            <div class="block w-full h-auto my-3">
              <div v-for="(photo,index) in otherFileList"
                   class=" float-left relative group w-[102px] h-[102px] rounded-lg overflow-hidden border shadow-md mr-2 p-1">
                <img
                    :src="`${photo.data}`"
                    :alt="photo.name"
                    class="w-full h-full object-cover"
                />
                <div
                    class="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <button
                      @click="handlePreview(photo.data,photo.name)"
                      class="hover:text-white text-gray-300 p-2 rounded-full">
                    <eye_icon/>
                  </button>
                  <button
                      @click="removeOtherImage(index)"
                      class="text-gray-300 hover:text-white p-2 rounded-full ">
                    <remove_image_icon/>
                  </button>
                </div>
              </div>
              <div class="clearfix float-left">
                <a-upload
                    v-if="showUploadButton"
                    accept="image/png, image/gif, image/jpeg"
                    list-type="picture-card"
                    name="avatar"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    :before-upload="beforeUpload"
                    @change="handleChangeFile"
                    :showDownloadIcon="false"
                >
                  <div>
                    <plus-outlined/>
                    <div style="margin-top: 8px">{{ t("download") }}</div>
                  </div>
                </a-upload>
              </div>
              <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancelPreview">
                <img alt="example" style="width: 100%" :src="previewImage"/>
              </a-modal>
            </div>
            <hr class="w-full min-w-full h-[1px] bg-[#dcdcdd] mb-3"/>
          </li>
          <li
              v-if="
              props.action.action == 'detail' || props.action.action == 'edit'
            "
              class="flex flex-col w-full min-w-full h-auto mb-3"
          >
            <ul class="flex flex-col justify-start items-start p-0 m-0">
              <li class="flex flex-row justify-start items-center m-0 p-0 mb-3">
                <span
                    class="text-[#6B7280] font-medium text-base mr-3 leading-5"
                >{{ t("status") }}:</span
                >
                <span
                    :style="resolveStatusStyle(product)"
                    class="font-semibold text-base leading-5"
                >{{ props.product.status?.status }}</span
                >
              </li>
              <li
                  v-if="props.product.rejection?.reason"
                  class="flex flex-row justify-start items-center m-0 p-0 mb-3"
              >
                <span
                    class="text-[#6B7280] font-medium text-base leading-5 mr-3"
                >{{ t("reason_for_refusal") }}:</span
                >
                <span
                    class="text-[#374151] font-semibold text-base leading-5"
                >{{ props.product.rejection.reason }}</span
                >
              </li>
              <li
                  v-if="props.product.status?.label == 'REJECTED'"
                  class="flex flex-row justify-start items-center m-0 p-0"
              >
                <span
                    class="text-[#6B7280] font-medium text-base leading-5 mr-3"
                >{{ t("date_of_rejection") }}:</span
                >
                <span
                    class="text-[#374151] font-semibold text-base leading-5"
                >{{
                    props.product.rejection &&
                    dateModel(props.product.rejection.rejectedAt)
                  }}</span
                >
              </li>
              <li
                  v-if="props.product.status?.label == 'PUBLISHED'"
                  class="flex flex-row justify-start items-center m-0 p-0"
              >
                <span
                    class="text-[#6B7280] font-medium text-base leading-5 mr-3"
                >{{ t("publication_date") }}:</span
                >
                <span
                    class="text-[#374151] font-semibold text-base leading-5"
                >{{
                    props.product.publishedAt &&
                    dateModel(props.product.publishedAt)
                  }}</span
                >
              </li>
              <li
                  v-if="props.product.status?.label == 'CREATED'"
                  class="flex flex-row justify-start items-center m-0 p-0"
              >
                <span
                    class="text-[#6B7280] font-medium text-base leading-5 mr-3"
                >{{ t("date_of_shipment") }}:</span
                >
                <span
                    class="text-[#374151] font-semibold text-base leading-5"
                >{{
                    props.product.createdAt &&
                    dateModel(props.product.createdAt)
                  }}</span
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </a-form>
    <template #footer>
      <div
          :class="{
          'justify-end': props.action.action == 'detail',
          'justify-between': props.action.action != 'detail',
        }"
          class="flex"
      >
        <button
            class="border border-[#E5E7EB] text-[#6B7280] px-3 py-1 rounded-md hover:text-[#16A34A] hover:border-[#16A34A]"
            @click="handleCancel"
        >
          {{ t("close_modal") }}
        </button>
        <div v-if="props.action.action != 'detail'">
          <button
              v-if="props.action.action == 'edit'"
              :disabled="hasChange"
              :class="{
              'bg-slate-600 text-gray-700': hasChange,
              'bg-[#16A34A] text-[#fff]': !hasChange,
            }"
              class="disabled:opacity-25 text-sm font-medium hover:bg-green-700 px-3 py-1 border border-gray-300 rounded-md cursor-pointer"
              @click="handleOk"
          >
            <span>{{ t("save") }}</span>
          </button>
          <!--          <button-->
          <!--            v-else-->
          <!--            :disabled="errors.items.length > 0 || formData.rating == 0"-->
          <!--            :class="{-->
          <!--              'bg-slate-600 text-gray-700':-->
          <!--                errors.items.length > 0 || formData.rating == 0,-->
          <!--              'bg-[#16A34A] text-[#fff]': formData.rating != 0,-->
          <!--            }"-->
          <!--            class="disabled:opacity-25 text-sm font-medium hover:bg-green-700 px-3 py-1 border border-gray-300 rounded-md cursor-pointer"-->
          <!--            @click="handleOk"-->
          <!--          >-->
          <!--            <span>{{ t("add") }}</span>-->
          <!--          </button>-->
        </div>
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import moment from "moment";
import type {ReviewDetail} from "~/utils/types/reviews";

const reviewsStore = useReviewsStore()
const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const showUploadButton = ref(true)
const {t} = useI18n();
const props = defineProps({
  product: {
    type: Object as PropType<ReviewDetail>,
    default: {},
  },
  action: {
    type: Object as PropType<{ action: string }>,
    default: {action: ""},
  },
});
const emit = defineEmits(["handleOk", "close", "ok"]);
const otherFileList: any = ref([]);
let photos = ref<any[]>([]);
const hasChange = ref(true);
const allowFileTypes = reactive(["image/jpeg", "image/png", "image/jpg"]);
const allowFileSize = ref(5242880); //5 mb (binary)
const rateValueText = ref("");
const descriptionLength = ref(300);
const dateFormat = ref("DD/MM/YYYY HH:mm:ss");
const formData = reactive({
  rating: 0,
  comment: undefined as undefined | any,
});
const desc = t("desc");
// const rating = ref(0);
const hoverRating = ref(0);

const setRating = (value: number) => {
  formData.rating = value;
  changeRate(formData.rating);
};
const handleChangeFile = function (params: any) {

}

function getBase64Async(img: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(img);
  });
}

const handlePreview = async (file: any, fileName: string = "Şəkil") => {
  if (!file.url && !file.preview && file.originFileObj) {
    file.preview = await getBase64Async(file.originFileObj);
  }
  previewImage.value = file || file.preview || null;
  previewVisible.value = true;
  previewTitle.value = fileName || (file.url ? file.url.substring(file.url.lastIndexOf('/') + 1) : 'Unknown');
};
onMounted(async () => {
  if (props.action.action == "detail") {
    formData.rating = !Number.isInteger(Number(props.product.rating))
        ? Number(`${Math.floor(props.product.rating)}.${5}`)
        : props.product.rating;
  } else if (props.action.action == "edit") {
    formData.rating = props.product.rating;
  }
  if (props.action.action == "detail" || props.action.action == "edit") {
    formData.comment = props.product.comment;
    changeRate(formData.rating);
    otherFileList.value = [...props.product.photos]
    photos.value = props.product.photos.map((photo) => {
      return {
        file: null,
        id: photo.id,
      }
    })
    descriptionLength.value -= formData.comment && formData.comment.length
        ? formData.comment.length
        : 0;
  }
})

const dateModel = function (value: any) {
  let dat = new Date(value).toString();
  return moment(dat).format("DD/MM/yyyy HH:mm:ss");
};

const beforeUpload = function (file: any) {
  if (file && allowFileTypes.includes(file.type)) {
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
        otherFileList.value.push(obj);
        if (props.action.action == "edit") {
          photos.value.push({
            file: {data: imageUrl, name: file.name},
            id: null,
          });
        } else {
          photos.value.push({data: imageUrl, name: file.name});
        }
        hasChange.value = false;
      });
    }
  }
  return false;
};
const removeOtherImage = function (index: number) {
  otherFileList.value.splice(index, 1);
  photos.value.splice(index, 1);
  hasChange.value = false;
};
const calculateTextSymbolCount = function (val: any) {
  hasChange.value = false;
  descriptionLength.value = 300;
  descriptionLength.value -= val.srcElement.textLength;
};
const changeRate = function (val: any) {
  if (val != props.product.rating) {
    hasChange.value = false;
  }
  if (val <= 1) {
    rateValueText.value = t("desc.0", { returnObjects: true });
  } else if (1 < val && val <= 2) {
    rateValueText.value = t("desc.1");
  } else if (2 < val && val <= 3) {
    rateValueText.value = t("desc.2");
  } else if (3 < val && val <= 4) {
    rateValueText.value = t("desc.3");
  } else if (4 < val && val <= 5) {
    rateValueText.value = t("desc.4");
  } else if (val == undefined) {
    rateValueText.value = "";
  }
};

const resolveStatusStyle = function (record: any) {
  if (record.status?.label == "CREATED") {
    return "color:#1890FF";
  } else if (record.status?.label == "PUBLISHED") {
    return "color:#389E0D";
  } else if (record.status?.label == "REJECTED") {
    return "color:#F5222D";
  } else if (record.status?.label == "DELETED") {
    return "color:#EB2F96";
  } else if (record.status?.label == "IN_INSPECTION") {
    return "color:#FAAD14";
  }
};
const handleOk = async function () {
  formData.comment = formData.comment == "" ? null : formData.comment;
  if (props.action.action == "edit") {
    formData.comment =
        formData.comment == "" ? null : formData.comment;
    let sendFormData = {
      ...formData,
      photos: photos.value,
    };
    try {
      await reviewsStore.fetchProductReview({
        sendFormData: sendFormData,
        productId: props.product.id,
      })
      if (reviewsStore.getReviewedStatus === 'success') {
        await emit('ok', true)
        hasChange.value = true;
      }
    } catch (error) {
      console.error("Error while loading review details:", error);
      hasChange.value = false;
    }
  } else {
    // this.$store
    //   .dispatch("review/addReview", {
    //     ...this.formData,
    //     productId: this.product.id,
    //     photos: this.photos,
    //   })
    //   .then((res) => {
    //     this.$emit("ok", true);
    //   });
  }
};

const handleCancelPreview = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};
const handleCancel = function () {
  emit("close", false);
};
const defaultImagePath = await import("assets/img/no-image.svg");
const setDefaultImage = (event: Event | any) => {
  event.target.src = defaultImagePath.default;
  event.target.className = "p-4 w-[70px] h-[70px] max-w-[70px] max-h-[70px] min-w-[70px] min-h-[70px] ";
};

const hasValidThumbnail = function (product: ReviewDetail) {
  if (props.action.action === "edit" || props.action.action == "detail") {
    return product.thumbnailPath;
  } else {
    return product.thumbnailPath;
  }
};
watch(
    photos,
    (newValue: any, oldValue: any) => {
      if (newValue.length === 3 || newValue.length > 3) {
        showUploadButton.value = false;
      }
    },
    {immediate: true, deep: true}
);

</script>
<style scoped>
.ant-form-item-label {
  width: 200px !important;
  min-width: 200px !important;
  max-width: 200px !important;
}

:where(.css-dev-only-do-not-override-1gmf07f).ant-modal .ant-modal-title {
  font-size: 30px;
  font-weight: 700;
}
</style>
