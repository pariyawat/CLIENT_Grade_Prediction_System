import { Injectable } from '@angular/core';
import { ConnectionService } from '../../@common/service/connection.service';
import { IPredictResult } from './prediction.interface';

@Injectable()
export class PredictionService {
  public myResult;

  constructor(private connection: ConnectionService) { }

  getSubjectPredict(): Promise<any> {
    return this.connection.requestGet('prediction/single/get-subject')
      .then((response) => {
        return response;
      }).catch((error) => {
        throw error;
      });
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

  saveResult(data) {
    this.myResult = data;
  }

  getResult() {
    return this.myResult;
  }
}
