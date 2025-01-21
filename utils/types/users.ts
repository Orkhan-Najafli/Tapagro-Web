export interface User {
  cityId?:undefined
  // emailAddress?:undefined
  // phoneNumber?:undefined

  firstName?: string;
  lastName?: string;
  fatherName?: string;
  contactDetails: {
    phoneNumber?: string;
    emailAddress?: string;
  };
  city: {
    id: number | undefined;
    name: string | undefined;
  };
  storeName: string | undefined;

}
