import type { UploadFile } from "ant-design-vue";
import type { Store } from "./stores";

export interface ReviewDetail {
  id: number;
  rating: number;
  comment: string;
  name?: string;
  thumbnailPath?: string;
  photos: Array<{
    id: number;
    path?: string;
    data?: string;
  }>;
  status: {
    label: string;
    status: string;
  };
  product: {
    id: number;
    name: string;
    stateControlled: boolean;
    thumbnail: string;
  };
  store: {
    id: number;
    name: string;
    voen: string;
    merchants: Array<string>;
  };
  rejection: {
    reason: string;
    rejectedAt: Date | string;
  };
  createdAt: Date | string;
  publishedAt: Date | string;
}
export interface Review {
  id: number;
  productName: string;
  comment: string;
  rating: number;
  publishedAt: Date | string;
  status: {
    label: string;
    status: string;
  };
}
export interface DeleteReview {
  rating: number;
  status: string;
}
export interface ReviewSummary {
  reviews: Array<{ rating: number; count: number; percentage: number }>;
}
export interface ProductReview {
  reviewer: string;
  publishedAt: Date | string;
  rating: number;
  comment: string;
  photos: Array<string>;
  reply: {
    reply: string;
    repliedAt: Date | string;
  };
  store?: Store | any;
}
