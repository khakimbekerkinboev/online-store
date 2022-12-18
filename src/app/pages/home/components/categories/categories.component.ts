import {
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Product } from '../home-page/home-page.component';
import { ShowProductsService } from '../../services/show-products.service';

interface Category {
  categoryName: string;
  categoryNumber: number;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Input() products: Product[] = [];
  numOfAllProducts: unknown;
  categoryNumberPairs: Category[] = [];
  @ViewChildren('category') links: QueryList<ElementRef> | null = null;

  constructor(private showProductsService: ShowProductsService) {}

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

  loadAllProducts() {
    this.showProductsService.updateShownProducts(
      this.showProductsService.allProducts
    );
  }

  filterCategory(category: Category) {
    const newProducts = this.showProductsService.allProducts.filter(
      (product: Product) => {
        return product.category === category.categoryName;
      }
    );

    this.showProductsService.updateShownProducts(newProducts);
  }

  activateLink(event: MouseEvent) {
    this.links?.forEach((link: ElementRef) => {
      if (link.nativeElement.classList.contains('active')) {
        link.nativeElement.classList.remove('active');
      }
    });

    const link = event.target as HTMLElement;
    link.classList?.add('active');
  }

  ngOnInit(): void {
    this.setCategoryNumberPairs();
  }
}
