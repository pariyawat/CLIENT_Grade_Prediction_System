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

  public studentEditGrade(data): Promise<any> {
    return this.connection.requestPut('grade-history/student/edit', data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  public teacherEditGrade(data): Promise<any> {
    return this.connection.requestPut('grade-history/teacher/edit', data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  public teacherDeleteGrade(data): Promise<any> {
    return this.connection.requestDelete('grade-history/teacher/delete/' + data.STD_ID + '/' + data.SUB_ID)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  public teacherAddGrade(data): Promise<any> {
    return this.connection.requestPost('grade-history/teacher/add', data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  public teacherAddGradeOne(data, studen_id): Promise<any> {
    return this.connection.requestPost('grade-history/teacher/add-one/' + studen_id, data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  public getGroupByTeacher(): Promise<any> {
    return this.connection.requestGet('prediction/group/get-group')
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
}
