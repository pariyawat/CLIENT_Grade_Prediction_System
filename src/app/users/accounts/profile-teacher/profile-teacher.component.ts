import { Component, OnInit } from '@angular/core';
import { IActiveUser } from '../../../@common/models/login.interface';
import { TeacherProfile } from '../profile.interface';
import { AccountsService } from '../accounts.service';
import { AuthenticationService } from '../../../@common/service/authentication.service';
import { Router } from '@angular/router';
import { redirectLink } from '../../../@common/models/app.url';
import { MatDialog } from '@angular/material';
import { TeacherEmailComponent } from './teacher-email/teacher-email.component';
import { TeacherPasswordComponent } from './teacher-password/teacher-password.component';

@Component({
  selector: 'app-profile-teacher',
  templateUrl: './profile-teacher.component.html',
  styleUrls: ['./profile-teacher.component.css']
})
export class ProfileTeacherComponent implements OnInit {

  user: IActiveUser;
  dataRes: TeacherProfile[];

  TeacherID: string;
  Name: string;
  Email: string;
  Role: string;

  constructor(
    private accountService: AccountsService,
    private authService: AuthenticationService,
    private route: Router,
    private dialog: MatDialog
  ) {
    this.user = this.authService.getActiveUser();
  }

  ngOnInit() {
    this.getprofile();
  }

  getprofile() {
    this.accountService.gettProfile(this.user.ID, this.user.Role)
      .then((response) => {
        this.dataRes = response;
        this.TeacherID = this.dataRes[0].TeacherID;
        this.Name = this.dataRes[0].Name;
        this.Email = this.dataRes[0].Email;

        if (this.dataRes[0].Role === 'Teacher') {
          this.Role = 'อาจารย์';
        } else {
          this.Role = this.dataRes[0].Role;
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  groupPredict() {
    this.route.navigate([redirectLink.groupPrediction]);
  }

  addGrade() {
    this.route.navigate([redirectLink.teacherAddGrade]);
  }


  onChangeEmail() {
    this.dialog.open(TeacherEmailComponent);
    this.dialog.afterAllClosed.subscribe(() => {
      this.getprofile();
    });
  }

  onChangePassword() {
    this.dialog.open(TeacherPasswordComponent);

  }

}
