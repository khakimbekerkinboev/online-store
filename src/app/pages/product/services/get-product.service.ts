import { Product } from './../../home/components/home-page/home-page.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetProductService {
  constructor(private http: HttpClient) {}

  getProduct(id: number) {
    return this.http.get<Product>('https://fakestoreapi.com/products/' + id);
  }
}
