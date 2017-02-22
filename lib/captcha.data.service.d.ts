import { Http, Response } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/Rx';
export declare class DataService {
    private http;
    constructor(http: Http);
    fetchData(apiBaseUrl: string, nonce: string): Observable<Response>;
    verifyCaptcha(apiBaseUrl: string, nonce: string, answer: any, encryptedAnswer: any): Observable<Response>;
}
