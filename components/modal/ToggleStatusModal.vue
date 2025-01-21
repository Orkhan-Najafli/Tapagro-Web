<template>
  <a-modal
      :open="true"
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
                <QuestionCircleOutlined class="text-xl"/>
              </span>
      </div>
      <div class="flex flex-col justify-center items-center text-center">
        <p v-if="props.textData.pharagraph_0" class="p-0 m-0 text-neutral-800 font-medium text-xl mb-1">
          {{ props.textData.pharagraph_0 }}
        </p>
        <span v-if="props.textData.pharagraph_1" class="font-normal text-sm text-gray-400 m-0 p-0 mb-4">
                {{ props.textData.pharagraph_1 }}
              </span>
      </div>
      <div class="flex flex-row justify-center items-center">
        <button
            @click="cancel"
            class="text-sm border border-gray-300 font-medium py-2 px-6 rounded-md mr-2"
        >
          {{ t("no") }}
        </button>
        <button
            @click="submit"
            class="text-sm font-medium text-white bg-emerald-600 py-2 px-6 rounded-md"
        >
          {{ t("yes") }}
        </button>
      </div>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
const {t} = useI18n()
const props = defineProps({
  textData:{
    type: Object,
    default:{}
  }
})
const emits = defineEmits(['cancel', 'ok'])
const submit = function () {
  emits('ok')
}
const cancel = function () {
  emits('cancel')
}

</script>