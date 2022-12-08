import { Component, OnInit } from '@angular/core';
import { first, Observable } from 'rxjs';
import User from 'src/app/entities/user.entity';
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
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
    }

    this.userService.getUsers()
      .pipe(first())
      .subscribe(users => this.users = users);
  }

  displayedColumns: string[] = ['name', 'email', 'date']

}
