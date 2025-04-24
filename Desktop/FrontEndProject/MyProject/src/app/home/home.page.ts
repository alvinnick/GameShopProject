import { Component, OnInit } from '@angular/core';
import { GameService } from './../services/game-service.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,IonCardTitle, IonHeader, IonToolbar, IonTitle, IonContent,IonButton, IonIcon, IonButtons, IonBadge, IonModal, IonList,IonItem, IonLabel, IonThumbnail, IonNote} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { cart, trash, cartOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [ IonCard, IonCardContent, IonCardHeader,IonCardTitle, CommonModule, IonHeader, IonToolbar,IonTitle, IonContent, IonButton, IonIcon, IonButtons,IonBadge,RouterModule ] // Modules imported for use in this component
})
export class HomePage implements OnInit {
  games: any[] = [];
  cartItemCount: number = 0;

  constructor(
    private gameService: GameService, 
    private router: Router,
    private cartService: CartService
  ) {
    addIcons({ cart });
  }

  ngOnInit() {
    this.gameService.getGames().subscribe((data) => {
      this.games = data;
    });

    this.cartService.cartItems$.subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  addToCart(game: any) {
    this.cartService.addToCart(game);
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  viewDescription(game: any) {
    this.router.navigate(['/game-details'], { 
      state: { game } 
    });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

}
