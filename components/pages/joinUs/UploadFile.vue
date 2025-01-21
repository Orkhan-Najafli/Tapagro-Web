<template>
  <div class="flex flex-col justify-start items-start w-full">
    <div class="flex flex-col w-full h-auto">
      <label :for="String(props.ID)" class="">
        <input
          class="opacity-0 h-0"
          type="file"
          :id="String(props.ID)"
          name="avatar"
          accept="image/png, image/jpeg, image/jpg, application/pdf"
          @change="handleUpload"
        />
        <div
          class="flex flex-row justify-center items-center py-1.5 bg-white rounded-sm border border-gray-300 w-full"
        >
          <upload_icon class="mr-2" /> <span> {{ $t("please_add") }}</span>
        </div>
      </label>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  labelText: String,
  explanation: String,
  ID: Number,
});
const emit = defineEmits(["handleUpload"]);
const allowFileTypes = reactive([
  "image/jpeg",
  "image/png",
  "image/jpg",
  "application/pdf",
]);
const fileName = ref();
// const fileData = reactive({});
const getBase64 = function (img: any, callback: any) {
  const reader = new FileReader();
  reader.onload = function (e: Event | any) {
    var image = new Image();
    image.src = e.target.result;
    image.onload = function () {
      return true;
    };
  };
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
//   methods
const handleUpload = function (event: Event | any) {
  let file = event.target.files[0];
  if (file && allowFileTypes.includes(file.type)) {
    fileName.value = file.name;
    const obj = {
      file,
      uid: Date.now(),
      name: file && file.name,
      data: "",
      id: null,
    };
    getBase64(file, (imageUrl: any) => {
      obj.data = imageUrl;
      emit("handleUpload", { ...obj });
    });
  } else {
    // this.$message.error("Fayl tipi düzgün deyil");
  }

  return false;
};
</script>
