import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AdminProfile, IConfig } from '../profile.interface';
import { IActiveUser } from '../../../@common/models/login.interface';
import { AccountsService } from '../accounts.service';
import { AuthenticationService } from '../../../@common/service/authentication.service';
import { Router } from '@angular/router';
import { redirectLink } from '../../../@common/models/app.url';
import { MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {
  user: IActiveUser;
  dataRes: AdminProfile[];
  configData: IConfig;

  AdminID: string;
  Name: string;
  Email: string;
  Role: string;
  editForm: FormGroup;
  @ViewChild('editDialog') editDialog: TemplateRef<any>;

  constructor(
    private accountService: AccountsService,
    private authService: AuthenticationService,
    private route: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,) {
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
    this.accountService.getConfig()
      .then((response) => {
        this.configData = response;
      })
      .catch((error) => {
        throw error;
      });
  }
  public goAddLearnData() {
    this.route.navigate([redirectLink.adminProfile + '/add-data']);

  }

  public goAddStudentData() {
    this.route.navigate([redirectLink.adminProfile + '/student-data']);
  }

  public goAddTeacherData() {
    this.route.navigate([redirectLink.adminProfile + '/teacher-data']);
  }

  public goGrupManage() {
    this.route.navigate([redirectLink.adminProfile + '/group-manage']);
  }
  public goAccountManage() {
    this.route.navigate([redirectLink.adminProfile + '/edit-account']);
  }

  public predictConfig() {
    this.editForm = new FormGroup({
      config_id: new FormControl(this.configData.config_id),
      support: new FormControl(this.configData.support, Validators.required),
      confidence: new FormControl(this.configData.confidence, Validators.required),


    });
    this.dialog.open(this.editDialog);
  }

  public onEditConfig(value) {
    this.accountService.editConfig(value)
      .then((response) => {
        if (response.affectedRows) {
          this.toastr.success(`แก้ไข้ข้อมูลสำเร็จ`, 'Success');
          this.dialog.closeAll();
        } else {
          this.toastr.warning(`ไม่สามารถแก้ไขได้`, 'Warning');
        }
      })
      .catch((error) => {
        this.toastr.error(`ไม่สามารถแก้ไขได้`, 'Error');
        throw error;
      });
  }
}
