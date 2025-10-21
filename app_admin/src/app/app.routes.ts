import { Routes } from '@angular/router';
import { AddPet } from './add-pet/add-pet';
import { PetListing } from './pet-listing/pet-listing';
import { EditPet } from './edit-pet/edit-pet';

export const routes: Routes = [
  { path: 'add-pet', component: AddPet },
  { path: 'edit-pet', component: EditPet},
  { path: '', component: PetListing, pathMatch: 'full' }
];
