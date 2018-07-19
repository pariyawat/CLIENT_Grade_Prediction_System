import { Injectable } from '@angular/core';
import { ConnectionService } from '../../@common/service/connection.service';

@Injectable()
export class GradeHistoryService {

  constructor(private connection: ConnectionService) { }

  public studentAddGrade(data): Promise<any> {
    return this.connection.requestPost('add-grade-student', data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
}
