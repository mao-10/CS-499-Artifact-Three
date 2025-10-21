import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PetData } from '../services/pet-data';

@Component({
  selector: 'app-add-pet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-pet.html',
  styleUrl: './add-pet.css'
})

export class AddPet implements OnInit{
  addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private petData: PetData
  ) {}

  ngOnInit() {
      this.addForm = this.formBuilder.group({
        _id: [],
        code: ['', Validators.required],
        name: ['', Validators.required],
        petType: ['', Validators.required],
        petAge: [Number, Validators.required],
        amountDays: [Number, Validators.required],
        amountDue: [Number, Validators.required],
        image: ['', Validators.required],
      })
  }

  public onSubmit() {
    this.submitted = true;
    if(this.addForm.valid) {
      this.petData.addPet(this.addForm.value).subscribe( {
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }});
    }
  }
  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }
}
