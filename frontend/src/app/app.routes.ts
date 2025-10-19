import { Routes } from '@angular/router';
import { Order } from './order/order';
import { Register } from './register/register';

export const routes: Routes = [
    { path: '', component: Order },
    { path: 'register', component: Register }
];
