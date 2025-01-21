export interface Store {
  id: number;
  name: string;
  productCount: number;
  logoPath: string;
  status: {
    label: string;
    status: string;
  };
}
export interface QueryParams {
  page: number;
  size: number;
  storeNamePhrase?: string | undefined;
}

export interface StoreDetail {
  id: number;
  name: string;
  legalAddress: string;
  physicalAddress: string;
  phoneNumber: string;
  email: string;
  website: string;
  deliveryCities: Array<DeliveryCity>;
  logoPath: string;
  status: {
    label: string;
    status: string;
  };
}
export interface DeliveryCity {
  id: number;
  name: string;
  checked?: boolean;
}
