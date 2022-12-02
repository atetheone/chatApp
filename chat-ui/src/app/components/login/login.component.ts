import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  get password() {
    return this.loginForm.get('password')?.value;
  }

  get email() {
    return this.loginForm.get('email')?.value;
  }


  login() {
    const userAuth = {
      email: this.email,
      password: this.password
    };

    this.authService.login(userAuth);
  }


}
