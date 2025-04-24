import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent,IonList, IonItem,IonThumbnail, IonLabel, IonButton, IonIcon, IonBackButton, IonButtons,IonNote} from '@ionic/angular/standalone';
import { GameService } from './../services/game-service.service';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { trash, cartOutline } from 'ionicons/icons';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonList, IonItem, IonThumbnail,
    IonLabel, IonButton, IonIcon, IonBackButton,
    IonButtons, IonNote
  ],
})
export class CartPage implements OnInit {
  cartItems: any[] = [];

  constructor(
    private router: Router,
    private cartService: CartService
  ) {
    addIcons({ trash, cartOutline });
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
    // Refresh the cart items
    this.cartItems = this.cartService.getCartItems();
  }

  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

  goBack() {
    this.router.navigate(['/home']);
  }

}
