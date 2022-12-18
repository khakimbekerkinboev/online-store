import { Product } from './../components/home-page/home-page.component';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShowProductsService {
  allProducts: Product[] = [];
  private products = new BehaviorSubject<Product[]>([]);
  shownProducts = this.products.asObservable();

  constructor() {}

  updateShownProducts(newProducts: Product[]) {
    this.products.next(newProducts);
  }
}
