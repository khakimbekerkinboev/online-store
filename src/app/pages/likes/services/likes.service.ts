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

  constructor() {
    if (JSON.parse(localStorage.getItem('likedProducts') as string) !== null) {
      const existingLikedProducts = JSON.parse(
        localStorage.getItem('likedProducts') as string
      );

      this.updateLikedProducts(existingLikedProducts);
      this.updateNumOfLikedProducts(existingLikedProducts.length);
    }
  }

  addProductToLikedProducts(product: Product) {
    const likedProductsSubscription = this.likedProductsSubject.subscribe(
      (likedProducts) => {
        if (!likedProducts.includes(product)) {
          likedProducts.push(product);
          this.updateNumOfLikedProducts(likedProducts.length);
          localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
        }
      }
    );

    likedProductsSubscription.unsubscribe();
  }

  removeProductFromLikedProducts(product: Product) {
    const likedProductsSubscription = this.likedProductsSubject.subscribe(
      (likedProducts) => {
        if (likedProducts.includes(product)) {
          const index = likedProducts.indexOf(product);
          likedProducts.splice(index, 1);
          this.updateNumOfLikedProducts(likedProducts.length);
          localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
        }
      }
    );

    likedProductsSubscription.unsubscribe();
  }

  emptyLikedProducts() {
    this.likedProductsSubject.next([]);
    this.updateNumOfLikedProducts(0);
    localStorage.setItem('likedProducts', JSON.stringify([]));
  }

  updateLikedProducts(likedProducts: Product[]) {
    this.likedProductsSubject.next(likedProducts);
  }

  updateNumOfLikedProducts(newValue: number) {
    this.numOflikedProductsSubject.next(newValue);
  }
}
