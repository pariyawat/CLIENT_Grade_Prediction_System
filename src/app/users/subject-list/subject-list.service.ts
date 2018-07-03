import { Injectable } from '@angular/core';
import { ConnectionService } from '../../@common/service/connection.service';

@Injectable()
export class SubjectListService {

  constructor(
    private connection: ConnectionService
  ) { }

  public getSubjectList(id): Promise<any> {
    return this.connection.requestGet('subject/' + id)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
}
