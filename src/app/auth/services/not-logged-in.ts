import { AuthService } from 'src/app/auth/services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotLoggedIn implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    let isLoggedIn = false;
    this.authService.loggedIn.subscribe((status) => {
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
