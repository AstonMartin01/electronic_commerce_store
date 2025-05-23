import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

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

  getProducts(): Observable<any[]> {
    // const apiUrl = './assets/mock-products.json';  // Mock data location
    const apiUrl = 'https://localhost:44352/ecommerce/products';
    return this.http.get<any[]>(apiUrl);
  }

  sendAnnouncement(announcement: Announcement): Observable<any> {
    const apiUrl = 'https://localhost:44352/ecommerce/save-announcement';
    return this.http.post(apiUrl, announcement);
  }

  sendGlobalFeedback(feedback: GlobalFeedback): Observable<any> {
    const apiUrl = 'https://localhost:44352/ecommerce/save-global-feedback';
    return this.http.post(apiUrl, feedback);
  }

  sendProductFeedback(feedback: ProductFeedback): Observable<any> {
    const apiUrl = 'https://localhost:44352/ecommerce/save-product-feedback';
    return this.http.post(apiUrl, feedback);
  }

  getProductById(id: number): Observable<any> {
    return this.getProducts().pipe(
      map((products: any[]) => products.find(product => product.id === id))
    );
  }

  editProduct(product: any): Observable<any> {
    const apiUrl = 'https://localhost:44352/ecommerce/edit-product';
    return this.http.put(apiUrl, product);
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