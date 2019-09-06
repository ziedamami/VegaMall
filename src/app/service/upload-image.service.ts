import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private http: HttpClient) {
   
    
  }
  header = new HttpHeaders(
    {'Access-Control-Allow-Origin' : '*',
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
      'Access-Control-Allow-Headers': 'Authorization, Lang,append,delete,entries,foreach,get,has,keys,set,values',
      'Access-Control-Allow-Credentials':'true'
    }
);

  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
 
    formdata.append('file', file);

    const req = new HttpRequest('POST', 'http://localhost:8085/v1/provider/product/addImage?idProduct=2',

    formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.post<any>('http://localhost:8085/v1/provider/product/addImage?idProduct=2',formdata,{headers:this.header})
  }
 
  
}
