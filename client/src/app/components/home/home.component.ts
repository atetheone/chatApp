import { Component, OnInit } from '@angular/core';
import { first, Observable } from 'rxjs';
import { User } from 'src/app/entities';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  currentUser ?: User;

  users : User[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = this.authService.currentUser;
    }

    this.userService.getUsers()
      .pipe(first())
      .subscribe(users => this.users = users);
  }

  displayedColumns: string[] = ['name', 'email', 'date']

}
