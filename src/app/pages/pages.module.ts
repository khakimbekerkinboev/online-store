import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './home/components/categories/categories.component';
import { ProductsComponent } from './home/components/products/products.component';
import { HomePageComponent } from './home/components/home-page/home-page.component';
import { ProductCardComponent } from './home/components/product-card/product-card.component';
import { ShortenProductNamePipe } from './home/pipes/shorten-product-name.pipe';
import { ConvertToUsdPipe } from './home/pipes/convert-to-usd.pipe';
import { ProductDetailsComponent } from './product/components/product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart/components/cart/cart.component';
import { LikesComponent } from './likes/components/likes/likes.component';
import { ConfirmOrderComponent } from './cart/components/confirm-order/confirm-order.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    ProductsComponent,
    HomePageComponent,
    ProductCardComponent,
    ShortenProductNamePipe,
    ConvertToUsdPipe,
    ProductDetailsComponent,
    CartComponent,
    LikesComponent,
    ConfirmOrderComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    CategoriesComponent,
    ProductsComponent,
    HomePageComponent,
    ShortenProductNamePipe,
    ConvertToUsdPipe,
    ProductDetailsComponent,
    CartComponent,
    LikesComponent,
  ],
})
export class PagesModule {}
