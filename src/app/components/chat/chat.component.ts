import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages = [];
  room = 'Brak';
  users = [];
  message = ''
  constructor(private chatService: ChatService) { }


  updateMessages() {
    this.chatService.messages.subscribe(msgs => {
      this.messages = msgs;
      // Scroll down
    let chatMessages = document.querySelector('.chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
    })
  }
  getRoomName() {
    this.chatService.room.subscribe( room => {
      this.room = room;
    })
  }
  getRoomUsers() {
    this.chatService.roomUsers.subscribe( users => {
      this.users = users;
    })
  }
  sendMessage() {
    this.message = this.message.trim();
    if(this.message) {
      this.chatService.sendMessage(this.message);
    }
    this.message = '';
  }
  leaveRoom() {
    this.chatService.goToMainPage();
  }
  ngOnInit(): void {
    this.updateMessages();
    this.getRoomName();
    this.getRoomUsers();
  }

}
