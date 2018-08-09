import { Injectable } from '@angular/core';
import { ConnectionService } from '../../@common/service/connection.service';

@Injectable()
export class PredictionService {

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
}
