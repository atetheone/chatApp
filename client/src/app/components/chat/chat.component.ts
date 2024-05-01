import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from 'src/app/entities';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass'],
})
export class ChatComponent implements OnInit {
  currentUser?: User;

  messages: any[] = [];

  newMessage!: any;
  users: User[] = [];

  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;

      // console.log(this.currentUser);
    });
    this.chatService.sendId();
    this.chatService.getConnectedUsers().subscribe((users: any) => {
      console.log(users);
    });
    // this.userService.getUsers()
    //   .subscribe(users => this.users = users);

    // this.chatService.getMessages()
  }

  sendMessage() {}

  clearMessage() {}

  selectUser(user: User) {

  }
}
