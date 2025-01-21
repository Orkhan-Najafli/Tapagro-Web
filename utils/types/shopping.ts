export interface Shopping {
  id: number;
  items: Array<Item>;
  totalPrice: number;
  totalDiscountedPrice: number;
  commonWarehouses: Array<Warehouse>;
  stockSufficientList: any;
  isActive: boolean;
}
export interface QueryParams {
  productId: number;
  count: number;
}
export interface Item {
  id: number;
  product: Product;
  store: Store;
  count: number;
  totalPrice: number;
  addedToFavoriteBasket: boolean;
  stockSufficient: boolean;
  warehouses: Array<Warehouse>;
}
export interface Product {
  id: number;
  name: string;
  thumbnailName: string;
  thumbnailPath: string;
  price: {
    initialPrice: number;
    discount: number;
    discountedPrice: number;
  };
  isActive: boolean;
}
interface Store {
  id: number;
  name: string;
  status: {
    label: string;
    status: string;
  };
}
interface Warehouse {
  id: number;
  name: string;
  address: string;
}
