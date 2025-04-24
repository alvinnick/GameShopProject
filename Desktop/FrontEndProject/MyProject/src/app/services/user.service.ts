// user.service.ts
import { SignupPage } from '../signup/signup.page';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private storageInitialized = false;
  private readonly USERS_KEY = 'users';

  constructor(private storage: Storage) {}

  async init() {
    if (!this.storageInitialized) {
      await this.storage.create();
      this.storageInitialized = true;
    }
  }

  async registerUser(userData: any) {
    await this.init();
    const users = await this.getUsers();
    users.push(userData);
    await this.storage.set(this.USERS_KEY, users);
  }

  async getUsers(): Promise<any[]> {
    await this.init();
    return (await this.storage.get(this.USERS_KEY)) || [];
  }

  async clearUsers() {
    await this.init();
    await this.storage.remove(this.USERS_KEY);
  }
}