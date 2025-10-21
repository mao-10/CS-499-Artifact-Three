import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Pet } from '../models/pet';

@Component({
  selector: 'app-pet-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-card.html',
  styleUrl: './pet-card.css'
})

export class PetCard implements OnInit{
  @Input('pet') pet: any;

  constructor(private router: Router) {}

  ngOnInit(): void {

  }

  public editPet(pet: Pet) {
    localStorage.removeItem('petCode');
    localStorage.setItem('petCode', pet.code);
    this.router.navigate(['edit-pet']);
  }
}
