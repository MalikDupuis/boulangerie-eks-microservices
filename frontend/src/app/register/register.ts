import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserInterface } from '../interfaces/user.interface';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  user:UserInterface = {
    username: '',
    password: '',
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onRegister() {
    if (!this.user.username || !this.user.password) {
      alert("Veuillez remplir tous les champs 🍰");
      return;
    }

    this.userService.register(this.user).subscribe({
      next: () => {
        alert("Compte créé avec succès 🎉");
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        alert("Erreur lors de la création du compte ❌");
      }
    });
  }

}
