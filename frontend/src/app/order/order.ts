import { Component } from '@angular/core';
import { OrderInterface } from '../interfaces/order.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Order {

  order = { painChocolat: 0, parisBrest: 0 };
  orders: OrderInterface[] = [];
  loading = false;
  errorMsg = '';

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = "Impossible de charger les Orders.";
        this.loading = false;
      }
    });
  }

  submitOrder() {
    const newCmd: OrderInterface = {
      painChocolat: this.order.painChocolat,
      parisBrest: this.order.parisBrest,
      userId: 1
    };
    this.orders.push(newCmd);
    this.order = { painChocolat: 0, parisBrest: 0 };
    this.orderService.createOrder(newCmd as OrderInterface).subscribe({
      next: (saved: OrderInterface) => {
        // saved contient l'ID généré côté backend
        this.orders.push(saved);
        this.order = { painChocolat: 0, parisBrest: 0 };
        
      },
      error: (err) => {
        console.error('Erreur création commande', err);
      }
    });
  }

}
