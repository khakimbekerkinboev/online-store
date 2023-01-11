import { UserInfoService } from './../../../auth/services/user-info.service';
import { CurrentUserData } from './../../../auth/services/user-info.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from '../../home/components/home-page/home-page.component';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  likedProductsSubject = new BehaviorSubject<Product[]>([]);
  likedProducts = this.likedProductsSubject.asObservable();

  numOflikedProductsSubject = new BehaviorSubject<number>(0);
  numOflikedProducts = this.numOflikedProductsSubject.asObservable();

  constructor(private userInfoService: UserInfoService) {
    if (JSON.parse(localStorage.getItem('likedProducts') as string) !== null) {
      const existingLikedProducts = JSON.parse(
        localStorage.getItem('likedProducts') as string
      );

      this.updateLikedProducts(existingLikedProducts);
    }
  }

  addProductToLikedProducts(product: Product) {
    let likedProducts: Product[] = [];
    const likedProductsSubscription = this.likedProductsSubject.subscribe(
      (products) => {
        likedProducts = products;
      }
    );

    if (!likedProducts.includes(product)) {
      likedProducts.push(product);
      this.updateLikedProducts(likedProducts);
    }

    likedProductsSubscription.unsubscribe();
  }

  removeProductFromLikedProducts(product: Product) {
    let likedProducts: Product[] = [];
    const likedProductsSubscription = this.likedProductsSubject.subscribe(
      (products) => {
        likedProducts = products;
      }
    );

    if (likedProducts.includes(product)) {
      const index = likedProducts.indexOf(product);
      likedProducts.splice(index, 1);
      this.updateLikedProducts(likedProducts);
    }

    likedProductsSubscription.unsubscribe();
  }

  emptyLikedProducts() {
    this.updateLikedProducts([]);
  }

  updateLikedProducts(newLikedProducts: Product[]) {
    this.likedProductsSubject.next(newLikedProducts);
    this.numOflikedProductsSubject.next(newLikedProducts.length);
    localStorage.setItem('likedProducts', JSON.stringify(newLikedProducts));
    this.updateUsersLikedProducts(newLikedProducts);
  }

  updateUsersLikedProducts(newLikedProducts: Product[]) {
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
          user.likedProducts = newLikedProducts;
          localStorage.setItem('users', JSON.stringify(users));
          return;
        }
      });

      currentUserData.likedProducts = newLikedProducts;
      this.userInfoService.updateCurrentUserData(currentUserData);
    }
  }
}
