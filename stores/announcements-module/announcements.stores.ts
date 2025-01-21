import {HeaderConfigs} from "@/utils/configs";
import {defineStore} from "pinia";
import urls from "@/utils/urls.json";
import {useRuntimeConfig} from "#app";
import type {ApiBase} from "~/utils/types";
import type {
    AnnouncementDetail,
    Announcements,
    QueryParams,
    QueryParamsNewAnnouncement
} from "~/utils/types/announcement";
import { stringify } from "qs";


export const useAnnouncementsStore = defineStore("announcements", {
    state: () => ({
        announcements: [] as Array<Announcements>,
        totalElements: 0 as number,
        totalPages: 0 as number,
        status: "" as string,
        error: null as null | Error,
        announcement: {} as AnnouncementDetail,
        announcementStatus: "" as string,
        announcementError: null as null | Error,
        announcementPromoteStatus: "" as string,
        announcementPromoteError: null as null | Error,
        announcementVIPStatus: "" as string,
        announcementDeactivateStatus: "" as string,
        announcementActivateStatus: "" as string,
        createdAnnouncementResult:{} as {id: number,name:string},
        createAnnouncementStatus:"" as string,
        createdAnnouncementPhotosStatus:"" as string,
        baseURL: useRuntimeConfig().public.baseURL,
    }),
    getters: {
        getAnnouncements: (state) => state.announcements,
        getTotalElements: (state) => state.totalElements,
        getTotalPages: (state) => state.totalPages,
        getStatus: (state) => state.status,

        getAnnouncement: (state) => state.announcement,
        getAnnouncementStatus: (state) => state.announcementStatus,
        getAnnouncementError: (state) => state.announcementError,

        getAnnouncementPromoteStatus: (state) => state.announcementPromoteStatus,
        getAnnouncementVIPStatus: (state) => state.announcementVIPStatus,
        getAnnouncementDeactivateStatus: (state) => state.announcementDeactivateStatus,
        getAnnouncementActivateStatus: (state) => state.announcementActivateStatus,

        getCreateNewAnnouncementStatus: (state) => state.createAnnouncementStatus,
        getCreatedNewAnnouncementResult: (state) => state.createdAnnouncementResult,
        getCreatedAnnouncementPhotosStatus: (state) => state.createdAnnouncementPhotosStatus,

    },
    actions: {
        async resetAnnouncements() {
            this.announcements = [] as Array<Announcements>;
            this.totalElements = 0;
            this.totalPages = 0;
            this.status = "";
            this.error = null;
        },
        async resetAnnouncement() {
            this.announcement = {} as AnnouncementDetail;
            this.announcementStatus = "";
            this.announcementError = null;
        },
        async fetchAnnouncements(queryData: QueryParams) {
            const {data, status, error} = await useAsyncData<ApiBase<Announcements>>(
                "announcement-list",
                () =>
                    $fetch(`${this.baseURL}${urls.announcements}`, {
                        headers: {
                            ...HeaderConfigs({
                                Authorization: useCookie("token").value || "",
                            }),
                        },
                        query: queryData,
                    })
            );
            this.totalElements = data.value?.totalElements!;
            this.totalPages = data.value?.totalPages!;
            this.announcements = data.value?.content!;
            this.status = status.value;
            this.error = error.value;
        },
        async fetchAnnouncementDetail(queryData: number) {
            const {data, status, error} = await useAsyncData<AnnouncementDetail>(
                "announcement-detail",
                () =>
                    $fetch(
                        `${this.baseURL}${urls.announcements}/${queryData}`,
                        {
                            headers: {
                                ...HeaderConfigs({
                                    Authorization: useCookie("token").value || "",
                                }),
                            },
                            // query: queryData,
                            method: "GET",
                        }
                    )
            );
            this.announcement = data!.value!;
            this.announcementStatus = status.value;
            this.announcementError = error.value;
        },
        async fetchAnnouncementPromote(queryData: number) {
            const {data, status, error} = await useAsyncData<any>(
                "announcement-promote",
                () =>
                    $fetch(
                        `${this.baseURL}${parseUrl(urls.announcement_promote, {
                            id: queryData,
                        })}`,
                        {
                            headers: {
                                ...HeaderConfigs({
                                    Authorization: useCookie("token").value || "",
                                }),
                            },
                            // query: queryData,
                            method: "PATCH",
                        }
                    )
            );
            this.announcementPromoteStatus = status.value;
        },
        async fetchAnnouncementVIP(queryData: number) {
            const {data, status, error} = await useAsyncData<any>(
                "announcement-VIP",
                () =>
                    $fetch(
                        `${this.baseURL}${parseUrl(urls.vip, {
                            id: queryData,
                        })}`,
                        {
                            headers: {
                                ...HeaderConfigs({
                                    Authorization: useCookie("token").value || "",
                                }),
                            },
                            // query: queryData,
                            method: "PATCH",
                        }
                    )
            );
            this.announcementVIPStatus = status.value;
        },
        async fetchAnnouncementDeactive(queryData: number) {
            const {data, status, error} = await useAsyncData<any>(
                "announcement-VIP",
                () =>
                    $fetch(
                        `${this.baseURL}${parseUrl(urls.deactivate_announcement, {
                            id: queryData,
                        })}`,
                        {
                            headers: {
                                ...HeaderConfigs({
                                    Authorization: useCookie("token").value || "",
                                }),
                            },
                            // query: queryData,
                            method: "DELETE",
                        }
                    )
            );
            this.announcementDeactivateStatus = status.value;
        },
        async fetchAnnouncementActive(queryData: number) {
            const {data, status, error} = await useAsyncData<any>(
                "announcement-VIP",
                () =>
                    $fetch(
                        `${this.baseURL}${parseUrl(urls.deactivate_announcement, {
                            id: queryData,
                        })}`,
                        {
                            headers: {
                                ...HeaderConfigs({
                                    Authorization: useCookie("token").value || "",
                                }),
                            },
                            // query: queryData,
                            method: "PATCH",
                        }
                    )
            );
            this.announcementActivateStatus = status.value;
        },
        async fetchCreateNewAnnouncement(queryData: QueryParamsNewAnnouncement) {
            const {data, status, error} = await useAsyncData<{id:number,name:string}>(
                "create-announcement",
                () =>
                    $fetch(
                        `${this.baseURL}${urls.announcements}`,
                        {
                            headers: {
                                ...HeaderConfigs({
                                    Authorization: useCookie("token").value || "",
                                }),
                            },
                            query: queryData,
                            method: "POST",
                        }
                    )
            );
            this.createAnnouncementStatus = status.value;
            this.createdAnnouncementResult = data.value!;
        },
        async fetchCreatedAnnouncementPhotos(queryData: {data:FormData,id:number}) {
            const queryString = stringify(queryData, {
                encode: false,
                indices: true,
                allowDots: false,
                arrayFormat: "comma", //sortList[0].sortDirection: DESC
                // arrayFormat: "repeat", //sortList.sortDirection: DESC
            });
            const {data, status, error} = await useAsyncData<{id:number,name:string}>(
                "create-announcement",
                () =>
                    $fetch(
                        `${this.baseURL}${parseUrl(urls.photos, {
                            id: queryData,
                        })}?${queryString}`,
                        {
                            headers: {
                                ...HeaderConfigs({
                                    Authorization: useCookie("token").value || "",
                                }),
                            },
                            // query: queryData,
                            method: "POST",
                        }
                    )
            );
            this.createdAnnouncementPhotosStatus = status.value;
        },
    },
});
