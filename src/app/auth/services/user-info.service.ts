import { Product } from '../../pages/home/components/home-page/home-page.component';
import { CartProduct } from '../../pages/cart/services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface CurrentUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  cartProducts: CartProduct[];
  likedProducts: Product[];
}

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private loggedInSubject = new BehaviorSubject(false);
  loggedIn = this.loggedInSubject.asObservable();

  private currentUserDataSubject = new BehaviorSubject<CurrentUserData | null>(
    null
  );
  currentUserData = this.currentUserDataSubject.asObservable();

  constructor() {
    const status = JSON.parse(localStorage.getItem('loggedIn') as string);
    const currentUserData = JSON.parse(
      localStorage.getItem('currentUserData') as string
    );

    if (status) {
      this.updateLoggedInStatus(true);
      this.updateCurrentUserData(currentUserData);
    }
  }

  updateCurrentUserData(newUserData: CurrentUserData | null) {
    this.currentUserDataSubject.next(newUserData);
    localStorage.setItem('currentUserData', JSON.stringify(newUserData));
  }

  updateLoggedInStatus(status: boolean) {
    this.loggedInSubject.next(status);
    localStorage.setItem('loggedIn', JSON.stringify(status));
  }
}
