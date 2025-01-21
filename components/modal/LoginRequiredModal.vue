<template>
  <a-modal
    :open="useAuthenticator().getRequiredLoginVisible"
    width="450px"
    :footer="null"
    centered
    @cancel="useAuthenticator().setRequiredLoginVisible(false)"
  >
    <div class="flex justify-center items-center w-full">
      <div
        class="flex justify-center items-center w-full min-w-full h-auto text-yellow-500"
      >
        <a-icon type="info-circle" class="text-3xl" />
      </div>
    </div>
    <div class="flex flex-col justify-center items-center m-0 p-0 my-6">
      <p class="p-0 m-0 text-gray-600 font-semibold text-xl text-center mb-1">
        {{ $t("login_modal_title") }}
      </p>
      <p class="p-0 m-0 text-gray-400 font-normal text-sm text-center">
        {{ $t("login_modal_information") }}
      </p>
    </div>
    <div class="flex flex-col md:flex-row justify-center items-center">
      <button
        class="flex flex-row justify-center items-center cursor-pointer px-5 py-3 rounded-xl border border-lime-700"
        @click="useAuthenticator().fetchGenerateUrl()"
      >
        <Digital />
        <Login class="mx-1" />
        <span class="bg-[#0059FF] w-[7px] h-[7px] rounded-full"></span>
      </button>
    </div>
  </a-modal>
</template>
<script setup lang="ts"></script>
