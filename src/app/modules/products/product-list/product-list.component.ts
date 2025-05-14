import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  cart: any[] = [];
  filteredProducts: any[] = [];
  page: number = 1;
  pageSize: number = 15;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = [...this.products];
    });

    this.cartService.cart$.subscribe(cart => {
      this.cart = cart; // Syncs with the Shopping Cart service
    });
  }

  sortProducts(event: { type: 'name' | 'price', order: 'asc' | 'desc' }) {
    const { type, order } = event;

    if (type === 'name') {
      this.filteredProducts.sort((a, b) => {
        return order === 'asc' 
          ? a.name.localeCompare(b.name, undefined, { numeric: true }) 
          : b.name.localeCompare(a.name, undefined, { numeric: true });
      });
    } else if (type === 'price') {
      this.filteredProducts.sort((a, b) => {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
      });
    }
  }

  filterByPrice(maxPrice: number) {
    this.filteredProducts = this.products.filter(product => product.price <= maxPrice);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  removeFromCart(index: number) {
    this.cartService.removeFromCart(index);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
