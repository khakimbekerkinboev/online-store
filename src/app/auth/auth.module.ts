import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './components/log-in/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [SignUpComponent, LogInComponent],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [SignUpComponent, LogInComponent],
})
export class AuthModule {}
