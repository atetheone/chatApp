import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entities';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

interface UsersConnected {
  image: string;
  name: string;
  status: string;
  email: string;
}

@Component({
  selector: 'app-chat-list-users',
  templateUrl: './chat-list-users.component.html',
  styleUrls: ['./chat-list-users.component.sass']
})
export class ChatListUsersComponent implements OnInit {

  usersConnected: UsersConnected[] = [];
  otherUsers: User[] = [];
  @Output() selectUser!: User = new EventEmitter<User>();
  @Input() selectedUser!: User;
  // conversations: any[] = [
  //   {
  //     name: 'Ate',
  //     messages: [
  //       {
  //         message: 'Hello world',
  //         date: '2021-08-01T12:00:00.000Z',
  //       },
  //       {
  //         message: 'Hello ate. How are you? I am fine. Thank you.',
  //         date: '2021-08-01T12:00:00.000Z'
  //       },
  //       {
  //         message: 'Hello',
  //         date: '2021-08-01T12:00:00.000Z'
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Amoula',
  //     messages: [
  //       {
  //         message: 'Hello',
  //         date: '2021-08-01T12:00:00.000Z'
  //       },
  //       {
  //         message: 'Hello',
  //         date: '2021-08-01T12:00:00.000Z'
  //       }
  //     ]
  //   }
  // ];
  
  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.chatService.getConnectedUsers();
    this.usersConnected = this.chatService.usersConnected;

    // this.otherUsers = this.userService.users.filter((user) => {
    //   return user.id !== this.userService.currentUser?.id;
    // }
    let currentUser: User;
    this.authService.getCurrentUser().subscribe((user) => {
      currentUser = user;
    });
    this.userService.getUsers().subscribe((users: User[]) => {
      this.otherUsers = users.filter((user) => {
        return user.id !== currentUser.id;
      });
      console.log(this.otherUsers);
    });

  }

  // _selectUser(user: User) {
  //   // Redirect to the another component with the selected user
  //   this.router.navigate(['/chat/chat-dialog', user.email]);
  // }
}
