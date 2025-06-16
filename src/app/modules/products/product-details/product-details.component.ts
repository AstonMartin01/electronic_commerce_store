import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any;

  constructor(private route: ActivatedRoute, private dataService: DataService, private cartService: CartService,) {}

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getProductById(productId)
    .pipe(
      catchError(error => {
        // console.error('Database fetch failed. Using mock data.', error);
        return this.dataService.getProductMockById(productId);
      })
    )
    .subscribe((data) => {
      this.product = data;
    });
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
