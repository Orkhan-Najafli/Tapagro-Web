<template>
  <a-modal
    :open="visible"
    width="1100px"
    :footer="null"
    centered
    @cancel="handleCancel"
  >
    <div class="h-8"></div>
    <div class="overflow-auto max-h-[898px] scroll-design">
      <FAQ />
    </div>
  </a-modal>
</template>
<script setup lang="ts">
const emit = defineEmits(["handleCancel"]);
// import FAQ from "@/components/common/FAQ.vue";
const visible = ref(true);
// export default {
//   methods: {
const handleCancel = function () {
  emit("handleCancel", false);
};
//   },
// };
</script>
<style scoped>
div.scroll-design::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

div.scroll-design::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

div.scroll-design::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: none;
}
</style>
