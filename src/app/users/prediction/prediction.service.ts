import { Injectable } from '@angular/core';
import { ConnectionService } from '../../@common/service/connection.service';
import { IPredictResult } from './prediction.interface';
import { IPredictGroupsResult } from './prediction-group.interface';

@Injectable()
export class PredictionService {
  public myResult: IPredictResult;
  public myGroupResult: IPredictGroupsResult[];

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
    return this.connection.requestPredict('prediction/single/std-predict', subject)
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
    return this.connection.requestPredict('prediction/group/prediction', data)
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

  public plotGraph(data): Promise<any> {
    return this.connection.requestPost('prediction/group/graph/plot' , data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });

  }
// ###################################################################################//
  public saveResult(data) {
    this.myResult = data;
  }

  public getResult() {
    return this.myResult;
  }

  public saveGroupResult(data) {
    this.myGroupResult = data;
  }

  public getGroupResult() {
    return this.myGroupResult;
  }
}
