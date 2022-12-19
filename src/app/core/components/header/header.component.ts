import { Product } from './../../../pages/home/components/home-page/home-page.component';
import { Component } from '@angular/core';
import { ShowProductsService } from 'src/app/pages/home/services/show-products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  foundProducts: Product[] = [];
  searchInputFocused: boolean = false;

  constructor(private showProductsService: ShowProductsService) {}

  searchWhileTyping(value: string) {
    if (value !== '') {
      this.foundProducts = this.showProductsService.allProducts.filter(
        (product: Product) => {
          return (
            product.title.includes(value) || product.description.includes(value)
          );
        }
      );
    } else {
      this.foundProducts = [];
    }
  }

  searchByButton(value: string) {
    if (value !== '') {
      this.showProductsService.updateShownProducts(this.foundProducts);
    }
  }
}
