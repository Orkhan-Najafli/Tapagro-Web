<template>
  <ul class="inline-block w-auto h-auto p-0 m-0 mt-2">
    <li
      class="flex flex-row justify-start items-center m-0"
      v-for="(item, index) in props.catalogFileList"
      :key="item.uid"
    >
      <File_icon
        v-if="
          item.name.includes('.png') ||
          item.name.includes('.jpeg') ||
          item.name.includes('.jpg')
        "
      />
      <File_as_pdf_icon v-else />
      <span class="text-sm font-normal text-[#1890FF] mx-2"
        >{{ item.name }}
      </span>
      <span @click="removeFile(index, item)">
        <remove_image_icon class="cursor-pointer" />
      </span>
    </li>
  </ul>
</template>
<script setup lang="ts">
const props = defineProps({
  catalogFileList: {
    type: Array<any>,
    default: () => [{}],
  },
});
const emit = defineEmits(["removeFile"]);
const removeFile = function (index: number, document: File | any) {
  emit("removeFile", { index, document });
};
</script>
