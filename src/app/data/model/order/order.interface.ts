import { User } from '../user/user.interface';
import { DeliveryAddress } from './delivery-address.interface';
import { OrderProduct } from './order-product.interface';

export interface Order {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  creditCardId: string;
  deliveryAddressId: string;
  userId: string;
  deliveryFee: number;
  itemTotal: number;
  status: string;
  user: User;
  deliveryAddress: DeliveryAddress;
  products: OrderProduct[];
}
