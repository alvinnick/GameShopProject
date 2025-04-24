import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  async registerUser(userData: any) {
    await this._storage?.set('user', userData);
  }

  async getUser() {
    return await this._storage?.get('user');
  }
}