import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  cart: any[] = [];

  constructor(private cartService: CartService, private router: Router) {
    // this.cart = this.cartService.getCart();
  }

  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart; // Automatically updates when the cart changes
    });
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
    // this.cart = this.cartService.getCart(); // Update local cart after deletion
  }

  goBackToProducts() {
    this.router.navigate(['/products']); // Navigate back to product list
  }

  checkout() {
    // alert('Proceeding to checkout (mock functionality)');
    this.router.navigate(['/checkout']);
  }
}
