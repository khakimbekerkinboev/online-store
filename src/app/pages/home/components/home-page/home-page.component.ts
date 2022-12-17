import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  products: Product[] = [];
  productsFullyLoaded: boolean = false;
  constructor(private productsService: ProductsService) {}

  getAllProducts() {
    this.productsService.getAllProducts().subscribe((res: any) => {
      if (res) {
        this.products = res;
        this.productsFullyLoaded = true;
      }
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }
}
