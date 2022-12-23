import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartProduct, CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  totalAmount: number = 0;
  @Output() close = new EventEmitter<void>();

  constructor(private cartService: CartService) {}

  removeCartProduct(cartProduct: CartProduct) {
    this.cartService.removeProductFromCart(cartProduct);
  }

  emptyCart() {
    this.cartService.emptyCart();
  }

  closeCart() {
    this.close.emit();
  }

  ngOnInit(): void {
    this.cartService.cartProducts.subscribe((cartProducts) => {
      this.cartProducts = cartProducts;
    });

    this.cartService.totalAmount.subscribe((amount) => {
      this.totalAmount = amount;
    });
  }
}
