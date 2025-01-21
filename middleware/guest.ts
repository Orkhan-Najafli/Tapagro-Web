export default defineNuxtRouteMiddleware((to, from) => {
  if (!useAuthenticator().getToken) {
    // return navigateTo("/");
    return abortNavigation()
  }
});
