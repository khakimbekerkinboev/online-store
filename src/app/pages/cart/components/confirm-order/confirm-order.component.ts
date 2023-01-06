import { OrderService } from './../../services/order.service';
import { CartProduct, CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  totalAmount: number = 0;
  orderForm: FormGroup | any;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  removeCartProduct(cartProduct: CartProduct) {
    this.cartService.removeProductFromCart(cartProduct);
  }

  onSubmit() {
    const orderDetails = {
      ...this.orderForm.value,
      orderedProducts: this.cartProducts,
      totalAmount: this.totalAmount,
      orderId: this.generateId(),
    };

    //send the orderDetails to the server

    this.orderService.orderDetails = orderDetails;
    this.router.navigate(['/finish-order']);
    this.cartService.emptyCart();
  }

  totalAmountValidator(control: FormControl) {
    if (control.value === 0) {
      return { empty: true };
    }

    return null;
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

  generateId(): string {
    const random = Math.floor(Math.random() * 9999999999) + 1;
    return random.toString();
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
