// Angular and Ionic core imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Ionic components used in the template
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
  IonThumbnail, IonLabel, IonButton, IonIcon, IonBackButton,
  IonButtons, IonNote 
} from '@ionic/angular/standalone';

// Service for managing game-related data (not directly used here)
import { GameService } from './../services/game-service.service';

// Angular common module for structural directives like *ngIf and *ngFor
import { CommonModule } from '@angular/common';

// Import and register Ionicons
import { addIcons } from 'ionicons';
import { trash, cartOutline } from 'ionicons/icons';

// Custom service for handling cart operations
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true, // Enables the use of this component without needing a module
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  imports: [
    // Declare the necessary modules and components for the template
    CommonModule, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonList, IonItem, IonThumbnail,
    IonLabel, IonButton, IonIcon, IonBackButton,
    IonButtons, IonNote
  ],
})
export class CartPage implements OnInit {
  // Holds the list of items in the cart
  cartItems: any[] = [];

  constructor(
    private router: Router, // Used for navigation
    private cartService: CartService // Injecting the cart service
  ) {
    // Register icons to be used in the template
    addIcons({ trash, cartOutline });
  }

  // Called when the component initializes
  ngOnInit() {
    // Load items from the cart service
    this.cartItems = this.cartService.getCartItems();
  }

  // Removes an item from the cart and refreshes the list
  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getCartItems(); // Update the list
  }

  // Returns the total cost of items in the cart
  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

  // Navigates back to the home page
  goBack() {
    this.router.navigate(['/home']);
  }
}
