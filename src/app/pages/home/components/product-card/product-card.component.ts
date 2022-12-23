import { CartService } from './../../../cart/services/cart.service';
import { Component, Input } from '@angular/core';
import { Product } from '../home-page/home-page.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() currentProduct = <Product>{};
  currentQuantity = 1;

  constructor(private cartService: CartService) {}

  increaseAmount() {
    this.currentQuantity++;
  }

  decreaseAmount() {
    if (this.currentQuantity > 1) {
      this.currentQuantity--;
    }
  }

  addToCart(product: Product) {
    this.cartService.addProductToCart(product, this.currentQuantity);
  }
}
