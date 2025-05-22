import { Component, OnInit } from '@angular/core';
import { DataService, GlobalFeedback } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-global-feedbacks',
  templateUrl: './global-feedbacks.component.html',
  styleUrls: ['./global-feedbacks.component.css']
})
export class GlobalFeedbacksComponent implements OnInit{
  name = '';
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

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
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

  onSubmit(): void {
    if (this.name.trim() && this.message.trim()) {
      this.feedbacks.push({ clientName: this.name.trim(), message: this.message.trim() });
      this.clearForm();
    }

    this.clearForm();
  }

  clearForm() {
    this.name = '';
    this.message = '';
  }
}
