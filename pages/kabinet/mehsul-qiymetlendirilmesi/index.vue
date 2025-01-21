<template>
  <div class="mt-9 xl:mt-0 max-w-full xl:max-w-[768px]">
    <div class="flex flex-col w-full min-w-full">
      <div class="block text-left mb-3.5">
        <h3 class="text-emerald-600 font-semibold text-xl">
          {{ t("review_link") }}
        </h3>
      </div>
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
              :loading="reviewsStore.getStatus !== 'success'"
              bordered
              :columns="columns as any"
              :data-source="reviewsStore.getReviews?.length ? [...reviewsStore.getReviews] : []"
              :pagination="false"
              size="middle"
              :scroll="{ x: true }"
              :locale="{ emptyText: t('there_is_no_information') }"
            >
              <template #bodyCell="{ column, text, record }">
                <template v-if="column.dataIndex === 'rating'">
                  <div class="flex items-center">
                    <template v-for="i in 5" :key="i">
                      <a-tooltip placement="top">
                        <template #title>
                          <span v-if="i == 1">{{ t("desc.0") }}</span>
                          <span v-if="i == 2">{{ t("desc.1") }}</span>
                          <span v-if="i == 3">{{ t("desc.2") }}</span>
                          <span v-if="i == 4">{{ t("desc.3") }}</span>
                          <span v-if="i == 5">{{ t("desc.4") }}</span>
                        </template>
                        <rate
                          :class="
                            i <= text ? 'text-yellow-300' : 'text-gray-200'
                          "
                        />
                      </a-tooltip>
                    </template>
                  </div>
                </template>

                <template v-if="column.dataIndex === 'publishedAt'">
                  <div class="text-[#262626]">
                    {{ text && dateModal(text) }}
                  </div>
                </template>
                <template v-if="column.dataIndex === 'status'">
                  <span :class="resolveStatusClass(text)">
                    {{ text.status }}
                  </span>
                </template>

                <template v-if="column.key === 'actions'">
                  <div class="flex flex-row justify-center items-center">
                    <button
                      @click="loadDetail(record, 'edit')"
                      class="cursor-pointer mx-2"
                      v-if="
                        record.status.label == 'CREATED' ||
                        record.status.label == 'PUBLISHED'
                      "
                    >
                      <edit_icon />
                    </button>
                    <button
                      @click="loadDetail(record, 'detail')"
                      v-if="
                        record.status.label == 'IN_INSPECTION' ||
                        record.status.label == 'REJECTED'
                      "
                    >
                      <detail_icon class="cursor-pointer mx-2" />
                    </button>
                    <button
                      class="mx-2"
                      v-if="record.status.label != 'IN_INSPECTION'"
                      @click="deleteReview(record)"
                    >
                      <delete_icon />
                    </button>
                  </div>
                </template>
              </template>
            </a-table>
          </ClientOnly>
        </div>
        <div class="flex justify-end items-center my-3">
          <ClientOnly>
            <a-pagination
              v-model:current="pagination.current"
              :total="totalElements"
              :pageSize="pagination.pageSize"
              @change="handlePageChange"
              :showSizeChanger="false"
            />
          </ClientOnly>
        </div>
      </a-config-provider>
      <Valuation
        v-if="isDetail"
        :product="valuationDetail"
        @close="closeDetail"
        @ok="onSuccessOperation"
        :action="action"
      />
      <Review_is_succes
        :data="isSuccesData"
        @handleCancel="closeSuccesMessageModal"
        @deleteReviewCompleted="deleteReviewCompleted"
        v-if="reviewIsSucces"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const { t } = useI18n();
const current = ref(1);
import moment from "moment";
import Columns from "~/utils/Table/valuation";
import type { Review, ReviewDetail } from "~/utils/types/reviews";
const columns =
  Columns.getColumnDetail(
    t("product_name"),
    t("rating_title"),
    t("comment"),
    t("publication_date"),
    t("status_in_table")
  ) || [];
const loading = ref(true);
const reviewIsSucces = ref(false);
const desc = ref<any>(t("desc"));
const id = ref();
const isDetail = ref(false);
let valuationDetail = reactive<ReviewDetail|any>({});
let action = reactive({action:'detail'});

const pagination = reactive({
  current: 1,
  pageSize: 12,
});
const baseURL = useRuntimeConfig().public.baseURL;
const reviewsStore = useReviewsStore();

const totalElements = computed(() => reviewsStore.getTotalElements);
// const totalPages = computed(() => reviewsStore.getTotalPages);

const handlePageChange = (page: number) => {
  pagination.current = page;
  fetchReviews();
};
const fetchReviews = () => {
  reviewsStore.fetchReviews({
    page: pagination.current - 1,
    size: pagination.pageSize,
  });
};
const isSuccesData = reactive({
  title: t("are_you_sure_you_want_to_remove_your_rating"),
  link: null,
  description: null,
  section: "deletereview",
});

const loadDetail = async function (record: Review|any, detail: string) {
  try {
    action = { action: detail };
    await reviewsStore.fetchDetailReview(record.id);
    if (reviewsStore.getReviewDetailStatus === 'success') {
      reviewsStore.setReviewPhotos()
      valuationDetail = reviewsStore.getReviewDetail || {};
      isDetail.value = true;
    }
  } catch (error) {
    console.error("Error while loading review details:", error);
  }
};

const onSuccessOperation = function (val: any) {
  if (val) {
    isDetail.value = false;
    reviewsStore.resetReviews()
    reviewsStore.fetchReviews({});
    // this.$message.success(t("operation_was_successful"));
  }
};
const closeDetail = function () {
  isDetail.value = false;
};
const closeSuccesMessageModal = function () {
  reviewIsSucces.value = false;
};
const deleteReviewCompleted = async function () {
  try {
    await reviewsStore.fetchDeleteReview(id.value);
    if (reviewsStore.getDeletedReviewedStatus === "success") {
      await reviewsStore.fetchReviews({
        page: pagination.current - 1,
        size: pagination.pageSize,
      });
    }
    reviewIsSucces.value = false;
  } catch (error) {
    console.error("Error while deleting the review:", error);
  }
};

const deleteReview = function (record: Review | any) {
  id.value = record.id;
  reviewIsSucces.value = true;
};

const setQuery = function (id: number) {
  useRouter().push({ path: useRoute().fullPath, query: { id: id } });
};
const resolveStatusClass = function (record: any) {
  if (record.label == "CREATED") {
    return "text-[#3B82F6]";
  } else if (record.label == "IN_INSPECTION") {
    return "text-[#FACC15]";
  } else if (record.label == "REJECTED") {
    return "text-[#DC2626]";
  } else if (record.label == "PUBLISHED") {
    return "text-[#389E0D]";
  }
};
const dateModal = function (value: Date | any) {
  let dat = new Date(value).toString();
  return moment(dat).format("DD/MM/yyyy HH:mm:ss");
};

fetchReviews();
</script>
