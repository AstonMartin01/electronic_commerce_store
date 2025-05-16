import { Component } from '@angular/core';

@Component({
  selector: 'app-product-feedback',
  templateUrl: './product-feedback.component.html',
  styleUrls: ['./product-feedback.component.css']
})
export class ProductFeedbackComponent {
  name = '';
  message = '';
  rating = 1;
  date = '';
  feedbackList: { name: string, rating: number, message: string, date: string } [] = [
    { name: 'John Doe', rating: 5, message: 'Excellent product!', date: '2025-05-10' },
    { name: 'Alex Johnson', rating: 3, message: 'Average quality for the price.', date: '2025-05-12' },
    { name: 'Jane Smith', rating: 4, message: 'Very good, but delivery was slow.', date: '2025-05-11' }
  ];

  onSubmit(): void {
    if (this.name.trim() && this.message.trim() && this.rating != 0 && this.date.trim()) {
      this.feedbackList.push(
        { name: this.name.trim(), message: this.message.trim(), rating: this.rating, date: this.date.trim() }
      );
      this.clearForm();
    }

    this.clearForm();
  }  

  clearForm() {
    this.name = '';
    this.message = '';
    this.rating = 1;      
    this.date = '';
  }
}
