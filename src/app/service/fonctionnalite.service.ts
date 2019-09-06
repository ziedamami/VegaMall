import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'app/model/User';
import { Profile } from 'app/model/Profile';
import { ProviderResponse } from 'app/model/ProviderResponse';
import { Fonctionnalite } from 'app/model/Fonctionnalite';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FonctionnaliteService {

  currentUser: User;
  users: User[] = [];  

  constructor(private  http: HttpClient,) { }
  getusers(){
    return this.http.get('http://localhost:8081/v1/GetAllUser');
  }
  getProfilesbyuserID(id:number){
    return this.http.get('http://localhost:8081/v1/GetAllProfileByUserId/'+id);
  }
  getFontionnalite(){
    return this.http.get('http://localhost:8081/v1/GetFonctionnalitebyUserid/'+sessionStorage.getItem('id'))
  }
  getAllFonctionnalite(){
    return this.http.get('http://localhost:8081/v1/getAllFonctionnalite')
  }
  getAllNonTreeFonctionnalite(){
    return this.http.get('http://localhost:8081/v1/getAllNonTreeFonctionnalite')

  }
  AddFonctionnalite(fonctionnalite:Fonctionnalite){
    const  params = new  HttpParams().set('code', fonctionnalite.code).set('icone', fonctionnalite.icone).set('fpere',fonctionnalite.fpere+'').set('libelle',fonctionnalite.libelle).set('url',fonctionnalite.url);
    return this.http.post<ProviderResponse>("http://localhost:8081/v1/AddFonctionnalite",params).toPromise();
  }
  getProfile(){
    return this.http.get(' http://localhost:8081/v1/Getprofiles');
  }

  AddProfile (profile:Profile){
    const  params = new  HttpParams().set('code', profile.code).set('designation', profile.designation).set('isactive',profile.isactive+'');
    return this.http.post<ProviderResponse>("http://localhost:8081/v1/AddProfile",params).toPromise();
    //return this.http.post("http://localhost:8081/v1/AddProfile",profile).toPromise();
   
  }




  dataChange: BehaviorSubject<Profile[]> = new BehaviorSubject<Profile[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  result:number;
  getresult(){
    return this.result;
  }

  get data(): Profile[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    this.http.get<Profile[]>('http://localhost:8081/v1/Getprofiles').subscribe((data:any) => {
        this.dataChange.next(data.providerInfo);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  // DEMO ONLY, you can find working methods below
  addIssue (profile: Profile): void {
    
    const  params = new  HttpParams().set('code', profile.code).set('designation', profile.designation).set('isactive','0');
     this.http.post<ProviderResponse>("http://localhost:8081/v1/AddProfile",params).toPromise().then(par=>{
        this.result=par.result;
       if(par.result==0){
       profile.profileId =<number>par.providerInfo;
       profile.isactive=0;
       }

     });
     this.dialogData = profile;

    }

  updateIssue (profile: Profile): void {
    this.dialogData = profile;
    const  params = new  HttpParams().set('code', profile.code).set('designation', profile.designation).set('isactive','0').set('id',profile.profileId+'');
     this.http.post<ProviderResponse>("http://localhost:8081/v1/AddProfile",params).toPromise();
  }

  deleteIssue (profile: Profile): void {
    profile.isactive=1;
    this.dialogData = profile;
    const  params = new  HttpParams().set('code', profile.code).set('designation', profile.designation).set('isactive','1').set('id',profile.profileId+'');
     this.http.post<ProviderResponse>("http://localhost:8081/v1/AddProfile",params).toPromise();
  }
}
