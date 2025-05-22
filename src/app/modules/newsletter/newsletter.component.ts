import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent {
  email = '';
  genre = '';
  artist = '';

  constructor(private http: HttpClient, private dataService: DataService) {}

  subscribe() {
    const announcement = {
      email: this.email,
      musicGenre: this.genre,
      nameOfArtist: this.artist
    };

    this.dataService.sendAnnouncement(announcement).subscribe({
      next: (response) => {
        console.log('Announcement saved:', response);
        alert('Successfully subscribed!');
        this.clearForm();
      },
      error: (error) => {
        console.error('Error saving announcement:', error);
        alert('Something went wrong. Please try again.');
      }
    });

    console.log('Subscribed with:', {
      email: this.email,
      genre: this.genre,
      artist: this.artist
    });

    this.clearForm();
  }

  clearForm() {
    this.email = '';
    this.genre = '';
    this.artist = '';
  }
}
