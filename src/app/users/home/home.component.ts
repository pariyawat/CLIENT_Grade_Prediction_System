import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../@common/service/authentication.service';
import { Router } from '@angular/router';
import { redirectLink } from '../../@common/models/app.url';
import { IActiveUser } from '../../@common/models/login.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private user: IActiveUser;
  constructor(private authService: AuthenticationService, private route: Router) {
    this.user = this.authService.getActiveUser();
  }

  ngOnInit() {
  }

  public goPrediction() {

    if (this.user.Role === 'Student') {
      this.route.navigate([redirectLink.singlePrediction]);
    } else if (this.user.Role === 'Teacher') {
      this.route.navigate([redirectLink.groupPrediction]);
    } else if (this.user.Role === '"Administrator"') {
      this.route.navigate([redirectLink.adminProfile]);
    }

  }
}
