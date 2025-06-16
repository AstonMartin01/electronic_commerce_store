import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError } from 'rxjs';
import { ProductFeedback } from 'src/app/core/models/product-feedback.model';
import { DataService } from 'src/app/core/services/data.service';

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

  constructor(private http: HttpClient, private dataService: DataService) {}
  
  ngOnInit(): void {
    this.getFeedbacks();
  }

  onSubmit(): void {
    const feedback = {
      clientName: this.clientName,
      message: this.message,
      rating: this.rating,
      dateOfEvent: this.dateOfEvent
    };

    if (this.clientName.trim() && this.message.trim() && this.rating != 0 && this.dateOfEvent.trim()) {
      // this.feedbacks.push({ clientName: this.clientName.trim(), message: this.message.trim(), rating: this.rating, dateOfEvent: this.dateOfEvent.trim() });
      this.dataService.sendProductFeedback(feedback).subscribe({
        next: (response) => {
          console.log('Feedback saved:', response);
          this.getFeedbacks();
          alert('Successfully subscribed!');          
        },
        error: (error) => {
          console.error('Error saving feedback:', error);
          alert('Something went wrong. Please try again.');
        }
      });
      this.clearForm();
    }
  }  

  clearForm() {
    this.clientName = '';
    this.message = '';
    this.rating = 1;      
    this.dateOfEvent = '';
  }

  getFeedbacks() {
    this.dataService.getProductFeedbacks().pipe(
      catchError(error => {
        // console.error('Database fetch failed. Using mock data.', error);
        return this.dataService.getProductFeedbacksMock();
      })
    ).subscribe({
    next: (data) => {
      this.feedbacks = data;
      this.isLoading = false;
    },
    error: (err) => {
      this.error = 'Failed to load feedbacks.';
      this.isLoading = false;
    }});
  }
}
