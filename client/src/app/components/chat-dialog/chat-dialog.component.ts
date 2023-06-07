import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.sass'],
})
export class ChatDialogComponent implements OnInit {
  messageForm: FormGroup = new FormGroup({
    message: new FormControl('')
  })
  // message?: FormControl = new FormControl('');
  currentUser ?: any;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
    }

    this.chatService.getMessage().subscribe((response) => {
      console.log(response);
    });
  }

  get message() {
    return this.messageForm.get('message');
  }

  sendMessage() {
    this.chatService.sendMessage({
      from: this.currentUser?.email,
      to: 'amoula@gmail.com',
      at: new Date().toISOString(),
      content: this.message?.value,
    });
  }
}
