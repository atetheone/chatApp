import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import User from 'src/app/entities/user.entity';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit {
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
  
}
