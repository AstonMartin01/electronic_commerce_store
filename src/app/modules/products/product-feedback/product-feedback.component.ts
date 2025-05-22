import { Component } from '@angular/core';
import { DataService, ProductFeedback } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-product-feedback',
  templateUrl: './product-feedback.component.html',
  styleUrls: ['./product-feedback.component.css']
})
export class ProductFeedbackComponent {
  clientName = '';
  message = '';
  rating = 1;
  dateOfEvent = '';
  // feedbacks: { clientName: string, rating: number, message: string, dateOfEvent: string } [] = [
  //   { clientName: 'John Doe', rating: 5, message: 'Excellent product!', dateOfEvent: '2025-05-10' },
  //   { clientName: 'Alex Johnson', rating: 3, message: 'Average quality for the price.', dateOfEvent: '2025-05-12' },
  //   { clientName: 'Jane Smith', rating: 4, message: 'Very good, but delivery was slow.', dateOfEvent: '2025-05-11' }
  // ];
  feedbacks: ProductFeedback[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private dataService: DataService) {}
  
  ngOnInit(): void {
  this.dataService.getProductFeedbacks().subscribe({
    next: (data) => {
      this.feedbacks = data;
      this.isLoading = false;
    },
    error: (err) => {
      this.error = 'Failed to load feedbacks.';
      this.isLoading = false;
    }});
  }

  onSubmit(): void {
    if (this.clientName.trim() && this.message.trim() && this.rating != 0 && this.dateOfEvent.trim()) {
      this.feedbacks.push(
        { clientName: this.clientName.trim(), message: this.message.trim(), rating: this.rating, dateOfEvent: this.dateOfEvent.trim() }
      );
      this.clearForm();
    }

    this.clearForm();
  }  

  clearForm() {
    this.clientName = '';
    this.message = '';
    this.rating = 1;      
    this.dateOfEvent = '';
  }
}
