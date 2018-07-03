import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { IActiveUser } from '../models/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private sessionService: SessionStorageService) { }

  setActiveUser(data: IActiveUser) {
    this.sessionService.store('ACTIVE_USER', data);
  }

  getActiveUser() {
    return this.sessionService.retrieve('ACTIVE_USER');
  }

  clearActiveUser() {
    this.sessionService.clear('ACTIVE_USER');
  }
}
