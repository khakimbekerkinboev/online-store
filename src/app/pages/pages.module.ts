import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './home/components/categories/categories.component';
import { ProductsComponent } from './home/components/products/products.component';
import { HomePageComponent } from './home/components/home-page/home-page.component';
import { ProductCardComponent } from './home/components/product-card/product-card.component';
import { ShortenProductNamePipe } from './home/pipes/shorten-product-name.pipe';

@NgModule({
  declarations: [
    CategoriesComponent,
    ProductsComponent,
    HomePageComponent,
    ProductCardComponent,
    ShortenProductNamePipe,
  ],
  imports: [CommonModule],
  exports: [CategoriesComponent, ProductsComponent, HomePageComponent],
})
export class PagesModule {}
