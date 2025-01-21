
<template>
  <a-modal
      aria-hidden="true"
      :centered="true"
      :title="previewImageName || t('product_image')"
      :open="true"
      @cancel="closePreviewImageModal"
  >
    <img
        style="width: 500px; height: 400px"
        :alt="t('product_image')"
        :src="props.previewImage"
    />
    <template #footer v-if="props.previewImage">
      <a-button @click="closePreviewImageModal">{{
          t("close_modal")
        }}
      </a-button>
      <a-button type="primary">
        <a
            @click="downloadImage(props.previewImage,previewImageName)"
            class="flex flex-row justify-between items-baseline"
        >
          <a-icon type="download"/>
          <span class="ml-3">{{ t("download") }}</span>
        </a>
      </a-button>
    </template>
  </a-modal>
</template>
<script setup lang="ts">
const {t} = useI18n()
const props = defineProps({
  previewImage: {
    type: String,
    default:""
  },
  previewImageName:{
    type:String,
    default: ''
  }
})
const emit = defineEmits(["cancel"])
const downloadImage = async function (imageSrc: string, nameOfDownload: string = "my-image.png") {
  const response = await fetch(imageSrc);
  const blobImage = await response.blob();
  const href = URL.createObjectURL(blobImage);
  const anchorElement = document.createElement("a");
  anchorElement.href = href;
  anchorElement.download = nameOfDownload;
  document.body.appendChild(anchorElement);
  anchorElement.click();
  document.body.removeChild(anchorElement);
  window.URL.revokeObjectURL(href);
}
const closePreviewImageModal = () => {
  emit("cancel");
}

</script>