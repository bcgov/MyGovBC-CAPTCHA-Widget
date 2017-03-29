import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/Rx';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  fetchData(apiBaseUrl:string, nonce:string):Observable<Response> {
  	return this.http.post(apiBaseUrl + '/captcha', {nonce: nonce}, {})
  }

  verifyCaptcha(apiBaseUrl:string, nonce:string, answer:string, encryptedAnswer:string):Observable<Response> {
    return this.http.post(apiBaseUrl + '/verify/captcha', {nonce: nonce, answer: answer, validation: encryptedAnswer}, {});
  }

}
