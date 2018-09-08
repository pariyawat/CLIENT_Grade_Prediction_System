import { Injectable } from '@angular/core';
import { ConnectionService } from '../../@common/service/connection.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private connect: ConnectionService) { }

  gettProfile(ID, Role): Promise<any> {
    return this.connect.requestGet('profile/' + ID + '/' + Role)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });

  }

  changeEmail(email): Promise<any> {
    return this.connect.requestPut('profile/change-email', email)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  changePassword(password): Promise<any> {
    return this.connect.requestPost('profile/change-password', password)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
}
