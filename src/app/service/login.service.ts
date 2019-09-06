import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProviderResponse } from 'app/model/ProviderResponse';
import { Router } from '@angular/router';
import { LoginResponse } from 'app/model/LoginResponse';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url='http://localhost:8081/v1/authentifier';

  constructor(private  http: HttpClient, private router:Router) { 

  }

  
  doLogin(data) {
    const  params = new  HttpParams().set('login', data.login).set('password', data.password);
    return this.http.post<LoginResponse>(this.url,params).toPromise();
  }

  isUserLoggedIn(){
    let user=sessionStorage.getItem('login');
    return !(user==null);
  }

  logOut(){
    sessionStorage.removeItem('login'); 
    this.router.navigate(['/login'])
  }
  }
  
