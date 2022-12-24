import { CartProduct, CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  totalAmount: number = 0;
  constructor(private cartService: CartService) {}

  removeCartProduct(cartProduct: CartProduct) {
    this.cartService.removeProductFromCart(cartProduct);
  }

  ngOnInit() {
    this.cartService.cartProducts.subscribe((cartProducts) => {
      this.cartProducts = cartProducts;
    });

    this.cartService.totalAmount.subscribe((num) => {
      this.totalAmount = num;
    });
  }
}
