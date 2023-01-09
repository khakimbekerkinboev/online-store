import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';

export interface SignUpFormValues {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  repeatPassword: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  @ViewChild('form') signUpForm: FormGroup | undefined;
  userAlreadyRegistered = false;
  accountCreated = false;
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(value: SignUpFormValues) {
    this.authService.signUp(value).subscribe((res: any) => {
      if (!res.registered) {
        this.accountCreated = true;
        setTimeout(() => {
          this.accountCreated = false;
        }, 4000);

        this.authService
          .logIn({ email: res.email, password: res.password })
          .subscribe((loginRes: any) => {
            if (!loginRes.notRegistered) {
              this.authService.logUserIn(loginRes);
              this.router.navigate(['/']);
            }
          });
      } else {
        this.userAlreadyRegistered = true;
        setTimeout(() => {
          this.userAlreadyRegistered = false;
        }, 4000);
      }
      this.signUpForm?.reset();
    });
  }
}
