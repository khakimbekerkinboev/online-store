import { CurrentUserData } from './../../services/user-info.service';
import { UserInfoService } from './../../services/user-info.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SignUpFormValues } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @ViewChild('form') signUpForm: FormGroup | undefined;
  userNotLoggedIn = false;
  changesSaved = false;
  currentUserData: CurrentUserData | null = null;

  constructor(
    private authService: AuthService,
    private userInfoService: UserInfoService,
    private router: Router
  ) {}

  onSubmit(value: SignUpFormValues) {
    this.authService.editProfile(value).subscribe((res: any) => {
      if (res.changesSaved) {
        this.changesSaved = true;
        setTimeout(() => {
          this.changesSaved = false;
          this.router.navigate(['/']);
        }, 4000);
      } else {
        this.userNotLoggedIn = true;
        setTimeout(() => {
          this.userNotLoggedIn = false;
        }, 4000);
      }
    });
  }

  ngOnInit(): void {
    this.userInfoService.currentUserData.subscribe((data) => {
      this.currentUserData = data;
    });
  }
}
