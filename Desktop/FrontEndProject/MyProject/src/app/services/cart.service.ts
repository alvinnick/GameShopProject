import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes the service available app-wide
})
export class CartService {
  // BehaviorSubject to hold and emit the current cart items
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  // Observable to expose cart data to components
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  // Adds a game to the cart
  addToCart(game: any) {
    const currentItems = [...this.cartItemsSubject.value]; // Clone current cart items
    const existingItem = currentItems.find(item => item.id === game.id); // Check if item exists

    if (existingItem) {
      // If it exists, just increase the quantity
      existingItem.quantity++;
    } else {
      // If not, add it with quantity 1
      currentItems.push({ ...game, quantity: 1 });
    }

    // Update the cart items
    this.cartItemsSubject.next(currentItems);
  }

  // Removes one quantity or the whole item from the cart
  removeFromCart(item: any) {
    const currentItems = [...this.cartItemsSubject.value]; // Clone current cart items
    const index = currentItems.findIndex(cartItem => cartItem.id === item.id); // Find item index

    if (index !== -1) {
      if (currentItems[index].quantity > 1) {
        // Decrease quantity if more than one
        currentItems[index].quantity--;
      } else {
        // Remove item if quantity is 1
        currentItems.splice(index, 1);
      }
      // Update the cart items
      this.cartItemsSubject.next(currentItems);
    }
  }

  // Returns a shallow copy of the current cart items
  getCartItems() {
    return [...this.cartItemsSubject.value];
  }

  // Calculates total price of items in the cart
  getCartTotal() {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + (parseFloat(item.salePrice) * item.quantity), 0
    );
  }

  // Clears all items from the cart
  clearCart() {
    this.cartItemsSubject.next([]);
  }
}
