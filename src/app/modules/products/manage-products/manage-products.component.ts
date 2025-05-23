import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  editingProduct: any = null;
  products: any[] = [];  
  filteredProducts: any[] = [];
  searchQuery: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = [...this.products];
    });
  }

  enableEdit(product: any) {
    this.editingProduct = { ...product };
  }

  cancelEdit() {
    this.editingProduct = null;
  }

  saveEdit() {
    this.dataService.editProduct(this.editingProduct).subscribe(() => {
      const index = this.filteredProducts.findIndex(p => p.id === this.editingProduct.id);
      this.filteredProducts[index] = { ...this.editingProduct };
      this.editingProduct = null;
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
    } 
    else if (type === 'price') {
      this.filteredProducts.sort((a, b) => {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
      });
    }
  }

  filterByPrice(maxPrice: number) {
    this.filteredProducts = this.products.filter(product => product.price <= maxPrice);
  }

  searchProducts(query: string): void {
    this.searchQuery = query;
    this.applyAllFilters();
  }

  applyAllFilters(): void {
    let result = [...this.products];

    if (this.searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(this.searchQuery) ||
        p.description?.toLowerCase().includes(this.searchQuery) ||
        p.price?.toString().toLowerCase().includes(this.searchQuery)
      );
    }

    this.filteredProducts = result;
  }
}
