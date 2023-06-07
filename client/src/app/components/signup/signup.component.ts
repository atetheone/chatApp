import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/entities';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(200)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(200)],
    ],
    password: [
      '',
      [Validators.required, this.createPasswordStrengthValidator()],
    ],
    cpassword: ['', [Validators.required, this.passwordConfirmValidator()]],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  get password() {
    return this.signupForm.get('password');
  }

  get cpassword() {
    return this.signupForm.get('cpassword');
  }

  get name() {
    return this.signupForm.get('name');
  }

  get email() {
    return this.signupForm.get('email');
  }

  createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

      return !passwordValid ? { passwordStrength: true } : null;
    };
  }

  passwordConfirmValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passValue = this.signupForm?.get('password')?.value,
        confValue = control.value;

      const passwordValid = passValue === confValue;

      return !passwordValid ? { passwordCorfirmed: true } : null;
    };
  }

  onSignup() {
    const user = {
      name: this.name?.value,
      email: this.email?.value,
      password: this.password?.value
    };

    this.authService.signup(user)
      .subscribe({
        next: data => {
          console.log(data);
          this._snackBar.open("Your account has been created successfully", "", {
            duration: 2000,
            // here specify the position
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['bg-success']
          })
        this.router.navigate(['/login']);
      }
    });
  }
}
