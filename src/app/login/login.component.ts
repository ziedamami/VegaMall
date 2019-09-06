import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'app/service/login.service';
import { ProviderResponse } from 'app/model/ProviderResponse';
import { User } from 'app/model/User';
import { LoginResponse } from 'app/model/LoginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  success = false;
  user = new User();
  Result : ProviderResponse =new ProviderResponse();
  active=false;
  constructor(private formBuilder: FormBuilder,private service:LoginService,private route:Router) { 
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      message: ['', Validators.required]
    })
  }

  onSubmit() {
  
    this.submitted = true;

    if (this.messageForm.invalid) {
      return;
    }
    this.success = true;
    let data={
      login : this.messageForm.value.name,
      password :this.messageForm.value.message,
    }
    this.service.doLogin(data).then((par:LoginResponse) =>{
      if(par.result==0){
        sessionStorage.setItem('login',data.login);
        //let x=par.providerInfo;
        sessionStorage.setItem('id',par.providerInfo.id.toString());
        sessionStorage.setItem('lastname',par.providerInfo.lname);
        sessionStorage.setItem('firstname',par.providerInfo.lname);
        console.log(sessionStorage);
        this.route.navigate(['/dashboard']);
       }
      this.Result=par;

    });

  }

  ngOnInit() {

  }

}
