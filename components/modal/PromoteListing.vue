<template>
  <a-modal
      width="450px"
   :title="null"
      :footer="null"
      centered
      @cancel="handleClose"
      :open="true"
  >
    <div class="flex flex-col">
<!--      <div class="flex justify-end items-center cursor-pointer">-->
<!--        <svg-->
<!--            @click="handleClose"-->
<!--            xmlns="http://www.w3.org/2000/svg"-->
<!--            width="16"-->
<!--            height="16"-->
<!--            viewBox="0 0 16 16"-->
<!--            fill="none"-->
<!--        >-->
<!--          <path-->
<!--              d="M8.80901 8L12.9106 3.11094C12.9793 3.02969 12.9215 2.90625 12.8153 2.90625H11.5684C11.4949 2.90625 11.4246 2.93906 11.3762 2.99531L7.99339 7.02813L4.61057 2.99531C4.5637 2.93906 4.49339 2.90625 4.41839 2.90625H3.17151C3.06526 2.90625 3.00745 3.02969 3.0762 3.11094L7.17776 8L3.0762 12.8891C3.0608 12.9072 3.05092 12.9293 3.04773 12.9529C3.04454 12.9764 3.04818 13.0004 3.05822 13.022C3.06826 13.0435 3.08426 13.0617 3.10435 13.0745C3.12443 13.0872 3.14774 13.0939 3.17151 13.0938H4.41839C4.49182 13.0938 4.56214 13.0609 4.61057 13.0047L7.99339 8.97188L11.3762 13.0047C11.4231 13.0609 11.4934 13.0938 11.5684 13.0938H12.8153C12.9215 13.0938 12.9793 12.9703 12.9106 12.8891L8.80901 8Z"-->
<!--              fill="#9CA3AF"-->
<!--          />-->
<!--        </svg>-->
<!--      </div>-->
      <div class="flex justify-center items-center">
        <span
            class="h-16 rounded-full flex justify-center items-center text-yellow-500"
        >
          <detail_yellow_icon/>
        </span>
      </div>
      <div class="flex flex-col justify-center items-center text-center">
        <p class="p-0 m-0 text-[#4B5563] font-semibold text-xl mb-1">
          {{ props.data.title }}
        </p>
        <span class="font-normal text-sm text-[#9CA3AF] m-0 p-0 mb-4">
          {{ props.data.description }}
        </span>
      </div>
      <div class="flex flex-row justify-center items-center">
        <button
            @click="handleClose"
            class="text-sm border border-gray-300 font-medium py-2 px-6 rounded-md mr-2 w-36"
        >
          {{ t("no") }}
        </button>
        <button
            @click="onSucces"
            class="text-sm font-medium text-white bg-emerald-600 py-2 px-6 rounded-md w-36"
        >
          {{ t("yes") }}
        </button>
      </div>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
const {t} = useI18n()
const emit = defineEmits(["close", "ok"])
const props = defineProps({
  data: {
    type: Object,
    default: {
      title: "",
      description: "",
    }
  },
})
const handleClose = function () {
  emit("close", {type: props.data.type});
}
const onSucces = function () {
  emit("ok", {type: props.data.type});
}
</script>