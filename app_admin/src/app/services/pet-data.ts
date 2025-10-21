import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet';

@Injectable({
  providedIn: 'root'
})
export class PetData {
  constructor(private http: HttpClient) {}
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
}
