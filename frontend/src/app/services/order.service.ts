import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderInterface } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = '/api/orders'; 

  constructor(private http: HttpClient) {}

  getOrders(): Observable<OrderInterface[]> {
    return this.http.get<OrderInterface[]>(this.apiUrl);
  }

  createOrder(commande: OrderInterface): Observable<OrderInterface> {
    return this.http.post<OrderInterface>(this.apiUrl, commande);
  }
}
