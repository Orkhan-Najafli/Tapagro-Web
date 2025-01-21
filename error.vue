<template>
  <NuxtLayout>
    <div class="prose min-h-screen w-full min-w-full">
      <template v-if="error.statusCode === 404">
        <div class="flex flex-col justify-center mb-10 w-full min-w-full">
          <div class="flex justify-center">
            <img src="@/assets/img/404.gif" alt="404" class="" />
          </div>
          <div class="ant-result-title block text-center font-bold text-5xl">
            404
          </div>
          <div class="ant-result-subtitle block text-center my-2">
            Axtarışa uyğun səhifə tapılmadı
          </div>
          <div class="ant-result-extra block text-center">
            <button
              class="items-center h-auto font-semibold text-sm bg-green-600 rounded-md p-0 px-6 py-2 text-white"
              @click="$router.push('/')"
            >
              <span> Əsas səhifə</span>
            </button>
          </div>
        </div>
      </template>
      <template v-else>
        <h1>Xəta</h1>
        <p>
          <strong>{{ error.message }}</strong>
        </p>
        <p>Nə isə səhv getdi.</p>
        <div class="ant-result-extra block text-center">
          <button
            class="items-center h-auto font-semibold text-sm bg-green-600 rounded-md p-0 px-6 py-2 text-white"
            @click="$router.push('/')"
          >
            <span> Əsas səhifə</span>
          </button>
        </div>
      </template>
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
const error = useError();

const handleError = () => {
  clearError({
    redirect: "/",
  });
};
</script>
