import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getGlobalFeedbacks(): Observable<GlobalFeedback[]> {
    const apiUrl = 'https://localhost:44352/ecommerce/global-feedbacks';
    return this.http.get<GlobalFeedback[]>(apiUrl);
  }

  getProductFeedbacks(): Observable<ProductFeedback[]> {
    const apiUrl = 'https://localhost:44352/ecommerce/product-feedbacks';
    return this.http.get<ProductFeedback[]>(apiUrl);
  }

  getAnnouncements(): Observable<Announcement[]> {
    const apiUrl = 'https://localhost:44352/ecommerce/announcements';
    return this.http.get<Announcement[]>(apiUrl);
  }
}

export interface GlobalFeedback {  
  clientName: string;
  message: string;
}

export interface ProductFeedback {  
  clientName: string;
  message: string;
  rating: number;
  dateOfEvent: string;
}

export interface Announcement {  
  email: string;
  musicGenre: string;
  nameOfArtist: string;
}