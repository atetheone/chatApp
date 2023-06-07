import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLogin } from 'src/app/entities/login.entity';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  get password() {
    return this.loginForm.get('password');
  }

  get email() {
    return this.loginForm.get('email');
  }

  login() {
    const userAuth: UserLogin = {
      email: this.email?.value,
      password: this.password?.value,
    };

    this.authService.login(userAuth).subscribe({
      next: (user) => {
        console.log(user)
        if (user.token) {
          this._snackBar.open('Logged in successfully', 'Close', {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: ['bg-success'],
          });
          localStorage.setItem('jwt_token', user.token);
          this.router.navigateByUrl('/chat');
        } else {
          this._snackBar.open('Email/Password invalid!!!', 'Close', {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: ['bg-danger'],
          });
        }
      },
      error: err => {
        console.log(err.error)
      }
    });
  }
}
