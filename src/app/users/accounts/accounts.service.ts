import { Injectable } from '@angular/core';
import { ConnectionService } from '../../@common/service/connection.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private connect: ConnectionService) { }

  gettProfile(ID, Role): Promise<any> {
    return this.connect.requestGet('profile/' + ID + '/' + Role)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });

  }

  changeEmail(email): Promise<any> {
    return this.connect.requestPut('profile/change-email', email)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  changePassword(password): Promise<any> {
    return this.connect.requestPost('profile/change-password', password)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  getTeacher(): Promise<any> {
    return this.connect.requestGet('manage/teacher')
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  addTeacher(data): Promise<any> {
    return this.connect.requestPost('manage/teacher/add', data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  changePassTeacher(data): Promise<any> {
    return this.connect.requestPut('manage/teacher/change-pass', data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  editTeacher(data): Promise<any> {
    return this.connect.requestPut('manage/teacher/edit/profile', data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
  deleteTeacher(teacher_id): Promise<any> {
    return this.connect.requestDelete('manage/teacher/delete/' + teacher_id)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  getGroup(): Promise<any> {
    return this.connect.requestGet('manage/group')
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  addGroup(data): Promise<any> {
    return this.connect.requestPost('manage/group/add', data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }

  editGroup(data): Promise<any> {
    return this.connect.requestPut('manage/group/edit', data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
  }

  deleteGroup(data): Promise<any> {
    return this.connect.requestDelete('manage/group/delete/' + data.group_name + '/' + data.teacher_key)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });
  }
}
