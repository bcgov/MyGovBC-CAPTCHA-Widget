import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from "rxjs";

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  fetchData(apiBaseUrl:string, nonce:string):Observable<Response> {
  	return this.http.post(apiBaseUrl + '/captcha', {nonce: nonce}, {})
  	.map(
  		(res) => res.json()
  	);
  }

  verifyCaptcha(apiBaseUrl:string, nonce:string, answer, encryptedAnswer):Observable<Response> {
    return this.http.post(apiBaseUrl + '/verify/captcha', {nonce: nonce, answer: answer, encryptedAnswer: encryptedAnswer}, {})
  	.map(
  		(res) => res.json()
  	);
  }

}
