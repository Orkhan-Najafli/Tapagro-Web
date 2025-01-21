<template>
  <div class="p-0 flex flex-row justify-start items-center mb-2">
    <i class="text-[#F5222D] text-base font-normal leading-snug mr-1 pt-1.5"
      >*</i
    >
    <p class="p-0 m-0" v-if="props.explanation != 'not'">
      {{ props.labelText }}
    </p>
    <p class="p-0 m-0" v-else v-html="props.labelText"></p>
    <a-tooltip v-if="props.explanation != 'not'" placement="top">
      <template slot="title">
        <span>
          {{ props.explanation }}
        </span>
      </template>
      <div class="flex flex-row items-center cursor-pointer ml-1">
        <Question_in_circle_icon />
      </div>
    </a-tooltip>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  labelText: String,
  explanation: String,
});
</script>
