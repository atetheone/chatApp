import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Injectable()
export class ChatService {
  constructor(private socket: Socket) {}

  sendMessage(data: any) {
    this.socket.emit('messageSent', data);
  }
  getMessage() {
    return this.socket.fromEvent('messageReceived').pipe(map((data: any) => data.msg));
  }
}