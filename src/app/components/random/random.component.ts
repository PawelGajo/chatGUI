import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit {
  messages = [];
  room = 'Brak';
  users = [];
  message = ''
  username = ''
  constructor(private chatService: ChatService) { }


  updateMessages() {
    this.chatService.messages.subscribe(msgs => {
      this.messages = msgs;
      // Scroll down
    let chatMessages = document.querySelector('.chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight - chatMessages.clientHeight;
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
  nextChat() {
    this.chatService.nextChat();

  }
  ngOnInit(): void {
    this.username = this.chatService.username;
    this.updateMessages();
    this.getRoomName();
    this.getRoomUsers();
  }
}
