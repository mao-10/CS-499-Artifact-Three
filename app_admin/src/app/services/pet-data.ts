import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class PetData {
  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE)
  private storage: Storage) {}

  baseUrl = 'http://localhost:3000/api';
  url = 'http://localhost:3000/api/pets';

  // get pets
  getPets() : Observable<Pet[]> {
    return this.http.get<Pet[]>(this.url);
  }
  // add a pet
  addPet(formData: Pet) : Observable<Pet> {
    return this.http.post<Pet>(this.url, formData);
  }
  // get a pet
  getPet(petCode: string) : Observable<Pet[]> {
    return this.http.get<Pet[]>(this.url + '/' + petCode);
  }
  // update a pet
  updatePet(formData: Pet) : Observable<Pet> {
    return this.http.put<Pet>(this.url + '/' + formData.code, formData);
  }

  // Call to /login endpoint, returns JWT
  login(user: User, passwd: string) : Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  // call to /register endpoint, creates user and returns jwt
  register(user: User, passwd: string) : Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  // helper method to process login and register methods
  // because they are identical except for path
  handleAuthAPICall(endpoint: string, user: User, passwd: string) : Observable<AuthResponse> {
    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint, formData);
  }
}
