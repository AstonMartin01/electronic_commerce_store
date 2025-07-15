import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuOpen: boolean = false;
  cartItemCount: number = 0;
  navbarButton: string = '';
  navbarRouterLink: string = '';

  constructor(private cartService: CartService, private dataService: DataService) { }

  ngOnInit(): void {
      this.checkLogin();
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

  checkLogin() {
    let token = this.dataService.getToken();
    // if (token) {
      // this.dataService.setToken(token);
      this.dataService.getUser(token).subscribe({
        next: (response) => {
          this.checkNavbarButton(response.email);
          console.log('User logged in:', response.email);
          // alert('Successfully logged in!');
        },
        error: (error) => {
          this.checkNavbarButton(null);
          // console.error('Error logging in user:', error);
          // alert('Something went wrong. Please try again.');
        }
      });
    // }
  }
  
  checkNavbarButton(navbarButton: any) {
    if (navbarButton) {
      this.navbarButton = "Welcome, " + navbarButton;
      this.navbarRouterLink = '/';
    } 
    else {
      this.navbarButton = "Sign Up";
      this.navbarRouterLink = '/sign-up';
    }
  }
}
