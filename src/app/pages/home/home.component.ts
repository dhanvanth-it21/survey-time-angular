import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../common/auth.service';
import { DataSharingService } from '../../common/data-sharing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  // dependency injection
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dataSharingService: DataSharingService) { }

  loginForm!: FormGroup;

  dynamicContent: string[] = [];

  ngOnInit() {

    this.authService.logout();
    this.authService.logedUserSubject$.next(null);

    this.dataSharingService.updateData(this.dynamicContent);
    
    this.loginForm = this.formBuilder.group({
      emailId: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]]
    });

    this.setValue();
  }


  // synced with the form (ngSubmit)
  onSubmit(): void {
    this.invalidCredentials = false;
    if (this.validation()) {
      const loggedInUser: {
        "emailId": string;
        "role": string;
      } | null = this.authService.validateUser((this.loginForm.value));
      if(loggedInUser === null) {
        this.invalidCredentials = true;
      }
      else {
        this.authService.storeLoggedInUser(loggedInUser);
        if(loggedInUser.role === 'admin') {
          this.router.navigate(['admin']);
        }
        else {
          this.router.navigate(['user']);
        }
      }
    }

  }

  // setting the form values only for develpment purpose
  setValue() {
    this.loginForm.patchValue({
      emailId: 'sbdhanvanth@gmail.com',
      password: '12345678'
    })
  }



  validation(): boolean {
    const emailIdControls = this.loginForm.controls['emailId'];
    const passwordControls = this.loginForm.controls['password'];


    if (emailIdControls.touched || emailIdControls.dirty) {
      if (emailIdControls.errors) {
        if (emailIdControls.errors['required']) {
          this.emailErrorMessage = 'Email is required';
        }
        if (emailIdControls.errors['pattern']) {
          this.emailErrorMessage = 'Email is invalid';
        }
      } else {
        this.emailErrorMessage = '';
      }
    }

    if (passwordControls.touched || passwordControls.dirty) {
      if (passwordControls.errors) {
        if (passwordControls.errors['required']) {
          this.passwordErrorMessage = 'Password is required';
        }
        if (passwordControls.errors['minlength']) {
          this.passwordErrorMessage = 'Password should be minimum 8 characters';
        }
      } else {
        this.passwordErrorMessage = '';
      }
    }

    return this.loginForm.valid;

  }

  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';
  invalidCredentials: boolean = false;




}
