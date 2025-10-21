import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PetData } from '../services/pet-data';
import { Pet } from '../models/pet';

@Component({
  selector: 'app-edit-pet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-pet.html',
  styleUrl: './edit-pet.css'
})

export class EditPet implements OnInit {
  public editForm!: FormGroup;
  pet!: Pet;
  submitted = false;
  message : string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private petData: PetData
  ) {}

  ngOnInit(): void {
      // retrieve stashed pet ID
      let petCode = localStorage.getItem("petCode");
      if (!petCode) {
        alert("Something wrong, couldn't find where I stashed petCode!");
        this.router.navigate(['']);
        return;
      }

      console.log('EditPet::ngOnInit');
      console.log('petCode: ' + petCode);

      this.editForm = this.formBuilder.group({
        _id: [],
        code: [petCode, Validators.required],
        name: ['', Validators.required],
        petType: ['', Validators.required],
        petAge: [Number, Validators.required],
        amountDays: [Number, Validators.required],
        amountDue: [Number, Validators.required],
        image: ['', Validators.required]
      })
      this.petData.getPet(petCode).subscribe({
        next: (value: any) => {
          this.pet = value;
          // populate record into form
          this.editForm.patchValue(value[0]);
          if(!value) {
            this.message = 'No pet retrieved!';
          }
          else {
            this.message = 'Pet: ' + petCode + ' retrieved';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }

  public onSubmit() {
    this.submitted = true;
    if(this.editForm.valid) {
      this.petData.updatePet(this.editForm.value).subscribe({
        next: (value: any) => {
          console.log(value);
          this.router.navigate(['']);
        }, error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
    }
  }
  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }
}
