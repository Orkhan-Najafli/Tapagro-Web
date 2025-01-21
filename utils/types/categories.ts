export interface ProductCategories {
  id:number,
  name: string,
  subcategories: Array<SubCategories>,
}
export interface SubCategories {
  id:number,
  name: string,
  measurementUnits:Array<{id:number,name:string}>,
  types:Array<{id:number,name:string}>,
}
export interface Categories {
  id: number;
  label: string;
  name: string;
  iconPath: string;
  rank: number;
  productTypes: Array<CategoriesProductType>;
  // static
  hide?: boolean;
  apiCalled?: boolean;
  productCount?: any;
}
export interface CategoriesProductType {
  id: number;
  label: string;
  name: string;
  productCount: number;
  hide?: boolean;
  checked?: boolean;
}
