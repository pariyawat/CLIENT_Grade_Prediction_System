import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../@common/service/authentication.service';
import { Router } from '@angular/router';
import { redirectLink } from '../@common/models/app.url';
import { IActiveUser } from '../@common/models/login.interface';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: IActiveUser;
  FirstName: string;
  LastName: string;
  Role: string;
  constructor(private authService: AuthenticationService, private route: Router) {

  }

  ngOnInit() {
    this.user = this.authService.getActiveUser();
    this.FirstName = this.user.FirstName;
    this.LastName = this.user.LastName;
    if (this.user.Role === 'Student') {
      this.Role = 'นักศึกษา';
    } else if (this.user.Role === 'Teacher') {
      this.Role = 'อาจารย์';
    } else {
      this.Role = 'ผู้ดูแล';
    }

  }

  onLogout() {
    this.authService.clearActiveUser();
    this.route.navigate([redirectLink.loginPage]);
  }

  onAccount() {
    if (this.user.Role === 'Student') {
      this.route.navigate([redirectLink.studentProfile]);
    } else if (this.user.Role === 'Teacher') {
      this.route.navigate([redirectLink.teacherProfile]);
    } else {
      this.route.navigate([redirectLink.adminProfile]);
    }
  }

}
