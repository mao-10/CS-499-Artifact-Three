import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetCard } from '../pet-card/pet-card';
import { Pet } from '../models/pet';
import { pets } from '../data/pets';
import { PetData } from '../services/pet-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-listing',
  standalone: true,
  imports: [CommonModule, PetCard],
  templateUrl: './pet-listing.html',
  styleUrl: './pet-listing.css',
  providers: [PetData]
})

export class PetListing implements OnInit {
  pets!: Pet[];
  message: string = '';

  // constructor to initialize petDataService
  constructor(
    private petData: PetData,
    private router: Router) {
    console.log('pet-listing constructor');
  }

  // add Pet
  public addPet(): void {
    this.router.navigate(['add-pet']);
  }

  // method that will call getPets() in PetData
  private getStuff(): void {
    this.petData.getPets()
    .subscribe({
      next: (value: any) => {
        this.pets = value;
        if(value.length > 0) {
          this.message = 'There are ' + value.length + ' pets available.';
        }
        else {
          this.message = 'There were no pets retrieved from the database';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
  }
  // ngOnInit method that will call private method when component is initialized
  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}
