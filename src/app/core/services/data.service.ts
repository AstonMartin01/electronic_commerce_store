import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { GlobalFeedback } from '../models/global-feedback.model';
import { ProductFeedback } from '../models/product-feedback.model';
import { Announcement } from '../models/announcement.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  getGlobalFeedbacks(): Observable<GlobalFeedback[]> {
    const apiUrl = "https://localhost:44352/ecommerce/global-feedbacks";
    return this.http.get<GlobalFeedback[]>(apiUrl);
  }

  getGlobalFeedbacksMock(): Observable<GlobalFeedback[]> {    
    const apiUrl = "assets/data/global-feedbacks.json";
    return this.http.get<GlobalFeedback[]>(apiUrl);
  }

  getProductFeedbacks(): Observable<ProductFeedback[]> {
    const apiUrl = "https://localhost:44352/ecommerce/product-feedbacks";
    return this.http.get<ProductFeedback[]>(apiUrl);
  }

  getProductFeedbacksMock(): Observable<ProductFeedback[]> {
    const apiUrl = "assets/data/product-feedbacks.json";
    return this.http.get<ProductFeedback[]>(apiUrl);
  }

  getAnnouncements(): Observable<Announcement[]> {
    const apiUrl = "https://localhost:44352/ecommerce/announcements";
    return this.http.get<Announcement[]>(apiUrl);
  }

  getAnnouncementsMock(): Observable<Announcement[]> {
    const apiUrl = "assets/data/announcements.json";
    return this.http.get<Announcement[]>(apiUrl);
  }  

  getProducts(): Observable<Product[]> {
    const apiUrl = "https://localhost:44352/ecommerce/products";
    return this.http.get<Product[]>(apiUrl);
  }

  getProductsMock(): Observable<Product[]> {
    const apiUrl = "assets/data/products.json";
    return this.http.get<Product[]>(apiUrl);
  }

  sendAnnouncement(announcement: Announcement): Observable<any> {
    const apiUrl = "https://localhost:44352/ecommerce/announcement";
    return this.http.post(apiUrl, announcement);
  }

  sendGlobalFeedback(feedback: GlobalFeedback): Observable<GlobalFeedback> {
    const apiUrl = "https://localhost:44352/ecommerce/global-feedback";
    return this.http.post<GlobalFeedback>(apiUrl, feedback);
  }

  sendProductFeedback(feedback: ProductFeedback): Observable<any> {
    const apiUrl = "https://localhost:44352/ecommerce/product-feedback";
    return this.http.post(apiUrl, feedback);
  }

  getProductById(id: number): Observable<any> {
    return this.getProducts().pipe(
      map((products: any[]) => products.find(product => product.id === id))
    );
  }

  getProductMockById(id: number): Observable<any> {
    return this.getProductsMock().pipe(
      map((products: any[]) => products.find(product => product.id === id))
    );
  }  

  editProduct(product: any): Observable<any> {
    const apiUrl = "https://localhost:44352/ecommerce/edit-product";
    return this.http.put(apiUrl, product);
  }

  registerUser(user: any): Observable<any> {
    const apiUrl = "https://localhost:44352/ecommerce/account/register";
    return this.http.post(apiUrl, user);
  }

  loginUser(user: any): Observable<any> {
    const apiUrl = "https://localhost:44352/ecommerce/account/login";
    return this.http.post(apiUrl, user);
  }

  getUser(token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const apiUrl = "https://localhost:44352/ecommerce/account/user-info";
    return this.http.get<any>(`${apiUrl}`, { headers });
  }

  setToken(token: any): void {
    localStorage.setItem('token', token);
  }

  getToken(): any {
    return localStorage.getItem('token');
  }
}