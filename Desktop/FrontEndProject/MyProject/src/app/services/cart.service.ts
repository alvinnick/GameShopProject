import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  addToCart(game: any) {
    const currentItems = [...this.cartItemsSubject.value]; // Create new array
    const existingItem = currentItems.find(item => item.id === game.id);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentItems.push({...game, quantity: 1});
    }
    
    this.cartItemsSubject.next(currentItems); // Emit the new array
  }

  removeFromCart(item: any) {
    const currentItems = [...this.cartItemsSubject.value]; // Create new array
    const index = currentItems.findIndex(cartItem => cartItem.id === item.id);
    
    if (index !== -1) {
      if (currentItems[index].quantity > 1) {
        currentItems[index].quantity--;
      } else {
        currentItems.splice(index, 1);
      }
      this.cartItemsSubject.next(currentItems); // Emit the new array
    }
  }

  getCartItems() {
    return [...this.cartItemsSubject.value]; // Return a copy
  }

  getCartTotal() {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + (parseFloat(item.salePrice) * item.quantity), 0
    );
  }

  clearCart() {
    this.cartItemsSubject.next([]);
  }
}