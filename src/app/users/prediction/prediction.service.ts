import { Injectable } from '@angular/core';
import { ConnectionService } from '../../@common/service/connection.service';
import { IPredictResult } from './prediction.interface';

@Injectable()
export class PredictionService {
  public myResult: IPredictResult;

  constructor(private connection: ConnectionService) { }

  getSubjectPredict(): Promise<any> {
    return this.connection.requestGet('subject-prediction')
      .then((response) => {
        return response;
      }).catch((error) => {
        throw error;
      });
  }

  studentPredict(subject): Promise<any> {
    return this.connection.requestPost('student-prediction', subject)
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
