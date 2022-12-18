import { Component, OnInit } from '@angular/core';
import { GetProductsService } from '../../services/get-products.service';
import { ShowProductsService } from '../../services/show-products.service';

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

  constructor(
    private getProductsService: GetProductsService,
    private showProductsService: ShowProductsService
  ) {}

  getAllProducts() {
    this.getProductsService.getAllProducts().subscribe((res: any) => {
      if (res) {
        this.showProductsService.allProducts = res;
        this.showProductsService.updateShownProducts(res);

        this.showProductsService.shownProducts.subscribe((newShownProducts) => {
          this.products = newShownProducts;
        });

        this.productsFullyLoaded = true;
      }
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }
}
