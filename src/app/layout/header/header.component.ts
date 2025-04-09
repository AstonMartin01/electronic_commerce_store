import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() filter = new EventEmitter<number>();
  @Output() sort = new EventEmitter<{ type: 'name' | 'price', order: 'asc' | 'desc' }>();
  sortBy: 'name' | 'price' | null = null;
  sortOrderName: 'asc' | 'desc' = 'asc';
  sortOrderPrice: 'asc' | 'desc' = 'asc';

  sortNameOrder: 'asc' | 'desc' = 'asc';
  sortPriceOrder: 'asc' | 'desc' = 'asc'; // Separate toggle state for price sorting
  selectedPrice: number = 10000;

  sortProductsByName() {
    this.sortBy = 'name';
    this.sortOrderName = this.sortOrderName === 'asc' ? 'desc' : 'asc';
    this.sort.emit({ type: 'name', order: this.sortOrderName });
  }

  sortProductsByPrice() {
    this.sortBy = 'price';
    this.sortOrderPrice = this.sortOrderPrice === 'asc' ? 'desc' : 'asc';
    this.sort.emit({ type: 'price', order: this.sortOrderPrice });
  }

  filterByPrice(event: Event) {
    this.selectedPrice = Number((event.target as HTMLInputElement).value);
    this.filter.emit(this.selectedPrice);
  }
}
