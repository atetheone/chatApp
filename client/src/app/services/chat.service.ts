import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Message } from '../entities/message.entity';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { User } from '../entities';

@Injectable()
export class ChatService {
  usersConnected: any[] = [];
  constructor(
    private socket: Socket,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // On askId event, the client will send his id to the server
  sendId() {
    this.authService.getCurrentUser().subscribe((user: User) => {
      console.log(user);
      this.socket.emit('userLoggedIn', user.id);
    });
  }

  sendMessage(data: Message) {
    this.socket.emit('sendMessage', data);
  }

  getMessage() {
    // this.socket.on('message', () => {});
    return this.socket.fromEvent('receiveMessage');
  }

  getConnectedUsers() {
    return this.socket.fromEvent('connectedUsers');
  }

  // Check if there is a connection to the server
  checkConnection() {
    // this.socket.on()
    this.socket.connect();
  }

  // Get all the messages from the database
  getMessages() {
    return this.http.get<any[]>('http://localhost:3100/api/messages');
  }
}
