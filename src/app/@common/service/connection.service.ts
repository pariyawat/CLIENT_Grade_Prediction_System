import { Injectable } from '@angular/core';
import { Http, Response, Headers, } from '@angular/http';
import { appURL } from '../models/app.url';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { IActiveUser } from '../models/login.interface';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private myHeaders: Headers;
  private authorizationTxt = 'authorization';

  constructor(private http: Http,
    private authService: AuthenticationService) {
    this.myHeaders = new Headers();
    this.myHeaders.set('Accept', 'application/json');
    this.myHeaders.set('Content-Type', 'application/json');
    // this.myHeaders.set('timeout', '300000');
  }


  private setHeader() {
    const userID: IActiveUser = this.authService.getActiveUser();
    if (userID !== null) {
      this.myHeaders.set('userID', userID.ID);
      this.myHeaders.set(this.authorizationTxt, userID.Token);
    }
    return this.myHeaders;
  }

  public requestGet(path: string): Promise<any> {

    console.log('Path Connect to Server >>>>>>>>>>>>>>>>>>>>>>', appURL.ipServer + path);
    return this.http
      .get(appURL.ipServer + path, { headers: this.setHeader() })
      .toPromise()
      .then((response: Response) => {
        return response.json();
      })
      .catch((error: HttpErrorResponse) => {
        throw error;
      });
  }

  public requestPost(path: string, data: any): Promise<any> {
    console.log('Path Connect to Server >>>>>>>>>>>>>>>>>>>>>>', appURL.ipServer + path);
    console.log('Data Sendtoserver :', data);
    return this.http
      .post(appURL.ipServer + path, data, { headers: this.setHeader() })
      .toPromise()
      .then((response: Response) => {
        return response.json();
      })
      .catch((error: HttpErrorResponse) => {
        throw error;
      });
  }

  public requestDelete(path: string): Promise<any> {
    console.log('Path Connect to Server >>>>>>>>>>>>>>>>>>>>>>', appURL.ipServer + path);
    return this.http
      .delete(appURL.ipServer + path, { headers: this.setHeader() })
      .toPromise()
      .then((response: Response) => {
        return response.json();
      })
      .catch((error: HttpErrorResponse) => {
        throw error;
      });
  }

  public requestPut(path: string, data: any): Promise<any> {
    console.log('Path Connect to Server >>>>>>>>>>>>>>>>>>>>>>', appURL.ipServer + path);
    console.log('Data Sendtoserver :', data);
    return this.http
      .put(appURL.ipServer + path, data, { headers: this.setHeader() })
      .toPromise()
      .then((response: Response) => {
        return response.json();
      })
      .catch((error: HttpErrorResponse) => {
        throw error;
      });
  }


  public requestPredict(path: string, data: any): Promise<any> {
    console.log('Path Connect to Server >>>>>>>>>>>>>>>>>>>>>>', appURL.ipServer + path);
    console.log('Data Sendtoserver :', data);
    return this.http
      .post(appURL.ipServer + path, data, { headers: this.setHeader() }).pipe(timeout(1800000))
      .toPromise()
      .then((response: Response) => {
        return response.json();
      })
      .catch((error: HttpErrorResponse) => {
        throw error;
      });
  }
}
