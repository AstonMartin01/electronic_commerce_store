import { Component } from '@angular/core';

@Component({
  selector: 'app-global-feedbacks',
  templateUrl: './global-feedbacks.component.html',
  styleUrls: ['./global-feedbacks.component.css']
})
export class GlobalFeedbacksComponent {
  name = '';
  message = '';
  feedbacks: { name: string, message: string } [] = [
    { name: 'Victor', message: 'The most durable hardware and devices!' },
    { name: 'Mihai', message: 'Prompt and professional delivery!' },
    { name: 'Andrei', message: 'Foarte multumit!' },
    { name: 'Alexander', message: 'The top services on the market' },
    { name: 'Vali', message: "Prompt customer support!" }
  ];

  onSubmit(): void {
    if (this.name.trim() && this.message.trim()) {
      this.feedbacks.push({ name: this.name.trim(), message: this.message.trim() });
      this.clearForm();
    }

    this.clearForm();
  }

  clearForm() {
    this.name = '';
    this.message = '';
  }
}
