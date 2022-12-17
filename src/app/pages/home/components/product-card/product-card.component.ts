import { Component, Input } from '@angular/core';
import { Product } from '../home-page/home-page.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() currentProduct = <Product>{};
}
