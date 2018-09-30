import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../@common/service/authentication.service';
import { Router, NavigationEnd } from '@angular/router';
import { redirectLink } from '../@common/models/app.url';
import { IActiveUser } from '../@common/models/login.interface';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';


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
  subscription: Subscription;
  constructor(private authService: AuthenticationService, private route: Router, ) {
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

  ngOnInit() {
    this.subscription = this.route.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => window.scrollTo(0, 0));
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

  OnDestroy() {
    this.subscription.unsubscribe();
  }

}
