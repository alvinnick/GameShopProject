// user.service.ts

import { SignupPage } from '../signup/signup.page';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root' // Makes the service globally available across the app
})
export class UserService {
  private storageInitialized = false; // Tracks whether storage has been initialized
  private readonly USERS_KEY = 'users'; // Key to store/retrieve users from storage

  constructor(private storage: Storage) {}

  // Initializes Ionic Storage if it hasn't been initialized yet
  async init() {
    if (!this.storageInitialized) {
      await this.storage.create(); // Creates the storage engine
      this.storageInitialized = true;
    }
  }

  // Registers a new user and saves them in local storage
  async registerUser(userData: any) {
    await this.init(); // Ensure storage is ready
    const users = await this.getUsers(); // Get existing users
    users.push(userData); // Add the new user
    await this.storage.set(this.USERS_KEY, users); // Save updated user list
  }

  // Retrieves all registered users from storage
  async getUsers(): Promise<any[]> {
    await this.init(); 
    return (await this.storage.get(this.USERS_KEY)) || []; // Return existing users or empty array
  }

  // Clears all users from storage
  async clearUsers() {
    await this.init(); 
    await this.storage.remove(this.USERS_KEY); // Remove the users data
  }
}
