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
// definePageMeta({
//   middleware: ["guest"],
// });

// methods: {
// login(data) {
//   process.browser &&
//     this.$store
//       .dispatch("auth/login", data)
//       .then((res) => {
//         this.$store.dispatch("auth/getUserDetail").then((response) => {
//           const redirect = Cookies.get("redirect");
//           if (redirect) {
//             Cookies.remove("redirect");
//             location.href = redirect;
//           } else {
//             this.$router.push("/");
//           }
//         });
//       })
//       .catch(() => {
//         this.$router.push("/");
//       });
// },
</script>
