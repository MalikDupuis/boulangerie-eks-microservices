import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderInterface } from '../interfaces/order.interface';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/users'; 
  //private apiUrl = 'http://localhost:8082/api/users';


  constructor(private http: HttpClient) {}

  register(user: UserInterface) {
  return this.http.post(`${this.apiUrl}`, user);
}

    getAll(): Observable<UserInterface[]>{
        return this.http.get<UserInterface[]>(`${this.apiUrl}/all`);
    }
  
}
