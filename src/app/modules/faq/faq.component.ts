import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent {
  faqs = [
    {
      question: 'What is your return policy?',
      answer: 'You can return any item within 30 days of purchase with a valid receipt.',
      open: false
    },
    {
      question: 'How long does delivery take?',
      answer: 'Standard delivery takes 3-5 business days.',
      open: false
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship internationally to most countries.',
      open: false
    }
  ];

  toggle(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
