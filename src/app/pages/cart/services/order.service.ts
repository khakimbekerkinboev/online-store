import { CartProduct } from './cart.service';
import { Injectable } from '@angular/core';

export interface OrderDetails {
  orderId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  shippingAddress: string;
  orderedProducts: CartProduct[];
  totalAmount: number;
  paymentMethod: string;
  comments: string;
  agreeToTerms: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orderDetails: OrderDetails | undefined;
}
