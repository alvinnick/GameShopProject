// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { CartService } from '../services/cart.service';
// import { Router } from '@angular/router';
// import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,IonCardTitle, IonHeader, IonToolbar, IonTitle, IonContent,IonButton, IonIcon, IonButtons, IonBadge, IonModal, IonList,IonItem, IonLabel, IonThumbnail, IonNote,IonBackButton} from '@ionic/angular/standalone';

// @Component({
//   selector: 'app-game-details',
//   templateUrl: './game-details.page.html',
//   styleUrls: ['./game-details.page.scss'],
//   standalone: true,
//   imports: [ IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,IonCardTitle, CommonModule, IonHeader, IonToolbar,IonTitle, IonContent, IonButton, IonIcon, IonButtons,IonBadge, IonModal, IonList, IonItem, IonLabel,IonThumbnail, IonNote,IonBackButton  ] // Modules imported for use in this component
// })
// export class GameDetailsPage implements OnInit {
//   game: any;

//   constructor(
//     private router: Router,
//     private cartService: CartService
//   ) {}

//   ngOnInit() {
//     const navigation = this.router.getCurrentNavigation();
//     if (navigation?.extras?.state) {
//       this.game = navigation.extras.state['game'];
//     }
//   }

//   addToCart(game: any) {
//     this.cartService.addToCart(game);
//     this.router.navigate(['/cart']);
//   }
//   goBack() {
//     this.router.navigate(['/home']);
//   }

// }
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
}

