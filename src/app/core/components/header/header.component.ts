import { Router } from '@angular/router';
import { Product } from './../../../pages/home/components/home-page/home-page.component';
import { Component, OnInit } from '@angular/core';
import { ShowProductsService } from 'src/app/pages/home/services/show-products.service';
import { CartService } from 'src/app/pages/cart/services/cart.service';
import { LikesService } from 'src/app/pages/likes/services/likes.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  foundProducts: Product[] = [];
  searchInputFocused: boolean = false;
  numOfOrdersInCart: number = 0;
  numOfLikedProducts: number = 0;
  showCartContainer: boolean = false;
  showLikesContainer: boolean = false;
  loggedIn = false;
  currentUser = '';

  constructor(
    private showProductsService: ShowProductsService,
    private cartService: CartService,
    public authService: AuthService,
    private likesService: LikesService,
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

  toggleCartContainer() {
    this.showCartContainer = !this.showCartContainer;

    if (this.showLikesContainer) {
      this.showLikesContainer = false;
    }
  }

  toggleLikesContainer() {
    this.showLikesContainer = !this.showLikesContainer;

    if (this.showCartContainer) {
      this.showCartContainer = false;
    }
  }

  logOut() {
    this.authService.logUserOut();
  }

  ngOnInit() {
    this.cartService.numOfOrdersInCart.subscribe((num) => {
      this.numOfOrdersInCart = num;
    });

    this.likesService.numOflikedProducts.subscribe((num) => {
      this.numOfLikedProducts = num;
    });

    this.authService.loggedIn.subscribe((status) => {
      this.loggedIn = status;
    });

    this.authService.currentUserData.subscribe((res: any) => {
      this.currentUser = `${res.firstName} ${res.lastName[0]}...`;
    });
  }
}
