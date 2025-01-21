<template>
  <a-modal
      @cancel="closeStatusDetail"
      @ok="closeStatusDetail"
      :open="true"
      :title="t('history')"
      :cancel-text="t('close_modal')"
      width="500px"
  >
    <a-collapse
        expandIconPosition="right"
        default-active-key="0"
        :bordered="true"
        class="mb-4"
    >
      <a-collapse-panel v-if="props.statusData.registered.length > 0" class="" key="0">
        <template #header>
                <span class="text-yellow-400 w-full">{{
                    t("it_is_under_inspection")
                  }}</span>
        </template>
        <div class="max-h-52 overflow-y-auto">
          <div
              v-for="(item, index) in props.statusData.registered"
              :key="index"
              class="flex flex-row justify-between items-center w-full"
          >
                  <span class="text-gray-900 font-medium">{{
                      item.status.status
                    }}</span>
            <span class="text-gray-700 font-normal text-xs">{{
                item.createdAt && dateModel(item.createdAt)
              }}</span>
          </div>
        </div>
      </a-collapse-panel>
      <a-collapse-panel v-if="props.statusData.expired.length > 0" key="1">
        <template #header>
          <span class="text-gray-400 w-full">{{ t("expired") }}</span>
        </template>
        <div class="max-h-52 overflow-y-auto">
          <div
              v-for="(item, index) in props.statusData.expired"
              :key="index"
              class="flex flex-row justify-between items-center w-full"
          >
                  <span class="text-gray-900 font-medium">{{
                      item.status.status
                    }}</span>
            <span class="text-gray-700 font-normal text-xs">{{
                item.createdAt && dateModel(item.createdAt)
              }}</span>
          </div>
        </div>
      </a-collapse-panel>
      <a-collapse-panel v-if="props.statusData.published.length > 0" key="2">
        <template #header>
          <span class="text-green-400 w-full">{{ t("published") }}</span>
        </template>
        <div class="max-h-52 overflow-y-auto">
          <div
              v-for="(item, index) in props.statusData.published"
              :key="index"
              class="flex flex-row justify-between items-center w-full"
          >
                  <span class="text-gray-900 font-medium">{{
                      item.status.status
                    }}</span>
            <span class="text-gray-700 font-normal text-xs">{{
                item.createdAt && dateModel(item.createdAt)
              }}</span>
          </div>
        </div>
      </a-collapse-panel>
      <a-collapse-panel v-if="props.statusData.unPublished.length > 0" key="3">
        <template #header>
                <span class="text-yellow-600 w-full">{{
                    t("withdrawn")
                  }}</span>
        </template>
        <div class="max-h-52 overflow-y-auto">
          <div
              v-for="(item, index) in props.statusData.unPublished"
              :key="index"
              class="flex flex-row justify-between items-center w-full"
          >
                  <span class="text-gray-900 font-medium">{{
                      item.status.status
                    }}</span>
            <span class="text-gray-700 font-normal text-xs">{{
                item.createdAt && dateModel(item.createdAt)
              }}</span>
          </div>
        </div>
      </a-collapse-panel>
      <a-collapse-panel v-if="props.statusData.rejected.length > 0" key="4">
        <template #header>
          <span class="text-red-600 w-full">{{ t("refused") }}</span>
        </template>
        <a-collapse
            v-for="(item, index) in props.statusData.rejected"
            :key="index"
            expandIconPosition="right"
            default-active-key="0"
            :bordered="true"
            class="m-0 p-0 mb-2"
        >
          <a-collapse-panel :key="index">
            <template #header>
              <div
                  class="flex flex-row justify-between items-center w-full min-w-full"
              >
                      <span class="text-gray-900 font-medium">
                        {{ item.status.status }}</span
                      >
                <span class="text-gray-700 font-normal text-xs">
                        {{ item.createdAt && dateModel(item.createdAt) }}</span
                >
              </div>
            </template>
            <div class="flex flex-col items-start justify-start">
                    <span class="font-normal text-xs text-gray-700"
                    >{{ t("disclaimer_text") }} :</span
                    >
              <span class="font-normal text-sm text-gray-900 break-all">
                      {{ item.note }}
                    </span>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </a-collapse-panel>
    </a-collapse>
    <template slot="footer">
      <div class="flex flex-row justify-between w-full min-w-full h-auto">
        <a-button @click="closeStatusDetail" type="default">{{
            t("close_modal")
          }}
        </a-button>
      </div>
    </template>
  </a-modal>
</template>
<script setup lang="ts">
import moment from "moment/moment";

const {t} = useI18n()
const props = defineProps({
  statusData: {
    type: Object,
    // default() {
    //   return {}
    // }
  }
})
const emit = defineEmits(["closeStatusDetail"])
const closeStatusDetail = function () {
  emit("closeStatusDetail")
}

const dateModel = function (value: Date | string) {
  let dat = new Date(value).toString();
  return moment(dat).format("DD/MM/yyyy HH:mm:ss");
}
</script>