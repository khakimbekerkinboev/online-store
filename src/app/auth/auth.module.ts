import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

@NgModule({
  declarations: [SignUpComponent, LogInComponent, EditProfileComponent],
  imports: [CommonModule, RouterModule, FormsModule, SharedModule],
  exports: [SignUpComponent, LogInComponent],
})
export class AuthModule {}
