import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  public formError: string = '';
  submitted = false;

  credentials = {
    name: '',
    email: '',
    password: ''
  }
  constructor(private router: Router, private authentication: Authentication) { }

  ngOnInit(): void {}

  // checks to make sure data is still available for all three params
  // if there is an error
  // provide an error message and navigate to login page
  // if there is no error and all three fields have data, doLogin()
  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password ||!this.credentials.name) {
      this.formError = 'All fields are required, please try again';
      this.router.navigateByUrl('#'); // Return to login page
    } else {
      this.doLogin();
    }
  }

  // takes data from user and builds an User object
  // calls the login method
  // and checks if user is logged in
  // if logged in, it redirects to pet-list page
  private doLogin(): void {
    let newUser = {
      name: this.credentials.name,
      email: this.credentials.email
    } as User;
    // console.log('LoginComponent::doLogin');
    // console.log(this.credentials);
    this.authentication.login(newUser, this.credentials.password);
    if(this.authentication.isLoggedIn()) {
      // console.log('Router::Direct');
      this.router.navigate(['']);
    } else {
      var timer = setTimeout(() => {
      if(this.authentication.isLoggedIn()) {
        // console.log('Router::Pause');
        this.router.navigate(['']);
      }},3000);
    }
  }


}
