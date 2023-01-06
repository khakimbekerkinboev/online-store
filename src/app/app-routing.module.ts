import { NotFoundComponent } from './pages/not-found/components/not-found/not-found.component';
import { FinishOrderComponent } from './pages/cart/components/finish-order/finish-order/finish-order.component';
import { ProductDetailsComponent } from './pages/product/components/product-details/product-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/components/home-page/home-page.component';
import { ConfirmOrderComponent } from './pages/cart/components/confirm-order/confirm-order.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'confirm-order',
    component: ConfirmOrderComponent,
  },
  {
    path: 'finish-order',
    component: FinishOrderComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
