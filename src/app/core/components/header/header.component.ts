import { Router } from '@angular/router';
import { Product } from './../../../pages/home/components/home-page/home-page.component';
import { Component, OnInit } from '@angular/core';
import { ShowProductsService } from 'src/app/pages/home/services/show-products.service';
import { CartService } from 'src/app/pages/cart/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  foundProducts: Product[] = [];
  searchInputFocused: boolean = false;
  numOfOrdersInCart: number = 0;
  showCartContainer: boolean = false;

  constructor(
    private showProductsService: ShowProductsService,
    private cartService: CartService,
    private route: Router
  ) {}

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
    } else {
      this.showProductsService.updateShownProducts([]);
    }
  }

  viewProduct(product: Product) {
    this.route.navigate(['/products', product.id]);
  }

  ngOnInit() {
    this.cartService.numOfOrdersInCart.subscribe((num) => {
      this.numOfOrdersInCart = num;
    });
  }
}
