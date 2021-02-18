import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService } from '../services/chat.service';

@Injectable({
  providedIn: 'root'
})
export class ChatGuard implements CanActivate {
  constructor( private chatService: ChatService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.chatService.username) {
      return true;
    }
    this.router.navigate(['/auth']);
    return false;
  }

}
