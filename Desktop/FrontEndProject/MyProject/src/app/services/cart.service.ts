import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes this service available app-wide
})
export class CartService {
  // BehaviorSubject to hold the cart state and emit changes
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  
  // Observable that components can subscribe to for cart updates
  cartItems$ = this.cartItemsSubject.asObservable();

  //Adds a game to the cart or increments quantity if already exists
  addToCart(game: any) {
    // Get current cart items (creating a new array reference)
    const currentItems = [...this.cartItemsSubject.value];
    
    // Check if game already exists in cart using gameID
    const existingItem = currentItems.find(item => item.gameID === game.gameID);
    
    if (existingItem) {
      // Increment quantity if game already in cart
      existingItem.quantity++;
    } else {
      // Add new game to cart with initial quantity of 1
      currentItems.push({
        ...game, // Spread operator copies all game properties
        quantity: 1 // Add quantity property
      });
    }
    
    // Emit the new cart state to all subscribers
    this.cartItemsSubject.next(currentItems);
  }

   // Removes a game from cart or decrements quantity
  removeFromCart(game: any) {
    // Get current cart items (creating a new array reference)
    const currentItems = [...this.cartItemsSubject.value];
    
    // Find index of game in cart using gameID
    const index = currentItems.findIndex(item => item.gameID === game.gameID);
    
    if (index !== -1) { // If game exists in cart
      if (currentItems[index].quantity > 1) {
        // Decrement quantity if more than 1
        currentItems[index].quantity--;
      } else {
        // Remove item completely if quantity is 1
        currentItems.splice(index, 1);
      }
      // Emit the new cart state
      this.cartItemsSubject.next(currentItems);
    }
  }

   // Gets current cart items
  getCartItems() {
    // Return copy of cart items to prevent direct modification
    return [...this.cartItemsSubject.value];
  }

    
    //Calculates total price of all items in cart
    //Total cart value as number

  getCartTotal() {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + (parseFloat(item.salePrice) * item.quantity, 0)
    );
  }

  //Clears all items from cart
  clearCart() {
    // Emit empty array to clear cart
    this.cartItemsSubject.next([]);
  }
}
