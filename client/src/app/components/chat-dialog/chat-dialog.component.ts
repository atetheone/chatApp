import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.sass'],
})
export class ChatDialogComponent implements OnInit {
  messageForm: FormGroup = new FormGroup({
    message: new FormControl(''),
  });
  // message?: FormControl = new FormControl('');
  currentUser?: any;
  messages: any[] = [
    {
      from: 'ate',
      to: 'amoula',
      at: '2021-08-01T12:00:00.000Z',
      content: 'Hello world',
    },  

  ];
  email?: string;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {

    this.email = this.activatedRoute.snapshot.params['email'];

    if (localStorage.getItem('jwt_token')) {
      this.authService.getCurrentUser()
        .subscribe(user => this.currentUser = user);
      
    }

    this.chatService.getMessage().subscribe((response) => {
      // Append the received message to the view
      
    });
  }

  get message() {
    return this.messageForm.get('message');
  }

  sendMessage() {
    this.chatService.sendMessage({
      sender: this.currentUser?.id,
      receiver: 'amoula@gmail.com',
      content: this.message?.value,
    });
  }
}
