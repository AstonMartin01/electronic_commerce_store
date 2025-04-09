import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: any[] = [];
  totalPrice: number = 0;
  paymentSuccess: boolean = false;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.totalPrice = this.cart.reduce((sum, item) => sum + item.price, 0);
    });
  }

  processPayment() {
    // Simulating a successful payment process
    this.paymentSuccess = true;
    this.cartService.clearCart(); // Clear cart after payment
  }

  goBackToProducts() {
    this.router.navigate(['/products']);
  }
}
