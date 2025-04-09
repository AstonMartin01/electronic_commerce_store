import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>(this.cart);
  cart$ = this.cartSubject.asObservable(); // Expose as Observable for real-time updates

  addToCart(product: any) {
    this.cart.push(product);
    this.cartSubject.next([...this.cart]); // Emit updated cart list
  }

  getCart() {
    return this.cart;
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.cartSubject.next([...this.cart]); // Emit updated cart list
  }

  clearCart() {
    this.cart = [];
    this.cartSubject.next([]);
  }
}
