import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'online-store';
  onActivate() {
    window.scroll({
      top: 0,
      left: 0,
    });
  }
}
