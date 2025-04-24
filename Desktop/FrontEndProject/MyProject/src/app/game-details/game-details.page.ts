import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

// Ionic component imports for UI elements
import { 
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonBackButton, IonButtons, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonItem, IonLabel,
  IonNote, IonImg, IonButton, IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';

// Common utilities and pipes for formatting
import { CommonModule, DatePipe } from '@angular/common';
import { CurrencyPipe, PercentPipe } from '@angular/common';

// Capacitor Share API for native sharing functionality
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-game-details',
  standalone: true,
  templateUrl: './game-details.page.html',
  styleUrls: ['./game-details.page.scss'],
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle,
    IonContent, IonBackButton, IonButtons, IonCard,
    IonCardHeader, IonCardTitle, IonCardContent, IonItem,
    IonLabel, IonNote, IonImg, IonButton, IonGrid,
    IonRow, IonCol, DatePipe, CurrencyPipe, PercentPipe
  ],
})
export class GameDetailsPage implements OnInit {
  // Game object to hold details passed from previous page
  game: any;

  constructor(
    private router: Router,             // Used for navigation
    private cartService: CartService   // Injects cart functionality
  ) {}

  ngOnInit() {
    // Retrieve the passed game object from navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.game = navigation.extras.state['game'];
    }
  }

  // Adds the game to the cart and navigates to the cart page
  addToCart(game: any) {
    this.cartService.addToCart(game);
    this.router.navigate(['/cart']);
  }

  // Shares the game details using the device's native share feature
  async shareGame() {
    try {
      await Share.share({
        title: this.game.title,
        text: `Check out ${this.game.title} for only $${this.game.salePrice}`,
        url: this.game.thumb, // Can be updated to use a specific link
        dialogTitle: 'Share this game'
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }
}

