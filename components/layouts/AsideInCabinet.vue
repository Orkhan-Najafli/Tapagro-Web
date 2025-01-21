<template>
    <div class="bg-transparent">
        <div class="">
            <div class="flex flex-row">
                <div style="" class="flex flex-col navigation">
                    <div
                        class="flex flex-row items-center justify-start cursor-pointer rounded-xl shadow-lg p-3 md:p-5 bg-white">
                        <span
                            class="w-10 h-10 md:w-20 md:h-20 rounded-full flex justify-center items-center bg-emerald-50 text-emerald-600 mr-6">
                            <UserOutlined class="text-emerald-600 text-xl md:text-3xl" />
                        </span>
                        <p v-if="useUsersStore().getUserStatus === 'success'"
                            class="p-0 m-0 font-bold text-base md:text-xl mr-3 text-gray-500">
                            {{
                                `${useUsersStore().getUserData.firstName} ${useUsersStore().getUserData.lastName}`
                            }}
                        </p>
                    </div>
                    <div class="flex flex-col rounded-xl shadow-lg mt-8 pt-8 px-8 bg-white">
                        <nuxt-link to="/kabinet/tenzimlemelerim/"
                            class="flex flex-row items-center justify-start text-gray-400 cursor-pointer hover:text-green-800 focus:text-green-800">
                            <IdcardOutlined :class="{
                                'font-semibold text-green-900': useRoute().path == '/kabinet/tenzimlemelerim',
                            }" class="text-lg mr-4" />
                            <p :class="{
                                'font-semibold text-green-900': useRoute().path == '/kabinet/tenzimlemelerim',
                            }" class="font-medium text-lg p-0 m-0">
                                {{ t("my_information") }}
                            </p>
                        </nuxt-link>
                        <nuxt-link to="/kabinet/sifarislerim"
                            class="flex flex-row items-center justify-start text-gray-400 my-5 cursor-pointer hover:text-green-800 focus:text-green-800">
                            <ShoppingCartOutlined :class="{
                                'font-semibold text-green-900': useRoute().path == '/kabinet/sifarislerim',
                            }" class="text-lg mr-4" />
                            <p :class="{
                                'font-semibold text-green-900': useRoute().path == '/kabinet/sifarislerim',
                            }" class="font-medium text-lg p-0 m-0">
                                {{ t("my_orders") }}
                            </p>
                        </nuxt-link>
                        <nuxt-link to="/kabinet/elanlarim"
                            class="flex flex-row items-center justify-start text-gray-400 mb-5 cursor-pointer hover:text-green-800 focus:text-green-800">
                            <FileImageOutlined :class="{
                                'font-semibold text-green-900': useRoute().path == '/kabinet/elanlarim',
                            }" class="text-lg mr-4" />
                            <p :class="{
                                'font-semibold text-green-900': useRoute().path == '/kabinet/elanlarim',
                            }" class="font-medium text-lg p-0 m-0">
                                {{ t("my_announcements") }}
                            </p>
                        </nuxt-link>
                        <nuxt-link to="/kabinet/mehsul-qiymetlendirilmesi"
                            class="flex flex-row items-center justify-start text-gray-400 mb-5 cursor-pointer hover:text-green-800 focus:text-green-800">
                            <CommentOutlined :class="{
                                'font-semibold text-green-900': useRoute().path == '/kabinet/mehsul-qiymetlendirilmesi',
                            }" class="text-lg mr-4" />
                            <p :class="{
                                'font-semibold text-green-900':
                                    useRoute().path == '/kabinet/mehsul-qiymetlendirilmesi',
                            }" class="font-medium text-lg p-0 m-0">
                                {{ t("product_evaluation") }}
                            </p>
                        </nuxt-link>
                        <div class="hidden lg:flex flex-row pb-8 items-center justify-start text-gray-400 cursor-pointer"
                            @click="useAuthenticator().logOut()">
                            <LogoutOutlined class="text-lg mr-4" />
                            <p class="font-medium text-lg p-0 m-0">{{ t("log_out") }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const { t } = useI18n()

</script>
<style>
.router-link-active {
    @apply text-green-900 font-bold;
}

.router-link-active:hover {
    @apply text-green-900 font-medium;
}

@media only screen and (min-width: 1024px) {
    .navigation {
        width: 348px;
        min-width: 348px;
    }
}

@media only screen and (max-width: 1023px) {
    .navigation {
        width: 100%;
        max-width: 348px;
    }
}
</style>