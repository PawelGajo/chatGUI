import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  url: string = 'http://localhost:3000'
  username = '';
  messages = new BehaviorSubject([])
  room = new BehaviorSubject(null)
  roomUsers = new BehaviorSubject([])
  constructor(private http: HttpClient, private router: Router, private socket: Socket) {
    this.getMessage();
    this.getRoomUsers();

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

      } else {
        console.log(`Użytkownik o nazwie ${username} już istnieje.`);
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

      } else {
        console.log(`Użytkownik o nazwie ${username} już istnieje.`);
      }
      });
  }

  goToMainPage() {
    if (confirm('Czy na pewno chcesz opuścić chat?')) {
      this.leaveRoom();
      this.router.navigate(['/auth']);
    }
  }

  sendMessage(msg) {
    this.socket.emit('chatMessage', msg);
  }

}
