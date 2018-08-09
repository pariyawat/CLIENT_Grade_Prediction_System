import { Injectable } from '@angular/core';
import { ConnectionService } from '../../@common/service/connection.service';

@Injectable()
export class GradeHistoryService {

  constructor(private connection: ConnectionService) { }

  public studentAddGrade(data): Promise<any> {
    return this.connection.requestPost('grade-history/student/add', data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  public studentGetGrade(id): Promise<any> {
    return this.connection.requestGet('grade-history/student/' + id)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });

  }

  public studentDeleteGrade(id): Promise<any> {
    return this.connection.requestDelete('grade-history/student/delete/' + id)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
}
