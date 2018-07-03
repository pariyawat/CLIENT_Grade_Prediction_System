import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../@common/service/authentication.service';
import { Router } from '@angular/router';
import { redirectLink } from '../@common/models/app.url';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private authService: AuthenticationService, private route: Router) { }

  ngOnInit() {
  }

  onLogout() {
    this.authService.clearActiveUser();
    this.route.navigate([redirectLink.loginPage]);
  }

}
