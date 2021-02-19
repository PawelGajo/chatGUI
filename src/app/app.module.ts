import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { RandomComponent } from './components/random/random.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
// const config: SocketIoConfig = { url: 'https://ChatSGGW.pawelgajo.repl.co', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    AuthComponent,
    RandomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
