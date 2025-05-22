import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() filter = new EventEmitter<number>();
  @Output() sort = new EventEmitter<{ type: 'name' | 'price', order: 'asc' | 'desc' }>();
  @Output() search = new EventEmitter<string>(); // Optional: only if you want to emit
  sortBy: 'name' | 'price' | null = null;
  sortOrderName: 'asc' | 'desc' = 'asc';
  sortOrderPrice: 'asc' | 'desc' = 'asc';

  sortNameOrder: 'asc' | 'desc' = 'asc';
  sortPriceOrder: 'asc' | 'desc' = 'asc'; // Separate toggle state for price sorting
  selectedPrice: number = 10000;
  searchQuery: string = '';

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

  onSearch() {
    this.search.emit(this.searchQuery); // Optional use of @Output
    // Alternatively: Apply local filtering logic here
  }  
}
