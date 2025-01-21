<template>
  <main class="mt-6 xl:mt-0">
    <div class="flex flex-row justify-between items-center mb-3">
      <nuxt-link
          tag="button"
          to="/kabinet/elanlarim/"
          class="flex flex-row justify-center items-center py-2.5 px-3 w-[77px] md:w-[127px] border-2 border-[#E5E7EB] rounded h-[46px] max-h-[46px]"
      >
        <arrow_left_icon/>
        <span
            class="text-[15px] font-semibold text-[#6B7280] ml-2 hidden md:inline-block"
        >
          {{ t("back") }}</span
        >
      </nuxt-link>
      <div class="flex flex-row justify-end items-center">
        <button
            v-if="
            announcementsStore.getAnnouncement.status &&
            announcementsStore.getAnnouncement.status.label != 'EXPIRED' &&
            announcementsStore.getAnnouncement.status.label != 'DEACTIVATED'
          "
            @click="showDeactiveConfirm(announcementsStore.getAnnouncement.id)"
            class="flex flex-row justify-center items-center py-2.5 px-3 w-auto border-2 border-[#EF4444] mr-2 rounded h-[46px] max-h-[46px]"
        >
          <x_icon/>
          <span
              class="text-[15px] font-semibold text-[#EF4444] ml-2 hidden md:inline-block"
          >{{ t("deactivate") }}</span
          >
        </button>
        <button
            v-if="
            announcementsStore.getAnnouncement.status && announcementsStore.getAnnouncement.status.label == 'DEACTIVATED'
          "
            @click="showActiveConfirm(announcementsStore.getAnnouncement.id)"
            class="flex flex-row justify-center items-center py-2.5 px-3 w-auto border-2 border-[#22C55E] mr-2 rounded h-[46px] max-h-[46px]"
        >
          <active_repair_icon/>
          <span
              class="text-[15px] font-semibold text-[#16A34A] ml-2 hidden md:inline-block"
          >{{ t("activate") }}</span
          >
        </button>
        <button
            v-if="announcementsStore.getAnnouncement.status && announcementsStore.getAnnouncement.status.label != 'EXPIRED'"
            class="flex flex-row justify-center items-center py-2.5 px-3 w-auto border-2 border-[#22C55E] rounded h-[46px] max-h-[46px]"
        >
<!--          @click="showEditModal(announcementsStore.getAnnouncement.id)"-->

          <pen_icon/>
          <span
              class="text-[15px] font-semibold text-[#16A34A] ml-2 hidden md:inline-block"
          >{{ t("edit") }}</span
          >
        </button>
      </div>
    </div>
    <div class="bg-white p-6 rounded-md">
      <section class="flex flex-col">
        <div>
          <h4 class="text-gray-800 font-medium text-sm p-0 m-0 mb-3">
            {{ t("user_data") }}
          </h4>
        </div>
        <div
            class="bg-gray-50 py-1.5 px-6 flex flex-row justify-between md:justify-start items-center"
        >
          <div class="flex flex-col md:flex-row w-full h-auto">
            <h5
                class="w-auto h-auto font-normal text-xs text-[#888888] p-0 m-0 mr-1 mb-1 md:mb-0"
            >
              {{ t("phone_number") }}:
            </h5>
            <p class="font-medium text-xs text-gray-800 m-0 p-0">
              {{ announcementsStore.getAnnouncement.phoneNumber }}
            </p>
          </div>
          <div class="flex flex-col md:flex-row w-full h-auto">
            <h5
                class="w-auto h-auto font-normal text-xs text-[#888888] m-0 p-0 mr-1 mb-1 md:mb-0"
            >
              {{ t("delivery") }}:
            </h5>
            <p class="font-medium text-xs text-green-500 m-0 p-0">
              {{
                announcementsStore.getAnnouncement.isDelivered ? t("it_does") : t("it_does_not")
              }}
            </p>
          </div>
        </div>
      </section>
      <section class="flex flex-col">
        <div class="flex flex-col md:flex-row mt-6 mb-7">
          <div class="flex flex-col w-full md:w-2/5 h-auto">
            <div class="flex flex-col">
              <h3 class="text-gray-900 text-sm font-bold m-0 p-0 mb-3">
                {{ t("catalog_photo") }}
              </h3>
              <div>
                <img
                    id="img_id"
                    class="cursor-pointer ml-0 w-[280px] h-[280px] md:w-[270px] md:h-[270px]"
                    :src="`${useRuntimeConfig().public.baseURL}/${announcementsStore.getAnnouncement.thumbnailPath}`"
                    :alt="t('catalog_photo')"
                    @click="
                    handlePreview(announcementsStore.getAnnouncement.thumbnailPath,announcementsStore.getAnnouncement.thumbnailName)
                  "
                />
              </div>
            </div>
            <div
                v-if="
                announcementsStore.getAnnouncement.productPhotos &&
                announcementsStore.getAnnouncement.productPhotos.length > 0
              "
            >
              <h3 class="text-gray-900 text-sm font-bold m-0 p-0 mt-6 mb-3">
                {{ t("other_pictures") }}
              </h3>
              <div class="flex flex-row">
                <div
                    v-for="(productPhoto, index) in announcementsStore.getAnnouncement.productPhotos"
                    :key="index"
                    class="mr-2"
                >
                  <img
                      style="width: 44px; height: 44px"
                      id="img_id"
                      class="cursor-pointer"
                      :src="`${useRuntimeConfig().public.baseURL}/${productPhoto.path}`"
                      alt="xxx.png"
                      @click="handlePreview(productPhoto.path,announcementsStore.getAnnouncement.thumbnailName)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
              class="flex flex-col justify-start items-start w-full md:w-3/5 h-auto mt-11 md:mt-0 md:ml-9"
          >
            <h4 class="text-gray-800 font-medium text-sm mb-3">
              {{ t("ad_data") }}
            </h4>
            <div class="w-full h-auto">
              <div class="flex flex-col w-full h-auto">
                <div class="flex flex-row w-full h-auto mb-2">
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("ad_number") }}:
                  </h5>
                  <p class="font-bold text-xs text-gray-800 m-0 p-0">
                    {{ announcementsStore.getAnnouncement.id }}
                  </p>
                </div>
                <div class="flex flex-row w-full h-auto mb-2">
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("ad_name") }}:
                  </h5>
                  <p class="font-bold text-xs text-gray-800 m-0 p-0">
                    {{ announcementsStore.getAnnouncement.name }}
                  </p>
                </div>
                <div class="flex flex-row w-full h-auto mb-2">
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("region_title") }}:
                  </h5>
                  <p class="font-bold text-xs text-gray-800 m-0 p-0">
                    {{ announcementsStore.getAnnouncement.city && announcementsStore.getAnnouncement.city.name }}
                  </p>
                </div>
                <div class="flex flex-row w-full h-auto mb-2">
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("subcategory") }}:
                  </h5>
                  <p class="font-bold text-xs text-gray-800 m-0 p-0">
                    {{
                      announcementsStore.getAnnouncement.subcategory &&
                      announcementsStore.getAnnouncement.subcategory.name
                    }}
                  </p>
                </div>
                <div class="flex flex-row w-full h-auto mb-2">
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("product_type") }}:
                  </h5>
                  <p class="text-xs text-gray-800 font-bold m-0 p-0">
                    {{ announcementsStore.getAnnouncement.type }}
                  </p>
                </div>
                <div class="flex flex-row w-full h-auto mb-2">
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("unit_quantity_and_size") }}:
                  </h5>
                  <p class="text-xs text-gray-800 font-bold m-0 p-0">
                    {{ announcementsStore.getAnnouncement.measurementValue }}
                    {{ announcementsStore.getAnnouncement.measurementUnit }}
                  </p>
                </div>

                <div class="flex flex-row w-full h-auto mb-2">
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 mr-1.5"
                  >
                    {{ t("price") }}:
                  </h5>
                  <div
                      class="flex flex-row justify-start items-center text-xs text-gray-800 font-bold"
                  >
                    <span class="mr-1"> {{ announcementsStore.getAnnouncement.price }}</span>
                    <monetary_unit_logo
                        :styleSVG="{ widht: 14, height: 11, color: '#374151' }"
                    />
                  </div>
                </div>

                <div class="flex flex-col w-full h-auto mb-2">
                  <h5
                      class="h-auto w-24 font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("general_description") }}:
                  </h5>
                  <p
                      class="text-xs text-gray-800 font-bold m-0 p-0 break-words text-balance"
                  >
                    {{ announcementsStore.getAnnouncement.description }}
                  </p>
                </div>
                <div
                    v-if="announcementsStore.getAnnouncement.createdAt"
                    class="flex flex-row w-full h-auto mb-2"
                >
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("ad_creation_date") }}:
                  </h5>
                  <p class="font-bold text-xs text-gray-800 m-0 p-0">
                    {{
                      announcementsStore.getAnnouncement.createdAt &&
                      dateModel(announcementsStore.getAnnouncement.createdAt)
                    }}
                  </p>
                </div>
                <div
                    v-if="announcementsStore.getAnnouncement.publishedAt"
                    class="flex flex-row w-full h-auto mb-2"
                >
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("ad_publication_date") }}:
                  </h5>
                  <p class="font-bold text-xs text-gray-800 m-0 p-0">
                    {{
                      announcementsStore.getAnnouncement.publishedAt &&
                      dateModel(announcementsStore.getAnnouncement.publishedAt)
                    }}
                  </p>
                </div>
                <div
                    v-if="announcementsStore.getAnnouncement.promotedAt"
                    class="flex flex-row w-full h-auto mb-2"
                >
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("ad_update_date") }}:
                  </h5>
                  <p class="font-bold text-xs text-gray-800 m-0 p-0">
                    {{
                      announcementsStore.getAnnouncement.promotedAt &&
                      dateModel(announcementsStore.getAnnouncement.promotedAt)
                    }}
                  </p>
                </div>
                <div
                    v-if="announcementsStore.getAnnouncement.vipAt"
                    class="flex flex-row w-full h-auto mb-2"
                >
                  <h5
                      class="w-auto h-auto font-normal text-xs text-gray-500 m-0 p-0 mr-1.5"
                  >
                    {{ t("date_of_making_the_ad_VIP") }}:
                  </h5>
                  <p class="font-bold text-xs text-gray-800 m-0 p-0">
                    {{
                      announcementsStore.getAnnouncement.vipAt && dateModel(announcementsStore.getAnnouncement.vipAt)
                    }}
                  </p>
                </div>
              </div>
              <div
                  v-if="announcementsStore.getAnnouncement.status"
                  class="flex flex-col md:flex-row justify-start md:items-center w-full h-auto mt-4"
              >
                <a-tooltip placement="top">
                  <template
                      v-if="
                      announcementsStore.getAnnouncement.status &&
                      announcementsStore.getAnnouncement.status.label != 'PUBLISHED'
                    "
                      #title
                  >
                    <span>{{ t("only_published_ads_can_be_forwarded") }}</span>
                  </template>
                  <div
                      v-if="announcementsStore.getAnnouncement.status"
                      class="w-full max-w-[300px] h-auto mb-3 md:mb-0 md:mr-3"
                  >
                    <button
                        @click="promoteAnnouncement"
                        :disabled="announcementsStore.getAnnouncement.status.label != 'PUBLISHED'"
                        :class="{
                        'hover:border-[#ACB7B0]':
                          announcementsStore.getAnnouncement.status &&
                          announcementsStore.getAnnouncement.status.label != 'PUBLISHED',
                        'hover:hover:border-[#16A34A]':
                          announcementsStore.getAnnouncement.status &&
                          announcementsStore.getAnnouncement.status.label == 'PUBLISHED',
                      }"
                        class="flex flex-row justify-center items-center bg-[#DCFCE7] max-w-[300px] px-6 py-2.5 w-full hover:rounded hover:border-2 h-11"
                    >
                      <sort_ascending_icon/>
                      <span class="ml-2.5 font-medium text-sm text-[#14532D]">{{
                          t("forward_the_ad")
                        }}</span>
                    </button>
                  </div>
                </a-tooltip>
                <a-tooltip placement="top">
                  <template
                      v-if="
                      announcementsStore.getAnnouncement.status &&
                      announcementsStore.getAnnouncement.status.label != 'PUBLISHED'
                    "
                      #title
                  >
                    <span>{{ t("only_published_ads_can_be_made_VIP") }}</span>
                  </template>
                  <div
                      v-if="announcementsStore.getAnnouncement.status"
                      class="w-full max-w-[300px] h-auto mb-3 md:mb-0 md:mr-3"
                  >
                    <button
                        @click="vipDoAnnouncement"
                        :disabled="announcementsStore.getAnnouncement.status.label != 'PUBLISHED'"
                        :class="{
                        'hover:border-[#ACB7B0]':
                          announcementsStore.getAnnouncement.status &&
                          announcementsStore.getAnnouncement.status.label != 'PUBLISHED',
                        'hover:hover:border-[#16A34A]':
                          announcementsStore.getAnnouncement.status &&
                          announcementsStore.getAnnouncement.status.label == 'PUBLISHED',
                      }"
                        class="flex flex-row justify-center items-center bg-[#DCFCE7] max-w-[300px] px-6 py-2.5 w-full hover:rounded hover:border-2 h-11"
                    >
                      <vip_icon/>
                      <span class="ml-2.5 font-medium text-sm text-[#14532D]">{{
                          t("make_an_ad_VIP")
                        }}</span>
                    </button>
                  </div>
                </a-tooltip>
              </div>
            </div>
            <!-- </a-row> -->
          </div>
        </div>

        <div class="mt-5">
          <div class="bg-gray-200 p-3 rounded-md flex justify-between">
            <div class="text-sm text-black">
              {{ t("status") }}:
              <span
                  v-if="announcementsStore.getAnnouncement.status"
                  :class="resolveStatusClass(announcementsStore.getAnnouncement.status)"
              >
                {{ announcementsStore.getAnnouncement.status.status }}
              </span>
            </div>
            <div
                style="color: #1890ff"
                class="flex items-center cursor-pointer"
                @click="statusDetail"
            >
              <span class="mr-1">{{ t("more") }}</span>
              <ArrowRightOutlined/>
            </div>
          </div>
        </div>
        <LazyPreviewImage
            :previewImage="previewImage"
            :previewImageName="previewImageName"
            v-if="previewVisible"
            @cancel="closePreviewImageModal"
        />
        <ToggleStatusModal
            :textData="toggleStatusModalText"
            v-if="visibleToggleStatus"
            @cancel="visibleToggleStatus = false"
            @ok="submitToggleStatus"
        />

        <!--        <announcementsStore.getAnnouncementUpdateModal-->
        <!--            v-if="updateModalVisible"-->
        <!--            @close="closeEditModal"-->
        <!--            @ok="onSuccessUpdate"-->
        <!--        />-->
        <PromoteListing
            v-if="visiblePromoteListing"
            :data="textData"
            @close="onClose"
            @ok="onSucces"
        />
        <AnnouncementStatusDetail
            v-if="visibleStatusDetail"
            :statusData="statusData"
            @closeStatusDetail="closeStatusDetail"
        />
      </section>
    </div>
  </main>
</template>
<script setup lang="ts">
import type {Announcements, FarmerProductHistories} from "~/utils/types/announcement";
import moment from "moment";
import ToggleStatusModal from "~/components/modal/ToggleStatusModal.vue";

const {t} = useI18n()
const announcementsStore = useAnnouncementsStore()
const previewVisible = ref(false);
const previewImage = ref()
const previewImageName = ref<string>()
const types = ref<null | any>()
const visiblePromoteListing = ref(false)
const visibleStatusDetail = ref(false)
let textData = reactive({})
const statusData = reactive({
  published: [] as Array<FarmerProductHistories>,
  rejected: [] as Array<FarmerProductHistories>,
  registered: [] as Array<FarmerProductHistories>,
  expired: [] as Array<FarmerProductHistories>,
  unPublished: [] as Array<FarmerProductHistories>,
})
const toggleStatusType = ref()
let toggleStatusModalText = reactive({})
// const visibleAnnouncement = ref(false)
const selectedId = ref()
const visibleToggleStatus = ref(false)
onUnmounted(() => {
  announcementsStore.resetAnnouncement()
})
watch(
    () => useRoute().params.announcementdetail,
    (newId) => {
      if (newId && announcementsStore.getAnnouncementStatus !== 'success') {
        announcementsStore.fetchAnnouncementDetail(Number(newId));
      }
    },
    {immediate: true, deep: true}
);

const onClose = function () {
  visiblePromoteListing.value = false;
}
const onSucces = async function (type: any) {
  console.log(type)
  if (type.type == "promote") {
    try {
      await announcementsStore.fetchAnnouncementPromote(announcementsStore.getAnnouncement.id)
      if (announcementsStore.getAnnouncementPromoteStatus === 'success') {
        visiblePromoteListing.value = false;
        message.success(t("ad_has_been_promoted"), 2, onClose)
        // announcementsStore.fetchAnnouncementDetail(Number(useRoute().params.announcementdetail))
      }
    } catch (e) {
      console.error(e)
    }
  } else {
    try {
      await announcementsStore.fetchAnnouncementVIP(announcementsStore.getAnnouncement.id)
      if (announcementsStore.getAnnouncementVIPStatus === 'success') {
        visiblePromoteListing.value = false;
        message.success(t("ad_has_been_made_VIP"), 2, onClose)
        // announcementsStore.fetchAnnouncementDetail(Number(useRoute().params.announcementdetail))
      }
    } catch (e) {
      console.error(e)
    }
  }
}
const promoteAnnouncement = function (id: number | any) {
  visiblePromoteListing.value = true;
  textData = {
    title: t("are_you_sure_want_to_move_the_ad_forward"),
    description:
        t('ad_will_be_featured_further_in_the_Farm_Products_directory'),
    type: "promote",
  };
}
const vipDoAnnouncement = function (id: number) {
  visiblePromoteListing.value = true;
  textData = {
    title: t('are_you_sure_you_want_to_make_the_announcement_VIP'),
    description:
        t('your_listing_will_be_featured_in_the_VIP_Farmer_Products_catalog_for_30_days'),
    type: "vip",
  };
}
const showDeactiveConfirm = function (id: number, type = null) {
  selectedId.value = id;
  toggleStatusType.value = 'deactive';
  visibleToggleStatus.value = true;
  toggleStatusModalText = {
    pharagraph_0: t("are_you_sure_you_want_to_disable_the_ad"),
    pharagraph_1: t("your_ad_will_not_appear_on_the_web_page"),
  }
}

const showActiveConfirm = function (id: number, type = null) {
  selectedId.value = id;
  toggleStatusType.value = 'active';
  visibleToggleStatus.value = true;
  toggleStatusModalText = {
    pharagraph_0: t("are_you_sure_you_want_to_enable_the_ad"),
  }
}
const submitToggleStatus = async function () {
  if (toggleStatusType.value === "active") {
    try {
      await announcementsStore.fetchAnnouncementActive(selectedId.value)
      if (announcementsStore.getAnnouncementActivateStatus === 'success') {
        visibleToggleStatus.value = false;
        await announcementsStore.fetchAnnouncementDetail(Number(useRoute().params.announcementdetail))
      }
    } catch (e) {
      console.error(e)
    }
  } else {
    try {
      await announcementsStore.fetchAnnouncementDeactive(selectedId.value)
      if (announcementsStore.getAnnouncementDeactivateStatus === 'success') {
        visibleToggleStatus.value = false;
        await announcementsStore.fetchAnnouncementDetail(Number(useRoute().params.announcementdetail))
      }
    } catch (e) {
      console.error(e)
    }
  }
}
//     showEditModal(id) {
//       this.selectedId = id;
//       this.$store
//           .dispatch("advertisement/getannouncementsStore.getAnnouncementById", id)
//           .then(() => {
//             this.updateModalVisible = true;
//           });
//     },
//     closeEditModal() {
//       this.updateModalVisible = false;
//       this.$store.commit("setannouncementsStore.getAnnouncementDetailModal", true);
//     },
//     onSuccessUpdate() {
//       this.$store.dispatch(
//           "advertisement/getannouncementsStore.getAnnouncementById",
//           this.selectedId
//       );
//       this.$store.commit("setannouncementsStore.getAnnouncementDetailModal", true);
//       this.loadAnnouncementDetail();
//       this.updateModalVisible = false;
//     },

const closePreviewImageModal = function () {
  previewVisible.value = false;
}
const handlePreview = function (thumbnailPath: string, thumbnailName: string) {
  previewImage.value = `${useRuntimeConfig().public.baseURL}/${thumbnailPath}`;
  previewImageName.value = thumbnailName;
  previewVisible.value = true;
}

const resolveStatusClass = function (status: any) {
  if (status.label == "PUBLISHED") {
    return "text-green-600";
  } else if (status.label == "REJECTED") {
    return "text-red-600";
  } else if (status.label == "REGISTERED") {
    return "text-yellow-600";
  } else if (status.label == "EXPIRED") {
    return "text-gray-400";
  } else if (status.label == "UNPUBLISHED") {
    return "text-orange-400";
  }
}
const dateModel = function (value: Date | string) {
  let dat = new Date(value).toString();
  return moment(dat).format("DD/MM/yyyy HH:mm:ss");
}
//     handleClose() {
//       this.$router.push({
//         path: this.$route.fullPath,
//         query: { id: undefined, status: undefined },
//       });
//       this.$store.commit("setannouncementsStore.getAnnouncementDetailModal", false);
//     },
//     handleEdit() {
//       this.$emit("edit", this.announcementsStore.getAnnouncement.id, true);
//       this.$store.commit("setannouncementsStore.getAnnouncementDetailModal", false);
//     },
const statusDetail = function () {
  statusData.rejected = announcementsStore.getAnnouncement.farmerProductHistories.filter((el: FarmerProductHistories) => {
    return el.status.label == "REJECTED";
  });
  statusData.published = announcementsStore.getAnnouncement.farmerProductHistories.filter(
      (el: FarmerProductHistories) => {
        return el.status.label == "PUBLISHED";
      }
  );
  statusData.registered = announcementsStore.getAnnouncement.farmerProductHistories.filter(
      (el: FarmerProductHistories) => {
        return el.status.label == "REGISTERED";
      }
  );
  statusData.expired = announcementsStore.getAnnouncement.farmerProductHistories.filter((el: FarmerProductHistories) => {
    return el.status.label == "EXPIRED";
  });
  statusData.unPublished = announcementsStore.getAnnouncement.farmerProductHistories.filter(
      (el: FarmerProductHistories) => {
        return el.status.label == "UNPUBLISHED";
      }
  );
  console.log(statusData.published);
  visibleStatusDetail.value = true;
}
const closeStatusDetail = function () {
  visibleStatusDetail.value = false;
}

</script>
