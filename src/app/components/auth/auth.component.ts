import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  username = '';
  rooms = ['JavaScript', 'Python', 'PHP', 'C#', 'Ruby', 'Linux']
  selectedRoom = this.rooms[0];
  constructor(private chatService: ChatService) { }


  joinRoom() {
    this.chatService.auth(this.username, this.selectedRoom);
  }

  ngOnInit(): void {
  }

}
