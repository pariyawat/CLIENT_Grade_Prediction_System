import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { IActiveUser } from '../models/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private sessionService: SessionStorageService) { }

  public setActiveUser(data: IActiveUser) {
    this.sessionService.store('ACTIVE_USER', data);
  }

  public getActiveUser() {
    return this.sessionService.retrieve('ACTIVE_USER');
  }

  public clearActiveUser() {
    this.sessionService.clear('ACTIVE_USER');
  }
}
