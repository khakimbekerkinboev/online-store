import { ProductsService } from './../../services/products.service';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../home-page/home-page.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Input() products: Product[] = [];
  numOfAllProducts: unknown;
  categoryNumberPairs: { categoryName: string; categoryNumber: number }[] = [];

  setCategoryNumberPairs() {
    this.numOfAllProducts = this.products.length;
    const categories = Array.from(
      new Set(
        this.products.map((product: Product) => {
          return product.category;
        })
      )
    );

    categories.forEach((category: string) => {
      const numOfProducts = this.products.filter((product: Product) => {
        return product.category === category;
      }).length;

      this.categoryNumberPairs.push({
        categoryName: category,
        categoryNumber: numOfProducts,
      });
    });
  }

  ngOnInit(): void {
    this.setCategoryNumberPairs();
  }
}
