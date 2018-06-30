import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { appURL } from '../URL/app.url';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(
    private http: Http,
  ) { }

  public requestGet(path): Promise<any> {
    console.log(appURL.ipServer + path);
    return this.http.get(appURL.ipServer + path)
      .toPromise()
      .then((response: Response) => {
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
  }
}

