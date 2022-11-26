import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import User from 'src/app/entities/user.entity';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    cpassword: ['', Validators.required]
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  get password() {
    return this.signupForm.get('password')?.value;
  }

  get cpassword() {
    return this.signupForm.get('cpassword')?.value;
  }

  get name() {
    return this.signupForm.get('name')?.value;
  }

  get email() {
    return this.signupForm.get('email')?.value;
  }


  signup() {
    const user: User = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.signup(user);
  }

}
