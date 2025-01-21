export interface Announcements {
    createdAt: Date | string;
    id: number
    name: string
    publishedAt: Date | string
    status: { label: string, status: string }
    subcategory: string
    thumbnailName: string
    thumbnailPath: string
    type: string
    vipAt: Date | string
}

export interface QueryParams {
    page: number;
    size: number;
}

export interface QueryParamsNewAnnouncement {
    cityId:number
    description: string
    isDelivered:boolean
    measurementUnitId:number
    measurementValue:number
    name: string
    phoneNumber:string|number
    price: number
    subcategoryId:number
    typeId:number
}

export interface AnnouncementDetail {
    "id": number,
    "name": string,
    "subcategory": {
        "id": number,
        "label": string,
        "name": string
    },
    "type": string,
    "typeId": number,
    "status": {
        "label": string,
        "status": string
    },
    "isDelivered": boolean,
    "price": number,
    "measurementValue": number,
    "measurementUnit": string,
    "measurementUnitId": number,
    "city": {
        "id": number,
        "name": string
    },
    "phoneNumber": string | number,
    "description": string,
    "createdAt": Date | string,
    "publishedAt": Date | string | null,
    "promotedAt": Date | string | null,
    "thumbnailName": string,
    "thumbnailPath": string,
    "productPhotos": [
        {
            "id": number,
            "path": string
        },
    ],
    "farmerProductHistories": Array<FarmerProductHistories>,
    "vipAt": Date | string | null
}

export interface FarmerProductHistories {
    "status": {
        "label": string,
        "status": string
    },
    "note": string | null,
    "createdAt": string

}