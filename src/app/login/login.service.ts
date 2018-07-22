import { Injectable } from '@angular/core';
import { ConnectionService } from '../@common/service/connection.service';
import { AuthenticationService } from '../@common/service/authentication.service';

@Injectable()
export class LoginService {

  constructor(
    private connection: ConnectionService) {
  }

  public toLogin(dataLogin): Promise<any> {
    return this.connection.requestPost('login', dataLogin)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
}
