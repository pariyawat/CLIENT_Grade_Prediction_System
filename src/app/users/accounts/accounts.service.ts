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
}
