export default defineNuxtRouteMiddleware((to, from) => {
  console.log("in middleware to=> ",to);
  console.log("in middleware from=> ",from);
  
    // if (!useAuthenticator().getToken) {
    //   // return navigateTo("/");
    //   return abortNavigation()
    // }
  });
  