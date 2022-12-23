import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from '../../home/components/home-page/home-page.component';

export interface CartProduct extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProductsSubject = new BehaviorSubject<CartProduct[]>([]);
  cartProducts = this.cartProductsSubject.asObservable();

  private numOfOrdersInCartSubject = new BehaviorSubject<number>(0);
  numOfOrdersInCart = this.numOfOrdersInCartSubject.asObservable();

  private totalAmountSubject = new BehaviorSubject<number>(0);
  totalAmount = this.totalAmountSubject.asObservable();

  constructor() {
    if (JSON.parse(localStorage.getItem('cartProducts') as string) !== null) {
      const existingCartProducts = JSON.parse(
        localStorage.getItem('cartProducts') as string
      );

      this.updateCartProducts(existingCartProducts);
      this.updateNumOfOrdersInCart(existingCartProducts.length);
      this.updateTotalAmount(existingCartProducts);
    }
  }

  addProductToCart(product: Product, quantity: number) {
    const cartProductsSubscription = this.cartProductsSubject.subscribe(
      (cartProducts) => {
        const ids = cartProducts.map((cartProduct) => cartProduct.id);

        if (!ids.includes(product.id)) {
          cartProducts.push({ ...product, quantity: quantity });
        } else {
          cartProducts.forEach((cartProduct) => {
            if (cartProduct.id === product.id) {
              cartProduct.quantity += quantity;
            }
          });
        }

        this.updateNumOfOrdersInCart(cartProducts.length);
        this.updateTotalAmount(cartProducts);
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
      }
    );

    cartProductsSubscription.unsubscribe();
  }

  removeProductFromCart(cartProductToRemove: CartProduct) {
    const cartProductsSubscription = this.cartProductsSubject.subscribe(
      (cartProducts) => {
        cartProducts.forEach((cartProduct) => {
          if (cartProduct.id === cartProductToRemove.id) {
            const index = cartProducts.indexOf(cartProduct);
            cartProducts.splice(index, 1);
          }
        });

        this.updateNumOfOrdersInCart(cartProducts.length);
        this.updateTotalAmount(cartProducts);
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
      }
    );

    cartProductsSubscription.unsubscribe();
  }

  emptyCart() {
    this.updateCartProducts([]);
    this.updateNumOfOrdersInCart(0);
    this.updateTotalAmount([]);
    localStorage.setItem('cartProducts', JSON.stringify([]));
  }

  updateCartProducts(newValue: CartProduct[]) {
    this.cartProductsSubject.next(newValue);
  }

  updateNumOfOrdersInCart(newValue: number) {
    this.numOfOrdersInCartSubject.next(newValue);
  }

  updateTotalAmount(cartProducts: CartProduct[]) {
    const totalAmount = cartProducts
      .map((cartProduct) => {
        return cartProduct.price * cartProduct.quantity;
      })
      .reduce((a, b) => {
        return a + b;
      }, 0);

    this.totalAmountSubject.next(totalAmount);
  }
}
