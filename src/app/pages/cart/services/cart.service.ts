import {
  CurrentUserData,
  UserInfoService,
} from '../../../auth/services/user-info.service';
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

  constructor(private userInfoService: UserInfoService) {
    if (JSON.parse(localStorage.getItem('cartProducts') as string) !== null) {
      const existingCartProducts = JSON.parse(
        localStorage.getItem('cartProducts') as string
      );

      this.updateCartProducts(existingCartProducts);
    }
  }

  addProductToCart(product: Product, quantity: number) {
    let cartProducts: CartProduct[] = [];
    const cartProductsSubscription = this.cartProducts.subscribe((products) => {
      cartProducts = products;
    });

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

    this.updateCartProducts(cartProducts);
    cartProductsSubscription.unsubscribe();
  }

  removeProductFromCart(cartProductToRemove: CartProduct) {
    let cartProducts: CartProduct[] = [];
    const cartProductsSubscription = this.cartProducts.subscribe((products) => {
      cartProducts = products;
    });

    cartProducts.forEach((cartProduct) => {
      if (cartProduct.id === cartProductToRemove.id) {
        const index = cartProducts.indexOf(cartProduct);
        cartProducts.splice(index, 1);
      }
    });

    this.updateCartProducts(cartProducts);
    cartProductsSubscription.unsubscribe();
  }

  emptyCart() {
    this.updateCartProducts([]);
  }

  updateCartProducts(newCartProducts: CartProduct[]) {
    this.cartProductsSubject.next(newCartProducts);
    this.numOfOrdersInCartSubject.next(newCartProducts.length);
    this.totalAmountSubject.next(this.calculateTotalAmount(newCartProducts));
    localStorage.setItem('cartProducts', JSON.stringify(newCartProducts));
    this.updateUsersCartProducts(newCartProducts);
  }

  calculateTotalAmount(cartProducts: CartProduct[]) {
    return cartProducts
      .map((cartProduct) => {
        return cartProduct.price * cartProduct.quantity;
      })
      .reduce((a, b) => {
        return a + b;
      }, 0);
  }

  updateUsersCartProducts(newCartProducts: CartProduct[]) {
    const isLoggedIn = JSON.parse(localStorage.getItem('loggedIn') as string);

    if (isLoggedIn) {
      const currentUserData: CurrentUserData = JSON.parse(
        localStorage.getItem('currentUserData') as string
      );
      const users: CurrentUserData[] = JSON.parse(
        localStorage.getItem('users') as string
      );

      users.forEach((user) => {
        if (
          user.email === currentUserData.email &&
          user.password === currentUserData.password
        ) {
          user.cartProducts = newCartProducts;
          localStorage.setItem('users', JSON.stringify(users));
          return;
        }
      });

      currentUserData.cartProducts = newCartProducts;
      this.userInfoService.updateCurrentUserData(currentUserData);
    }
  }
}
