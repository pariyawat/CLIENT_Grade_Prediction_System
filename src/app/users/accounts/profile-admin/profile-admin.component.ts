import { Component, OnInit } from '@angular/core';
import { AdminProfile } from '../profile.interface';
import { IActiveUser } from '../../../@common/models/login.interface';
import { AccountsService } from '../accounts.service';
import { AuthenticationService } from '../../../@common/service/authentication.service';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {
  user: IActiveUser;
  dataRes: AdminProfile[];

  AdminID: string;
  Name: string;
  Email: string;
  Role: string;

  constructor(private accountService: AccountsService, private authService: AuthenticationService) {
    this.user = this.authService.getActiveUser();
  }

  ngOnInit() {
    this.accountService.gettProfile(this.user.ID, this.user.Role)
      .then((response) => {
        this.dataRes = response;
        this.AdminID = this.dataRes[0].AdminID;
        this.Name = this.dataRes[0].Name;
        this.Email = this.dataRes[0].Email;

        if (this.dataRes[0].Role === 'Administrator') {
          this.Role = 'ผู้ดูแล';
        } else {
          this.Role = this.dataRes[0].Role;
        }
      })
      .catch((error) => {
        throw error;
      });
  }

}
