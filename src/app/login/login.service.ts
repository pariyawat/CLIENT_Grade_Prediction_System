import { Injectable } from '@angular/core';
import { ConnectionService } from '../@common/service/connection.service';
import { AuthenticationService } from '../@common/service/authentication.service';
import { IActiveUser } from '../@common/models/login.interface';

@Injectable()
export class LoginService {

  constructor(
    private connection: ConnectionService,
    private authService: AuthenticationService) {
  }

  public toLogin(dataLogin): Promise<any> {
    return this.connection.requestPost('login', dataLogin)
      .then((response) => {
        this.authService.setActiveUser(<IActiveUser>response);
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
}
