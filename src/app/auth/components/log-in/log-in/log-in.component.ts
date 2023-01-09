import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

export interface LogInFormValues {
  email: string;
  password: string;
}

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
  @ViewChild('form') logInForm: FormGroup | undefined;
  userNotRegistered = false;
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(value: LogInFormValues) {
    this.authService.logIn(value).subscribe((res: any) => {
      if (res.notRegistered) {
        this.userNotRegistered = true;
        setTimeout(() => {
          this.userNotRegistered = false;
        }, 4000);
      } else {
        this.authService.logUserIn(res);
        this.router.navigate(['/']);
      }
      this.logInForm?.reset();
    });
  }
}
