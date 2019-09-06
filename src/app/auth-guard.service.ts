import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: LoginService, private router:Router) { }

  canActivate(): boolean {
    if (this.authService.isUserLoggedIn) {
      console.log('true')
      return true
    } else {
      console.log('false')            
      this.router.navigate(['/login'])
      return false
    }
  }
}
