import { NotFoundComponent } from './pages/not-found/components/not-found/not-found.component';
import { FinishOrderComponent } from './pages/cart/components/finish-order/finish-order/finish-order.component';
import { ProductDetailsComponent } from './pages/product/components/product-details/product-details.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/components/home-page/home-page.component';
import { ConfirmOrderComponent } from './pages/cart/components/confirm-order/confirm-order.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { LogInComponent } from './auth/components/log-in/log-in/log-in.component';
import { NotLoggedIn } from './auth/services/not-logged-in';

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
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [NotLoggedIn],
  },
  {
    path: 'log-in',
    component: LogInComponent,
    canActivate: [NotLoggedIn],
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
