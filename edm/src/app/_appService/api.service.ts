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
        const formData = new FormData();
        for (let i = 0; i < bodyFile.length; i++) {
            let file: File = bodyFile[i];
            formData.append('UploadFile_' + i, file, file.name)
        }
        return this.http.post(this.apiURL + '/' + endpoint, formData);
    }

    getExternal(endpoint: string, reqOpts?: any) {
        return this.http.get(endpoint, reqOpts);
    }

    postExternal(endpoint: string, body?: any) {
        return this.http.post(endpoint, body, httpOptions);
    }
}