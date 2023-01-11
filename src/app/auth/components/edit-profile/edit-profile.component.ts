import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SignUpFormValues } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  @ViewChild('form') signUpForm: FormGroup | undefined;
  userAlreadyRegistered = false;
  changesSaved = false;
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(value: SignUpFormValues) {
    this.authService.editProfile(value).subscribe((res) => {
      console.log(res);
    });
  }
}
