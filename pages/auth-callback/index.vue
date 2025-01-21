<template>
  <div
    style="max-width: 1224px"
    class="container mx-auto mt-24 px-6 md:p-0 m-0"
  ></div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blank",
});
useAuthenticator().fetchLogin();
</script>
