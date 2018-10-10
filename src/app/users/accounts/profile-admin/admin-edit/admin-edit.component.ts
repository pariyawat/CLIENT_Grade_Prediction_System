import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AccountsService } from '../../accounts.service';
import { AuthenticationService } from '../../../../@common/service/authentication.service';
import { IActiveUser } from '../../../../@common/models/login.interface';
import { IAdmin } from '../../manage.interface';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {

  // public editAdmin = new FormGroup({
  //   admin_ido: new FormControl('', Validators.required),
  //   admin_id: new FormControl('', Validators.required),
  //   first_name: new FormControl('', Validators.required),
  //   last_name: new FormControl('', Validators.required),
  //   email_address: new FormControl('', Validators.email),
  // });
  public editAdmin: FormGroup;
  public changePass: FormGroup;
  public user: IActiveUser;
  public dataAdmin: IAdmin;
  private newAuth: IActiveUser;


  constructor(
    private serviceAccount: AccountsService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private authService: AuthenticationService
  ) {
    this.user = this.authService.getActiveUser();
  }

  async ngOnInit() {

    await this.serviceAccount.getAdmin(this.user.ID)
      .then((response) => {
        this.dataAdmin = response;
      })
      .catch((error) => {
        throw error;
      });
    this.editAdmin = await new FormGroup({
      admin_ido: new FormControl(this.dataAdmin.admin_id, Validators.required),
      admin_id: new FormControl(this.dataAdmin.admin_id, Validators.required),
      first_name: new FormControl(this.dataAdmin.first_name, Validators.required),
      last_name: new FormControl(this.dataAdmin.last_name, Validators.required),
      email_address: new FormControl(this.dataAdmin.email_address, Validators.email),
    });

    this.changePass = new FormGroup({
      passwordControl: new FormControl('', Validators.required),
      rePasswordControl: new FormControl('', Validators.required)
    }, passwordMatchValidator);

    function passwordMatchValidator(pass: FormGroup) {
      return pass.get('passwordControl').value === pass.get('rePasswordControl').value
        ? null : { 'mismatch': true };
    }

  }



  onEditAdmin(value) {
    this.serviceAccount.editAdmin(value)
      .then((response) => {
        if (response.affectedRows) {
          this.toastr.success(`แก้ไขข้อมูลสำเร็จ`, 'Success');

          this.newAuth = {
            ID: value.admin_id,
            FirstName: value.first_name,
            LastName: value.last_name,
            Role: this.user.Role,
            Token: this.user.Token
          };

          this.authService.setActiveUser(this.newAuth);
          this.editAdmin.reset();
          this.user = this.authService.getActiveUser();
          this.ngOnInit();
        } else {
          this.toastr.error(`ไม่สามารถแก้ไขข้อมูลได้`, 'Error');
        }

      })
      .catch((error) => {
        this.toastr.error(`ไม่สามารถแก้ไขข้อมูลได้`, 'Error');
        throw error;
      });
  }

  onChangePass(value) {
    const data = {
      admin_id: this.user.ID,
      passwordControl: value.passwordControl
    };
    this.serviceAccount.changePassAdmin(data)
      .then((response) => {
        if (response.affectedRows) {
          this.toastr.success(`เปลี่ยนรหัสผ่านสำเร็จ`, 'Success');
          this.changePass.reset();
        } else {
          this.toastr.warning(`เปลี่ยนรหัสผ่านไม่สำเร็จ`, 'Warning');
        }
      })
      .catch((error) => {
        this.toastr.error(`ไม่สามารถเปลี่ยนรหัสผ่านได้`, 'Error');
        throw error;
      });
  }

}
