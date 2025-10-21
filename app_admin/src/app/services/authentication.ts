import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { PetData } from '../services/pet-data';

@Injectable({
  providedIn: 'root'
})
export class Authentication {
  // setup storage and service access
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private petData: PetData
  ) {}

  // variable to handle authentication responses
  authResp: AuthResponse = new AuthResponse();

  // Get ticket from Storage provider
  // token name is pet-token
  public getToken(): string {
    let out: any;
    out = this.storage.getItem('pet-token');

    // make sure a string is returned even if there is no token
    if (!out) {
      return '';
    }
    return out;
  }

  // save token to Storage provider
  public saveToken(token: string): void {
    this.storage.setItem('pet-token', token);
  }

  // logout application and remove JWT from storage
  public logout(): void {
    this.storage.removeItem('pet-token');
  }

  // boolean to determine if user is logged in and if token is still valid
  // still have to reauthenticate if token is expired
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    }
    else {
      return false;
    }
  }

  // retrieve current user
  // should only be called after method to check if user is logged in has been called
  public getCurrentUser(): User {
    const token: string = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }

  // login method that leverages login method in petData
  // that method returns an observable
  // so subscribe to the result and only process when Observable condition
  // is satisfied
  public login(user: User, passwd: string) : void {
    this.petData.login(user, passwd).subscribe({
      next: (value: any) => {
        if (value) {
          console.log(value);
          this.authResp = value;
          this.saveToken(this.authResp.token);
        }
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
  }

  // register method that leverages register method in petData
  // that method returns an observable
  // so subscribe to the result and only process when Observable condition
  // is satisfied
  public register(user: User, passwd: string) : void {
    this.petData.register(user, passwd).subscribe({
      next: (value: any) => {
        if (value) {
          console.log(value);
          this.authResp = value;
          this.saveToken(this.authResp.token);
        }
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
  }
}
