import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PagesModule } from '../pages/pages.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, PagesModule, RouterModule],
  exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {}
