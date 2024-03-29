import { LikesService } from 'src/app/pages/likes/services/likes.service';
import { Product } from './../../pages/home/components/home-page/home-page.component';
import {
  CartProduct,
  CartService,
} from './../../pages/cart/services/cart.service';
import { LogInFormValues } from './../components/log-in/log-in.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUpFormValues } from '../components/sign-up/sign-up.component';
import { UserInfoService, CurrentUserData } from './user-info.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private cartService: CartService,
    private likedProducts: LikesService,
    private userInfoService: UserInfoService
  ) {}

  logUserOut() {
    this.userInfoService.updateLoggedInStatus(false);
    this.userInfoService.updateCurrentUserData(null);
    this.cartService.emptyCart();
    this.likedProducts.emptyLikedProducts();
  }

  logUserIn(newUserData: CurrentUserData) {
    this.userInfoService.updateLoggedInStatus(true);
    this.userInfoService.updateCurrentUserData(newUserData);
    this.cartService.updateCartProducts(newUserData?.cartProducts);
    this.likedProducts.updateLikedProducts(newUserData?.likedProducts);
  }

  logIn(data: LogInFormValues) {
    return new Observable((observer) => {
      setTimeout(() => {
        if (localStorage.getItem('users') !== null) {
          const users: CurrentUserData[] = JSON.parse(
            localStorage.getItem('users') as string
          );
          let registered = false;

          users.forEach((user) => {
            if (user.email === data.email && user.password === data.password) {
              observer.next(user);
              registered = true;
              return;
            }
          });

          if (!registered) {
            observer.next({ notRegistered: true });
          }
        } else {
          observer.next({ notRegistered: true });
        }
      }, 2000);
    });
  }

  signUp(data: SignUpFormValues) {
    return new Observable((observer) => {
      setTimeout(() => {
        const existingCartProducts: CartProduct[] =
          JSON.parse(localStorage.getItem('cartProducts') as string) || [];
        const existingLikedProducts: Product[] =
          JSON.parse(localStorage.getItem('likedProducts') as string) || [];

        if (localStorage.getItem('users') !== null) {
          const users: CurrentUserData[] = JSON.parse(
            localStorage.getItem('users') as string
          );

          const registered = users.some((user) => {
            return user.email === data.email && user.password === data.password;
          });

          if (registered) {
            observer.next({ registered: true });
          } else {
            users.push({
              ...data,
              cartProducts: existingCartProducts,
              likedProducts: existingLikedProducts,
            });
            localStorage.setItem('users', JSON.stringify(users));
            observer.next(data);
          }
        } else {
          const users: CurrentUserData[] = [];
          users.push({
            ...data,
            cartProducts: existingCartProducts,
            likedProducts: existingLikedProducts,
          });
          localStorage.setItem('users', JSON.stringify(users));
          observer.next(data);
        }
      }, 2000);
    });
  }

  editProfile(data: SignUpFormValues) {
    return new Observable((observer) => {
      setTimeout(() => {
        const isLoggedIn = JSON.parse(
          localStorage.getItem('loggedIn') as string
        );

        const currentUserData: CurrentUserData = JSON.parse(
          localStorage.getItem('currentUserData') as string
        );

        const users: CurrentUserData[] = JSON.parse(
          localStorage.getItem('users') as string
        );

        if (isLoggedIn && currentUserData !== null) {
          const newUserData: CurrentUserData = {
            ...data,
            cartProducts: currentUserData.cartProducts,
            likedProducts: currentUserData.likedProducts,
          };

          users.forEach((user, index) => {
            if (
              user.email === currentUserData.email &&
              user.password === currentUserData.password
            ) {
              users[index] = JSON.parse(JSON.stringify(newUserData));
              return;
            }
          });

          localStorage.setItem('users', JSON.stringify(users));
          this.userInfoService.updateCurrentUserData(newUserData);
          observer.next({ changesSaved: true });
        } else {
          observer.next({ changesSaved: false });
        }
      }, 2000);
    });
  }

  deleteAccount() {
    return new Observable((observer) => {
      setTimeout(() => {
        const currentUserData: CurrentUserData = JSON.parse(
          localStorage.getItem('currentUserData') as string
        );

        const users: CurrentUserData[] = JSON.parse(
          localStorage.getItem('users') as string
        );

        users.forEach((user, index) => {
          if (
            user.email === currentUserData.email &&
            user.password === currentUserData.password
          ) {
            users.splice(index, 1);
            return;
          }
        });

        localStorage.setItem('users', JSON.stringify(users));
        observer.next({ deleted: true });
      }, 2000);
    });
  }
}
