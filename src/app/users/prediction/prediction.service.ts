import { Injectable } from '@angular/core';
import { ConnectionService } from '../../@common/service/connection.service';
import { IPredictResult } from './prediction.interface';

@Injectable()
export class PredictionService {
  public myResult: IPredictResult;

  constructor(private connection: ConnectionService) { }

  getSubjectPredict(STD_ID): Promise<any> {

    if (STD_ID) {
      return this.connection.requestGet('prediction/single/get-subject/' + STD_ID)
        .then((response) => {
          return response;
        }).catch((error) => {
          throw error;
        });
    } else {
      return this.connection.requestGet('prediction/single/get-subject')
        .then((response) => {
          return response;
        }).catch((error) => {
          throw error;
        });
    }

  }

  studentPredict(subject): Promise<any> {
    return this.connection.requestPost('prediction/single/std-predict', subject)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  getGroupByTeacher(): Promise<any> {
    return this.connection.requestGet('prediction/group/get-group')
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  getStudentByGroup(group): Promise<any> {
    return this.connection.requestGet('prediction/group/get-student/' + group)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  getSubjectByGroup(group): Promise<any> {
    return this.connection.requestGet('prediction/group/get-subject/t/' + group)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  teacherPredict(data): Promise<any> {
    return this.connection.requestPost('prediction/group/prediction', data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  saveResult(data) {
    this.myResult = data;
  }

  getResult() {
    return this.myResult;
  }
}
