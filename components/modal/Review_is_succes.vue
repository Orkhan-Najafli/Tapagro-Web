<template>
  <a-modal
    :open="true"
    centered
    title=""
    :footer="null"
    width="426px"
    :dialog-style="{ top: '20px' }"
    @cancel="handleCancel"
  >
    <div class="w-full h-auto flex flex-col justify-center items-start">
      <div class="flex justify-center items-center w-full h-auto min-w-full">
        <add_review_icon v-if="data.section == 'addreview'" />
        <remove_review_icon_in_succesModal
          v-if="data.section == 'deletereview'"
        />
      </div>
      <h3
        v-if="data.title"
        class="text-[#4B5563] w-full h-auto text-xl font-semibold text-center m-0 p-0 mt-4 mb-2"
      >
        {{ props.data.title }}
      </h3>
      <div class="inline-block w-full text-center">
        <nuxt-link
          v-if="data.link"
          tag="a"
          class="underline text-[#4B5563] font-normal text-sm inline-block"
          to="/kabinet/mehsul-qiymetlendirilmesi"
          >{{ props.data.link }}</nuxt-link
        >
        <p
          v-if="data.description"
          class="text-[#6B7280] text-sm font-normal m-0 p-0 inline-block"
        >
          {{ props.data.description }}
        </p>
      </div>
    </div>
    <div
      v-if="props.data.section == 'deletereview'"
      class="flex flex-row justify-center items-center mt-6"
    >
      <button
        @click="handleCancel"
        class="w-[156px] max-w-[156px] text-[15px] font-semibold text-[#6B7280] py-2 px-3 border border-[#E5E7EB] rounded-md mr-3"
      >
        {{ t("close_modal") }}
      </button>
      <button
        @click="handleOk"
        class="w-[156px] max-w-[156px] text-[15px] font-semibold text-[#FFFFFF] py-2 px-3 border border-[#EF4444] rounded-md bg-[#EF4444]"
      >
        {{ t("delete") }}
      </button>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
const { t } = useI18n();
const emit = defineEmits(["handleCancel", "deleteReviewCompleted"]);
const props = defineProps({
  data: {
    type: Object,
    default: {
      title: "Məhsulu qiymətləndirdiyiniz üçün təşəkkür edirik",
      link: "Məhsul qiymətləndirilməsi",
      description:
        "bölümündə bütün məhsul qiymətləndirmələrinizi izləyə bilərsiniz",
      section: "addreview",
    },
  },
});
// import add_review_icon from "../../inc/svg/add_review_icon.vue";
// import remove_review_icon_in_succesModal from "../../inc/svg/remove_review_icon_in_succesModal.vue";
// export default {
//   props: {
//     data: {
//       type: Object,
//       default: {
//         title: "Məhsulu qiymətləndirdiyiniz üçün təşəkkür edirik",
//         link: "Məhsul qiymətləndirilməsi",
//         description:
//           "bölümündə bütün məhsul qiymətləndirmələrinizi izləyə bilərsiniz",
//         section: "addreview",
//       },
//     },
//   },
//   components: {
//     add_review_icon,
//     remove_review_icon_in_succesModal,
//   },
//   methods: {
const handleCancel = function () {
  emit("handleCancel");
};
const handleOk = function () {
  emit("deleteReviewCompleted");
};
//   },
// };
</script>
