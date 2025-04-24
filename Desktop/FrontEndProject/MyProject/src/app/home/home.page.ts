import { Component, OnInit } from '@angular/core';
import { GameService } from './../services/game-service.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

// Ionic components for building UI
import { 
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonButtons, IonBadge,
  IonModal, IonList, IonItem, IonLabel, IonThumbnail, IonNote
} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { cart, trash, cartOutline } from 'ionicons/icons'; // Icons used in the UI
import { RouterModule } from '@angular/router';
import { Share } from '@capacitor/share'; // Native sharing capability

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [ 
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, 
    CommonModule, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonButton, IonIcon, IonButtons, 
    IonBadge, RouterModule 
  ] // Modules imported for use in this component
})
export class HomePage implements OnInit {
  games: any[] = [];            // Array to store the list of games
  cartItemCount: number = 0;    // Total quantity of items in cart


  
  constructor(
    private gameService: GameService,   // Service to fetch games
    private router: Router,             // Router for navigation
    private cartService: CartService    // Service for cart operations
  ) {
    // Add custom icons for use in the component
    addIcons({ cart });
  }

  ngOnInit() {
    // Subscribe to the game service to fetch game data
    this.gameService.getGames().subscribe((data) => {
      this.games = data;
    });

    // Subscribe to cart item changes and calculate the total count
    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  // Adds selected game to the cart
  addToCart(game: any) {
    this.cartService.addToCart(game);
  }

  // Navigate to the cart page
  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  // Navigate to game details page with the selected game
  viewDescription(game: any) {
    this.router.navigate(['/game-details'], { 
      state: { game } 
    });
  }

  // Navigate to signup page
  goToSignup() {
    this.router.navigate(['/signup']);
  }

  // Share game details using native sharing options
  async shareGame(game: any) {
    try {
      await Share.share({
        title: game.title,
        text: `Check out "${game.title}" for $${game.salePrice}`,
        url: game.thumb, // or use a full product/game page URL
        dialogTitle: 'Share this game'
      });
    } catch (error) {
      console.log('User cancelled share', error);
    }
  }
}
