export interface Product {
  id: number;
  name: string;
  fullName?: string;
  storeId: number;
  storeName: string;
  Status: Status;
  price: Price;
  thumbnailPath: string;
  thumbnailName: string;
  eligibleToShoppingCart: boolean;
  bargainMethod: bargainMethod;
  productType: {
    id: number;
    name: string;
  };
  subcategory: {
    id: number;
    name: string;
  };
  reviewSummary: {
    averageRating: number;
    reviewCount: number;
  };
  addedToComparisonBasket?: boolean;
  addedToFavoriteBasket?: boolean;
  isActive: boolean;
  vipAt?: boolean;
  compareIsActive?: boolean;
  favoriteIsActive?: any;
}
export interface ProductDetail {
  id: number;
  name: string;
  store: {
    id: number;
    name: string;
    legalAddress: string;
    physicalAddress: string;
    phoneNumber: string;
    email: string;
    website: string;
    deliveryCities: nameID[];
    logoPath: string;
    status: Status;
  };
  productBaseCategoryLabel: string;
  productTypeName: string;
  productTypeLabel: string;
  productTypeId: number;
  sourceCountryName: string;
  measurementValue: number;
  measurementUnitName: string;
  description: string;
  marka: string;
  price: {
    initialPrice: number;
    discount: number;
    discountedPrice: number;
  };
  thumbnailPath: string;
  thumbnailName: string;
  productPhotos: Array<{ id: number; path: string }>;
  eligibleToShoppingCart: boolean;
  bargainMethod: Status;
  serviceType: Status;
  attributeValues: attributeValue[];
  subcategory: nameID;
  reviewSummary: {
    averageRating: number;
    reviewCount: number;
  };
  addedToComparisonBasket: boolean;
  addedToFavoriteBasket: boolean;
  isActive: true;
  createdAt?: Date | string;
  publishedAt?: Date | string;
  rejection?: {
    reason: string;
    rejectedAt: Date | string;
  };
  comment?: string | any;
  status?: Status;
}
type nameID = {
  id: number;
  name: string;
};
type deliveryCity = {
  id: number;
  name: string;
};
type Status = {
  label: string;
  status: string;
};
type attributeValue = {
  attributeLabel: string;
  attributeName: string;
  value: string;
};
type Price = {
  initialPrice: number;
  discount: number;
  discountedPrice: number;
};
type bargainMethod = {
  label: string;
  status: string;
};

export interface ProductQuery {
  page: number;
  size: number;
  searchText?: string;
  productCategoryLabels?: string | string[];
  productBaseCategoryLabel?: string;
  storeIds?: number[] | number;
  productTypeId?: number;
  cityIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  productTypeLabels?: string[];
  isDiscounted?: boolean;
  sortBy: string;
  sortDirection: string;
  excludedProductId?: number;
  minAverageRating?: number | undefined;
}
