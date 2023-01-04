import { CartProduct, CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  totalAmount: number = 0;
  orderForm: FormGroup | any;

  constructor(private cartService: CartService) {}

  removeCartProduct(cartProduct: CartProduct) {
    this.cartService.removeProductFromCart(cartProduct);
  }

  onSubmit() {
    console.log(this.orderForm.value);
  }

  paymentMethodValidator(control: FormControl) {
    if (control.value === '0') {
      return { notChosen: true };
    }

    return null;
  }

  agreeToTermsValidator(control: FormControl) {
    if (control.value == false) {
      return { notAgreed: true };
    }

    return null;
  }

  ngOnInit() {
    this.cartService.cartProducts.subscribe((cartProducts) => {
      this.cartProducts = cartProducts;
    });

    this.cartService.totalAmount.subscribe((num) => {
      this.totalAmount = num;
    });

    this.orderForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      shippingAddress: new FormControl('', Validators.required),
      totalAmount: new FormControl(this.totalAmount),
      paymentMethod: new FormControl(
        '0',
        Validators.compose([Validators.required, this.paymentMethodValidator])
      ),
      comments: new FormControl(''),
      agreeToTerms: new FormControl(
        false,
        Validators.compose([Validators.required, this.agreeToTermsValidator])
      ),
    });
  }
}
