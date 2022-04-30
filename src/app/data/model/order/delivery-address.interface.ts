export interface DeliveryAddress {
  id: string;
  city: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  fullName: string;
  isDefault: boolean;
  phoneNumber: string;
  postalCode: string;
  streetAddress: string;
  userId: string;
}
