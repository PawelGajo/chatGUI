import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatGuard } from './guards/chat.guard';

const routes: Routes = [
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [ChatGuard]
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [

  ]
})
export class AppRoutingModule { }
