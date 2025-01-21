export interface FarmerProduct {
  id: number;
  name: string;
  thumbnailName: string;
  thumbnailPath: string;
  fullName?: string;
  subcategory: string;
  type: string;
  status: {
    label: string;
    status: string;
  };
  createdAt: string;
  publishedAt: string;
  vipAt: string | boolean;
  addedToComparisonBasket?: boolean;
  addedToFavoriteBasket?: boolean;
  isActive?: boolean;
  compareIsActive?: boolean;
  favoriteIsActive?: any;
  price?: any;
  reviewSummary?: any;
  storeName?: any;
  bargainMethod?: any;
  eligibleToShoppingCart?: boolean;
}
export interface QueryParams {
  page: number;
  size: number;
  sortList?: sortList[];
  isVip?: boolean;
  sortBy?: string;
  sortDirection?: string;
  createdBy?: string | string[];
}
interface sortList {
  sortBy: string;
  sortDirection: string;
}
export interface Farmer {
  id: string;
  name: string;
  farmerProductCount: number;
}

export interface FarmerDTO {
  name: string;
  city: {
    id: number;
    name: string;
  };
  isActive: boolean;
}
export interface FarmerContact {
  emailAddress: string;
  phoneNumber: string;
}
