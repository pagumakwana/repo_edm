import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment.prod";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
@Injectable({
    providedIn: 'root'  // <- ADD THIS
})
export class ApiService {
    apiURL: any = environment.apiBaseURL;

    constructor(private http: HttpClient) { }

    get(endpoint: string, body?: any) {
        return this.http.get(this.apiURL + '/' + endpoint, body);
    }

    post(endpoint: string, body?: any) {
        return this.http.post(this.apiURL + '/' + endpoint, body, httpOptions);
    }
    postFile(endpoint: string, bodyFile?: any) {
        return this.http.post(this.apiURL + '/' + endpoint, bodyFile);
    }

    getExternal(endpoint: string, reqOpts?: any) {
        return this.http.get(endpoint, reqOpts);
    }

    postExternal(endpoint: string, body?: any) {
        return this.http.post(endpoint, body, httpOptions);
    }
}