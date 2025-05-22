import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService, GlobalFeedback } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-global-feedbacks',
  templateUrl: './global-feedbacks.component.html',
  styleUrls: ['./global-feedbacks.component.css']
})
export class GlobalFeedbacksComponent implements OnInit{
  clientName = '';
  message = '';
  // feedbacks: { clientName: string, message: string } [] = [
  //   { clientName: 'Victor', message: 'The most durable hardware and devices!' },
  //   { clientName: 'Mihai', message: 'Prompt and professional delivery!' },
  //   { clientName: 'Andrei', message: 'Foarte multumit!' },
  //   { clientName: 'Alexander', message: 'The top services on the market' },
  //   { clientName: 'Vali', message: "Prompt customer support!" }
  // ];
  feedbacks: GlobalFeedback[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private http: HttpClient, private dataService: DataService) {}

  ngOnInit(): void {
    this.getFeedbacks();
  }

  onSubmit(): void {
    const feedback = {
      clientName: this.clientName,
      message: this.message
    };

    if (this.clientName.trim() && this.message.trim()) {
      // this.feedbacks.push({ clientName: this.clientName.trim(), message: this.message.trim() });      
      this.dataService.sendGlobalFeedback(feedback).subscribe({
      
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

  getFeedbacks() {
    this.dataService.getGlobalFeedbacks().subscribe({
    next: (data) => {
      this.feedbacks = data;
      this.isLoading = false;
    },
    error: (err) => {
      this.error = 'Failed to load feedbacks.';
      this.isLoading = false;
    }});
  }

  clearForm() {
    this.clientName = '';
    this.message = '';
  }
}
