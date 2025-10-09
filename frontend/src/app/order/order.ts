import { Component } from '@angular/core';
import { Commande } from '../interfaces/order.interface';
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
  commandes: Commande[] = [];
  loading = false;
  errorMsg = '';

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadCommandes();
  }

  loadCommandes() {
    this.loading = true;
    this.orderService.getCommandes().subscribe({
      next: (data) => {
        this.commandes = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMsg = "Impossible de charger les commandes.";
        this.loading = false;
      }
    });
  }

  submitOrder() {
    const newCmd: Commande = {
      id: this.commandes.length + 1,
      painChocolat: this.order.painChocolat,
      parisBrest: this.order.parisBrest,
    };
    this.commandes.push(newCmd);
    this.order = { painChocolat: 0, parisBrest: 0 };
  }

}
