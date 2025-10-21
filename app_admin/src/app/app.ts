import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PetListing } from './pet-listing/pet-listing';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PetListing],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = ('Pet Hotel Admin!');
}
