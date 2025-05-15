import { Component } from '@angular/core';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent {
  email = '';
  genre = '';
  artist = '';

  subscribe() {
    console.log('Subscribed with:', {
      email: this.email,
      genre: this.genre,
      artist: this.artist
    });

    // Optionally clear form
    this.email = '';
    this.genre = '';
    this.artist = '';
  }
}
