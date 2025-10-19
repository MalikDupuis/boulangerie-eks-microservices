import { Component } from '@angular/core';
import { OrderInterface } from '../interfaces/order.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service'; // ✅ à adapter si ton service a un autre nom
import { UserInterface } from '../interfaces/user.interface';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Order {

  order = { painChocolat: 0, parisBrest: 0, userId: 0 };
  orders: OrderInterface[] = [];
  users: UserInterface[] = []; // ✅ liste des utilisateurs
  loading = false;
  errorMsg = '';

  constructor(
    private orderService: OrderService,
    private userService: UserService // ✅
  ) {}

  ngOnInit() {
    this.loadOrders();
    this.loadUsers(); // ✅ charge les utilisateurs
  }

  loadOrders() {
    this.loading = true;
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = "Impossible de charger les commandes.";
        this.loading = false;
      }
    });
  }

  // ✅ charge les utilisateurs depuis ton API
  loadUsers() {
    this.userService.getAll().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error('Erreur chargement utilisateurs', err)
    });
  }

  submitOrder() {
    if (!this.order.userId) {
      alert("Veuillez sélectionner un utilisateur 👤");
      return;
    }

    const newCmd: OrderInterface = {
      painChocolat: this.order.painChocolat,
      parisBrest: this.order.parisBrest,
      userId: this.order.userId
    };

    this.orderService.createOrder(newCmd).subscribe({
      next: (saved: OrderInterface) => {
        this.orders.push(saved);
        this.order = { painChocolat: 0, parisBrest: 0, userId: 0 };
      },
      error: (err) => {
        console.error('Erreur création commande', err);
      }
    });
  }
}
