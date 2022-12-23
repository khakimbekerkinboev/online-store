import { Product } from './../../../home/components/home-page/home-page.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LikesService } from '../../services/likes.service';
import { CartService } from 'src/app/pages/cart/services/cart.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss'],
})
export class LikesComponent implements OnInit {
  likedProducts: Product[] = [];
  @Output() close = new EventEmitter<void>();

  constructor(
    private likesService: LikesService,
    private cartService: CartService
  ) {}

  removeLikedProduct(likedProduct: Product) {
    this.likesService.removeProductFromLikedProducts(likedProduct);
  }

  addToCart(likedProduct: Product) {
    this.cartService.addProductToCart(likedProduct, 1);
  }

  emptyLikedProducts() {
    this.likesService.emptyLikedProducts();
  }

  closeLikes() {
    this.close.emit();
  }

  ngOnInit(): void {
    this.likesService.likedProducts.subscribe((products) => {
      this.likedProducts = products;
    });
  }
}
