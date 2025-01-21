<template>
  <div class="m-0 p-0 flex flex-col justify-start items-start w-full min-w-full">
    <div class="m-0 p-0 flex flex-col w-full min-w-full h-auto">
      <div class="flex flex-col md:flex-row py-2 w-full">
        <div class="flex flex-row">
          <div
            class="w-8 h-8 p-0.5 flex flex-shrink-0 justify-center items-center rounded-full text-center bg-[#F0FDF4] mr-5">
            <img class="w-[18px] h-[18px]" :src="`${baseURL}/${props.review.store.logoPath}`"
              @error="setDefaultStoreImage" />
          </div>
          <div class="inline-flex flex-col w-[272px] max-w-[272px] md:mr-3">
            <h5 class="m-0 p-0 text-[#4B5563] capitalize text-sm font-medium leading-5 mb-2">
              {{ props.review.reviewer.split(" ").join(" ").toLowerCase() }}
            </h5>
            <span class="text-xs font-medium leading-5 text-[#9CA3AF]">{{ Number(new
              Date(props.review.publishedAt).getDate()) }}
              {{ date[Number(new Date(props.review.publishedAt).getMonth())] }},
              {{
                Number(new Date(props.review.publishedAt).getFullYear())
              }}</span>
          </div>
        </div>
        <div class="inline-flex flex-col w-full">
          <span class="whitespace-nowrap w-auto m-0 mt-2.5 md:-mt-1">
            <a-rate disabled class="m-0 p-0" v-model="props.review.rating" allow-half />
          </span>
          <p class="m-0 p-0 my-2 text-[#4B5563] text-sm font-normal leading-5">
            {{ props.review.comment }}
          </p>
          <section>
            <div class="inline-flex justify-center items-center group relative rounded-sm border border-[#d9d9d9]"
              v-for="(photo, index) in props.review.photos" :key="index">
              <img :src="`${baseURL}/${photo}`" alt="image.png"
                class="w-[86px] max-w-[86px] h-[86px] max-h-[86px] m-2" />
              <EyeOutlined @click="handlePreview(photo)"
                class="hidden group-hover:inline-block transition-all duration-100 absolute text-lg text-white cursor-pointer" />
            </div>

            <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </section>

          <ul v-if="props.review.reply" class="flex flex-col w-full h-auto m-0 p-0">
            <li class="m-0 p-0 flex justify-start items-start mb-3">
              <button @click="showReply" class="inline-flex m-0 p-0 text-xs font-semibold text-[#111827]">
                {{ $t("see_the_product_owners_answer") }}
              </button>
            </li>
            <li v-if="visibleReply"
              class="m-0 p-0 flex flex-col justify-start items-start w-full h-auto bg-[#F9FAFB] py-[4px] px-4">
              <div
                class="flex flex-col md:flex-row justify-start items-start md:justify-between md:items-center w-full h-auto mb-2.5">
                <div class="flex flex-row justify-start items-center">
                  <div
                    class="w-6 h-6 p-0.5 flex flex-shrink-0 justify-center items-center rounded-full text-center bg-[#F0FDF4] mr-3">
                    <img class="w-[18px] h-[18px]" :src="`${baseURL}/${props.review.store.logoPath}`"
                      @error="setDefaultStoreImage" />
                  </div>
                  <span class="text-[13px] font-medium text-[#374151]">{{
                    props.review.store.name
                  }}</span>
                </div>
                <span v-if="props.review.reply.repliedAt" class="text-xs font-medium leading-5 text-[#9CA3AF]">{{
                  props.review.reply &&
                  Number(new Date(props.review.reply.repliedAt).getDate())
                }}
                  {{
                    props.review.reply &&
                    date[
                    Number(new Date(props.review.reply.repliedAt).getMonth())
                    ]
                  }},
                  {{
                    props.review.reply &&
                    Number(new Date(props.review.reply.repliedAt).getFullYear())
                  }}</span>
              </div>
              <p class="flex w-full h-auto justify-start items-center text-[#4B5563] text-sm p-0 m-0">
                {{ props.review.reply && props.review.reply.reply }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <hr class="w-full min-w-full h-[1px] bg-[#CBD5E1] my-3" />
  </div>
</template>
<script setup lang="ts">
import type { ProductReview } from "~/utils/types/reviews";
const baseURL = useRuntimeConfig().public.baseURL;
const { t } = useI18n();
const previewVisible = ref(false);
const visibleReply = ref(false);
const previewImage = ref("");
const previewTitle = ref("");
const props = defineProps({
  review: {
    type: Object as PropType<ProductReview>,
    default: {},
  },
});

const date = t("months", { returnObjects: true });

const handleCancel = function () {
  previewVisible.value = false;
};
const showReply = function () {
  visibleReply.value = !visibleReply.value;
};
const setDefaultStoreImage = async function (event: Event | any) {
  event.target.src = await require(`@/assets/img/store_logo.svg`);
  event.target.className = "p-.5";
};

const handlePreview = async (file: string) => {
  previewImage.value = `${baseURL}${file}`;
  previewVisible.value = true;
  previewTitle.value = "Şəkil";
};
</script>
<style scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
