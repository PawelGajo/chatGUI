import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  username = '';
  constructor(private chatService: ChatService) { }


  auth() {
    this.chatService.auth(this.username);
  }

  ngOnInit(): void {
  }

}
