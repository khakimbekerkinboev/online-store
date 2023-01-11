import { UserInfoService } from './user-info.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NotLoggedIn implements CanActivate {
  constructor(
    private userInfoService: UserInfoService,
    private router: Router
  ) {}

  canActivate() {
    let isLoggedIn = false;
    this.userInfoService.loggedIn.subscribe((status) => {
      isLoggedIn = status;
    });

    if (!isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/**']);
      return false;
    }
  }
}
