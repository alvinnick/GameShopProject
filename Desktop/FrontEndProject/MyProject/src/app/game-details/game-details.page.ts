import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonBackButton, IonButtons, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonItem, IonLabel,
  IonNote, IonImg, IonButton, IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';
import { CommonModule, DatePipe } from '@angular/common';
import { CurrencyPipe, PercentPipe } from '@angular/common';
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
  game: any;

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.game = navigation.extras.state['game'];
    }
  }

  addToCart(game: any) {
    this.cartService.addToCart(game);
    this.router.navigate(['/cart']);
  }

  async shareGame() {
    try {
      await Share.share({
        title: this.game.title,
        text: `Check out ${this.game.title} for only $${this.game.salePrice}`,
        url: this.game.thumb, // or your game's URL
        dialogTitle: 'Share this game'
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  }
}

