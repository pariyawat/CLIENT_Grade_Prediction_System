import {
  Injectable
} from '@angular/core';
import {
  Http,
  Response,
  RequestOptions,
  Headers,
} from '@angular/http';
import {
  appURL
} from '../models/app.url';
import {
  HttpErrorResponse
} from '@angular/common/http';
import {
  AuthenticationService
} from './authentication.service';
import {
  IActiveUser
} from '../models/login.interface';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private myHeaders: Headers;

  constructor(private http: Http,
    private authService: AuthenticationService) {

  }


  setHeader() {

    const userID = this.authService.getActiveUser().ID;

    this.myHeaders = new Headers();
    this.myHeaders.set('token', userID);

    return this.myHeaders;
  }

  public requestGet(path: string): Promise < any > {

    console.log('Path Connect to Server >>>>>>>>>>>>>>>>>>>>>>', appURL.ipServer + path);
    return this.http
      .get(appURL.ipServer + path, { headers: this.setHeader() })
      .toPromise()
      .then((response: Response) => {
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  }

  public requestPost(path: string, data: any): Promise < any > {
    console.log('Path Connect to Server >>>>>>>>>>>>>>>>>>>>>>', appURL.ipServer + path);
    console.log('Data Sendtoserver :', data);
    return this.http
      .post(appURL.ipServer + path, data , { headers: this.setHeader() })
      .toPromise()
      .then((response: Response) => {
        return response.json();
      })
      .catch((error: HttpErrorResponse) => {
        throw error;
      });
  }
}
