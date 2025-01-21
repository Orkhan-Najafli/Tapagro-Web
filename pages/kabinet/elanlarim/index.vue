<template>
  <div class="mt-9 xl:mt-0">
    <div class="flex flex-col w-full min-w-full">
      <div class="flex justify-between mb-4">
        <div class="block text-left">
          <h3 class="text-emerald-600 font-semibold text-xl">
            {{ t("my_announcements") }}
          </h3>
        </div>
        <nuxt-link
            tag="button"
            to="/yeni-elan"
            class="bg-[#16A34A] rounded-md px-6 py-2 font-semibold text-base text-white h-10 flex items-center"
        >
          <a-icon type="plus" class="mr-1"/>
          {{ t("new_announcement") }}
        </nuxt-link>
      </div>
      <!--      <div-->
      <!--          v-if="getOwnAnnouncementErrorMessage.show"-->
      <!--          class="w-full h-auto min-w-full flex justify-start items-center py-[9px] px-4 bg-[#FFF1F0] border border-[#FFA39E] mt-2 mb-6"-->
      <!--      >-->
      <!--        <strong class="m-0 p-0 font-medium text-sm text-[#262626]">{{-->
      <!--            getOwnAnnouncementErrorMessage.errorMessage-->
      <!--          }}</strong>-->
      <!--      </div>-->
      <a-config-provider
          :theme="{
          token: {
            colorPrimary: '#16a34a',
          },
        }"
      >
        <div class="block overflow-auto rounded-xl">
          <ClientOnly>
            <a-table
                :loading="announcementsStore.getStatus !== 'success'"
                bordered
                :columns="columns as any"
                :data-source="announcementsStore.getAnnouncements?.length>0 ? announcementsStore.getAnnouncements : []"
                :pagination="false"
                size="middle"
                :scroll="{ x: true }"
                :locale="{ emptyText: t('there_is_no_information') }"
            >
              <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'id'">
                  <div class="text-[#262626]">
                    {{ record.id }}
                  </div>
                </template>
                <template v-if="column.dataIndex === 'name'">
                  <div class="text-[#262626]">
                    {{ record.name }}
                  </div>
                </template>
                <template v-if="column.dataIndex === 'photo'">
                <span
                    class="text-blue-500 cursor-pointer"
                    @click="handlePreview(record.id, record)"
                >{{ record.thumbnailName }}</span
                >
                </template>
                <template v-if="column.dataIndex === 'publishedAt'">
                  <div class="text-[#746969]">
                    {{ record.publishedAt && dateModal(record.publishedAt) }}
                  </div>
                </template>
                <template v-if="column.dataIndex === 'status'">
              <span :class="resolveStatusClass(record.status)">
                {{ record.status.status }}
              </span>
                </template>
                <template v-if="column.dataIndex === 'actions'">
                  <a-dropdown :trigger="['click']">
                    <a class="ant-dropdown-link !text-black" @click.prevent>
                      <MoreOutlined/>
                    </a>
                    <template #overlay>
                      <a-menu>
                        <a-menu-item key="0" @click="setQuery(record.id)">
                          <nuxt-link
                              tag="div"
                              :to="{ path: `/kabinet/elanlarim/elan-etraflisi/${record.id}`, query: { id: record.id } }"
                              class="flex flex-row items-center"
                          >
                            <span class="flex justify-center items-center mr-3">
                            <EyeOutlined theme="filled"/>
                          </span>
                            <p class="p-0 m-0">{{ t("see_more") }}</p>
                          </nuxt-link>
                        </a-menu-item>
                      </a-menu>
                    </template>
                  </a-dropdown>
                </template>
              </template>
            </a-table>
          </ClientOnly>
          <div class="flex justify-end items-center my-3">
            <ClientOnly>
              <a-pagination
                  v-model:current="pagination.current"
                  :total="totalElements"
                  :pageSize="pagination.pageSize"
                  show-less-items
                  :showSizeChanger="false"
                  @change="handlePageChange"
              />
            </ClientOnly>
          </div>
        </div>
      </a-config-provider>
    </div>
    <LazyPreviewImage
        :previewImage="previewImage"
        :previewImageName="previewImageName"
        v-if="previewVisible"
        @cancel="closePreviewImageModal"
    />

    <a-modal
        v-model="visibleDeactiveConfirm"
        width="450px"
        :closable="false"
        :maskClosable="false"
        :footer="null"
        centered
    >
      <div class="flex flex-col">
        <div class="flex justify-center items-center">
          <span
              class="h-16 rounded-full flex justify-center items-center text-yellow-500"
          >
            <a-icon class="text-xl" type="question-circle"/>
          </span>
        </div>
        <div class="flex flex-col justify-center items-center text-center">
          <p class="p-0 m-0 text-neutral-800 font-medium text-xl mb-1">
            {{ t("are_you_sure_you_want_to_disable_the_ad") }}
          </p>
          <span class="font-normal text-sm text-gray-400 m-0 p-0 mb-4">
            {{ t("your_ad_will_not_appear_on_the_web_page") }}
          </span>
        </div>
        <div class="flex flex-row justify-center items-center">
          <button
              @click="visibleDeactiveConfirm = false"
              class="text-sm border border-gray-300 font-medium py-2 px-6 rounded-md mr-2"
          >
            {{ t("no") }}
          </button>
          <button
              @click="submitDeactive"
              class="text-sm font-medium text-white bg-emerald-600 py-2 px-6 rounded-md"
          >
            {{ t("yes") }}
          </button>
        </div>
      </div>
    </a-modal>
    <a-modal
        v-model="visibleActiveConfirm"
        width="450px"
        :closable="false"
        :maskClosable="false"
        :footer="null"
        centered
    >
      <div class="flex flex-col">
        <div class="flex justify-center items-center">
          <span
              class="h-16 rounded-full flex justify-center items-center text-yellow-500"
          >
            <a-icon class="text-xl" type="question-circle"/>
          </span>
        </div>
        <div class="flex flex-col justify-center items-center text-center">
          <p class="p-0 m-0 text-neutral-800 font-medium text-xl mb-1">
            {{ t("are_you_sure_you_want_to_enable_the_ad") }}
          </p>
        </div>
        <div class="flex flex-row justify-center items-center">
          <button
              @click="visibleActiveConfirm = false"
              class="text-sm border border-gray-300 font-medium py-2 px-6 rounded-md mr-2"
          >
            {{ t("no") }}
          </button>
          <button
              @click="submitActive"
              class="text-sm font-medium text-white bg-emerald-600 py-2 px-6 rounded-md"
          >
            {{ t("yes") }}
          </button>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import type {Announcements} from "~/utils/types/announcement";
import moment from "moment";
import Columns from "~/utils/Table/announcement";

const baseURL = useRuntimeConfig().public.baseURL;
const {t} = useI18n()
const announcementsStore = useAnnouncementsStore()
const pagination = reactive({
  current: 1,
  pageSize: 15,
});
const columns =
    Columns.getColumnDetail(
        t("ad"),
        t("ad_name"),
        t("image"),
        t("publication_date"),
        t("status_in_table")
    ) || [];
const previewImage = ref()
const previewImageName = ref<string>()
const previewVisible = ref(false)
const selectedId = ref()
const visibleDeactiveConfirm = ref(false)
const types = ref<null | any | undefined>()
const visibleActiveConfirm = ref(false)
announcementsStore.resetAnnouncements()
const fetchAnnouncements = function () {
  announcementsStore.fetchAnnouncements({
    page: pagination.current - 1,
    size: pagination.pageSize,
  })
}
const handlePageChange = function (page: number) {
  pagination.current = Number(page);
  fetchAnnouncements()
};
const totalElements = computed(() => announcementsStore.getTotalElements);
const closePreviewImageModal = () => {
  previewVisible.value = false;
}
const handlePreview = function (id: number, record: Announcements | any) {
  previewImage.value = `${baseURL}/${record.thumbnailPath}`;
  previewImageName.value = record.thumbnailName;
  previewVisible.value = true;
}

const setQuery = function (id: number) {
  selectedId.value = id;
  announcementsStore.fetchAnnouncementDetail(id)
}
const resolveStatusClass = function (status: any) {
  if (!status || typeof status !== 'object' || !status.label) {
    console.warn("resolveStatusClass received an invalid status:", status);
    return "text-gray-400";
  }
  if (status.label === "PUBLISHED") {
    return "text-green-600";
  } else if (status.label === "REJECTED") {
    return "text-red-600";
  } else if (status.label === "REGISTERED") {
    return "text-yellow-600";
  } else if (status.label === "EXPIRED") {
    return "text-gray-400";
  } else if (status.label === "UNPUBLISHED") {
    return "text-orange-400";
  } else {
    console.warn("resolveStatusClass received an unknow status label:", status.label);
    return "text-gray-400"; //default case
  }
};
const dateModal = function (value: Date | string) {
  let dat = new Date(value).toString();
  return moment(dat).format("DD/MM/yyyy HH:mm:ss");
}

fetchAnnouncements()
</script>
<style>

</style>
