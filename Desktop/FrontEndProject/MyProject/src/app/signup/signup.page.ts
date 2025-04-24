import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton,IonBackButton,IonButtons,IonCardContent,IonCard,IonCardHeader,IonCardTitle,IonItem,IonLabel,IonAlert} from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonButton,IonBackButton,IonButtons,IonCardContent,IonCard,IonCardHeader,IonCardTitle,IonItem,IonContent,IonLabel,IonAlert]
})
export class SignupPage implements OnInit{
  
  user = {
    username: '',
    email: '',
    password: ''
  };

  showSuccessAlert = false;

  constructor(
    //private userService: UserService,
    private router: Router
  ) {}

  signUp() {
    try {

      //this.userService.registerUser(this.user);
      this.showSuccessAlert = true;

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);
      
    } catch (error) {
      console.error('Registration error:', error);
    }
  }

    // Lifecycle hook triggered on component initialization
    ngOnInit() {
    }

  
}

