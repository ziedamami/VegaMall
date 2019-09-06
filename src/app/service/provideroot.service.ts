import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { ProviderRoot } from 'app/model/ProviderRoot';
import { ProviderResponse } from 'app/model/ProviderResponse';
import { BehaviorSubject, Observable } from 'rxjs';
import { saveAs } from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class ProviderootService {

 constructor( private http:HttpClient) { }
  
  AddProviderRoot (provider :ProviderRoot){
   return this.http.post<ProviderResponse>("http://localhost:8081/v1/AddProviderRoot",provider).toPromise();
  }
  GetProviderRoot(){
    return this.http.get('http://localhost:8081/v1/getAllProvdersRoot')
  } 


  dataChange: BehaviorSubject<ProviderRoot[]> = new BehaviorSubject<ProviderRoot[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  result:number;

  get data(): ProviderRoot[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getresult(){
    return this.result;
  }
  /** CRUD METHODS */
  getAllIssues(): void {
    this.http.get<ProviderRoot[]>('http://localhost:8081/v1/getAllProvdersRoot').subscribe((data:any) => {
        this.dataChange.next(data.providerInfo);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  // DEMO ONLY, you can find working methods below
  addIssue (provider: ProviderRoot): void {
    
    const  params = new  HttpParams().set('billingaddress', provider.billingaddress).set('name', provider.name).set('rcs',provider.rcs)
    .set('rs',provider.rs).set('vatcode',provider.vatcode).set('logo',provider.logo);
     this.http.post<ProviderResponse>("http://localhost:8081/v1/AddProviderRoot",provider).toPromise().then(par=>{
     this.result=par.result;
     if(par.result==1){
     provider.id=<number>par.providerInfo;
    provider.isdeleted=0;
    }
  });
  this.dialogData = provider;
  }

  updateIssue (provider: ProviderRoot): void {
    this.dialogData = provider;
     this.http.post<ProviderResponse>("http://localhost:8081/v1/update/ProviderRoot",provider).toPromise().then(par=>{
      this.result=par.result;
  });
    }

  deleteIssue (provider:ProviderRoot): void {
    provider.isdeleted=1;
    this.dialogData = provider;
    const  params = new  HttpParams().set('providerRootID', provider.id+"")
    this.http.delete<ProviderResponse>("http://localhost:8081/v1/delete/ProviderRoot/"+provider.id).toPromise()
 
  }
  postFile(fileToUpload: File){
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
  
}
}
