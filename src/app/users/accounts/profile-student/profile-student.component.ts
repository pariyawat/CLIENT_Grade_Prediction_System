import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';
import { AuthenticationService } from '../../../@common/service/authentication.service';
import { StudentProfile } from '../profile.interface';
import { IActiveUser } from '../../../@common/models/login.interface';
import { Router } from '@angular/router';
import { redirectLink } from '../../../@common/models/app.url';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { StudentPasswordComponent } from './student-password/student-password.component';
import { StudentEmailComponent } from './student-email/student-email.component';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css']
})
export class ProfileStudentComponent implements OnInit {

  user: IActiveUser;
  dataRes: StudentProfile[];

  StudentID: string;
  Name: string;
  Email: string;
  Role: string;
  GroupName: string;

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
        this.StudentID = this.dataRes[0].StudentID;
        this.Name = this.dataRes[0].Name;
        this.GroupName = this.dataRes[0].GroupName;
        this.Email = this.dataRes[0].Email;

        if (this.dataRes[0].Role === 'Student') {
          this.Role = 'นักศึกษา';
        } else {
          this.Role = this.dataRes[0].Role;
        }

      })
      .catch((error) => {
        throw error;
      });


  }
  onHistory() {
    this.route.navigate([redirectLink.gradeStudent]);
  }

  onChangePassword() {
    this.dialog.open(StudentPasswordComponent);

  }

  onChangeEmail() {
    this.dialog.open(StudentEmailComponent);
    this.dialog.afterAllClosed.subscribe(() => {
      this.getprofile();
    });
  }


}
