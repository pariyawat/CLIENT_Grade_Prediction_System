import { Component, OnInit } from '@angular/core';
import { IActiveUser } from '../../../@common/models/login.interface';
import { TeacherProfile } from '../profile.interface';
import { AccountsService } from '../accounts.service';
import { AuthenticationService } from '../../../@common/service/authentication.service';
import { Router } from '@angular/router';
import { redirectLink } from '../../../@common/models/app.url';

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
    private route: Router
  ) {
    this.user = this.authService.getActiveUser();
  }

  ngOnInit() {
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
  groupList() {
    this.route.navigate([redirectLink.gradeTeacher]);
  }

}
