import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuOpen: boolean = false;
  cartItemCount: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
      this.cartService.cart$.subscribe(cart => {
      this.cartItemCount = cart.length;
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
