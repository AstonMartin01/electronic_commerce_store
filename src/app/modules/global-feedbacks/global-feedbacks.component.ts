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
    { name: 'Victor', message: 'Amazing drinks and cozy vibe!' },
    { name: 'Mihai', message: 'Great food, service and location!' },
    { name: 'Andrei', message: 'Salutari din Ro, vom reveni cu placere!' },
    { name: 'Alexander', message: 'Best meatballs ever!' },
    { name: 'Vali', message: "Sar'na pt masa!" }
  ];

  submitFeedback(event: Event): void {
    event.preventDefault();

    if (this.name.trim() && this.message.trim()) {
      this.feedbacks.push({ name: this.name.trim(), message: this.message.trim() });
      this.name = '';
      this.message = '';
    }

    // Optionally clear form
    this.name = '';
    this.message = '';
  }
}
