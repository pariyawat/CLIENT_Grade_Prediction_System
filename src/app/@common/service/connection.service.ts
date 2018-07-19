import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { appURL } from '../models/app.url';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: Http) {

  }

  public requestGet(path: string): Promise<any> {
    console.log('Path Connect to Server >>>>>>>>>>>>>>>>>>>>>>', appURL.ipServer + path);
    return this.http
      .get(appURL.ipServer + path)
      .toPromise()
      .then((response: Response) => {
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  }

  public requestPost(path: string, data: any): Promise<any> {
    console.log('Path Connect to Server >>>>>>>>>>>>>>>>>>>>>>', appURL.ipServer + path);
    console.log('Data Sendtoserver :', data);
    return this.http
      .post(appURL.ipServer + path, data)
      .toPromise()
      .then((response: Response) => {
        return response.json();
      })
      .catch((error: HttpErrorResponse) => {
        throw error;
      });
  }
}

