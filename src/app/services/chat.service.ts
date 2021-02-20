import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { ThrowStmt } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  url: string = 'https://ChatSGGW.pawelgajo.repl.co'
  // url: string = 'http://localhost:3000'
  username = '';
  messages = new BehaviorSubject([]);
  room = new BehaviorSubject(null);
  roomUsers = new BehaviorSubject([]);
  isUsernameAvailable = new BehaviorSubject(true);
  notificationsEnabled = false;
  constructor(private http: HttpClient, private router: Router, private socket: Socket) {
    this.getMessage();
    this.getRoomUsers();
    this.leaveRandom();
  }

  //operacja po otrzymania nowej wiadomosci z serwera
  getMessage() {
    this.socket.on('message', (message) => {
      let currentValue = this.messages.getValue();
      currentValue.push(message);
      this.messages.next(currentValue);
    });
  }

  // info o aktualnym pokoju i userach
  getRoomUsers() {
    this.socket.on('roomUsers', ({ room, users }) => {
      this.room.next(room);
      this.roomUsers.next(users);
    });
  }

  leaveRandom(){
    this.socket.on('leaveRandom', (message) => {
      let currentValue = this.messages.getValue();
      currentValue.push(message);
      this.socket.emit('leaveRandomChatSecondUser');
      this.messages.next(currentValue);
    });
  }

  clearData() {
    this.messages.next([]);
    this.room.next([]);
    this.roomUsers.next([]);
    this.username = ''
  }

  leaveRoom() {
    this.socket.emit('leaveChat');
    this.clearData();
  }

  auth(username: string, room: string) {
    this.clearData();
    return this.http.post<any>(`${this.url}/auth/`, { username}).subscribe(
      (res) => {
        if(res.available) {
        this.socket.emit('joinRoom', {username, room});
        this.username = username;
        this.router.navigate(['/chat']);
        this.isUsernameAvailable.next(true);
      } else {
        this.isUsernameAvailable.next(false);
      }
      });
  }

  randomChat(username) {
    this.clearData();
    return this.http.post<any>(`${this.url}/auth/`, { username}).subscribe(
      (res) => {
        if(res.available) {
        this.router.navigate(['/random']);
        this.username = username;
        this.socket.emit('randomChat', username);

        this.isUsernameAvailable.next(true);
      } else {
        this.isUsernameAvailable.next(false);
      }
      });
  }

  nextChat() {
    this.socket.emit('leaveRandomChat');
    this.messages.next([]);
    this.room.next([]);
    setTimeout(function(){ console.log() }, 600);
    this.socket.emit('randomChat', this.username);
  }


  goToMainPage() {
    if (confirm('Czy na pewno chcesz opuścić chat?')) {
      this.leaveRoom();
      this.router.navigate(['/auth']);
    }
  }

  leaveRandomRoom() {
    if (confirm('Czy na pewno chcesz opuścić chat?')) {
      this.socket.emit('leaveRandomChat');
      this.clearData();
      this.router.navigate(['/auth']);
    }
  }

  sendMessage(msg) {
    this.socket.emit('chatMessage', msg);
  }

}
