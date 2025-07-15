import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  animations: [
    trigger('formAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]  
})
export class SignUpComponent implements OnInit {
  registerEmail = '';
  registerPassword = '';
  loginEmail = '';
  loginPassword = '';
  userEmail = '';
  selectedForm: 'login' | 'register' | '' = '';

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.checkLogin();
  }

  switchForm(form: 'login' | 'register') {
    this.selectedForm = form;
  }
  register() {
    const user = {
      email: this.registerEmail,
      password: this.registerPassword,
    };

    this.dataService.registerUser(user).subscribe({
      next: (response) => {
        console.log('User saved:', response);
        alert('Successfully registered!');
        this.clearForm();
      },
      error: (error) => {
        console.error('Error saving user:', error);
        alert('Something went wrong. Please try again. The password must be case-sensitive. It must contain a minumum of 8 character. It must consist of a mix of uppercase and lowercase letters, numbers, and symbols.');
      }
    });

    console.log('Registered with:', {
      email: this.registerEmail,
      genre: this.registerPassword,
    });

    this.clearForm();
  }
  
  login() {
    const user = {
      email: this.loginEmail,
      password: this.loginPassword,
    };

    this.dataService.loginUser(user).subscribe({
      next: (response) => {
        console.log('User logged in:', response);        
        this.dataService.setToken(response.access_token);
        this.checkLogin();
        // this.dataService.getUser(response.access_token).subscribe(userInfo => {
        //   console.log('User info:', userInfo);
        // });
        // alert('Successfully logged in!');
        this.router.navigate(['products']);
        this.clearForm();
      },
      error: (error) => {
        console.error('Error loging user:', error);
        alert('Something went wrong. Please try again. If you are a new user, please register first. If you are an existing user, please check your email and password.');
      }
    });

    console.log('Registered with:', {
      email: this.loginEmail,
      genre: this.loginPassword,
    });

    this.clearForm();
  }

  checkLogin() {
    let token = this.dataService.getToken();
    if (token) {
      // this.dataService.setToken(token);
      this.dataService.getUser(token).subscribe({
        next: (response) => {
          this.userEmail = response.email;
          console.log('User logged in:', response.email);
          // alert('Successfully logged in!');
        },
        error: (error) => {
          // console.error('Error logging in user:', error);
          // alert('Something went wrong. Please try again.');
        }
      });
    }
  }

  clearForm() {
    this.registerEmail = '';
    this.registerPassword = '';
    this.loginEmail = '';
    this.loginPassword = '';    
  }  
}
