import { CartService } from './../../../cart/services/cart.service';
import { Product } from './../../../home/components/home-page/home-page.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetProductService } from '../../services/get-product.service';
import { LikesService } from 'src/app/pages/likes/services/likes.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  currentProduct: Product = <Product>{};
  productFullyLoaded: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private getProductService: GetProductService,
    private cartService: CartService,
    private likesService: LikesService
  ) {}

  addToCart(product: Product) {
    this.cartService.addProductToCart(product, 1);
  }

  likeTheProduct(product: Product) {
    this.likesService.addProductToLikedProducts(product);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getProductService
        .getProduct(params['id'])
        .subscribe((product: Product) => {
          this.currentProduct = product;
          this.productFullyLoaded = true;
        });
    });
  }
}
