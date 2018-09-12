import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountsService } from '../../accounts.service';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-password',
  templateUrl: './student-password.component.html',
  styleUrls: ['./student-password.component.css']
})
export class StudentPasswordComponent implements OnInit {
  public changePassForm: FormGroup;
  constructor(
    private accountService: AccountsService,
    private dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.changePassForm = new FormGroup({
      passwordControl: new FormControl('', Validators.required),
      rePasswordControl: new FormControl('', Validators.required)
    }, passwordMatchValidator);

    function passwordMatchValidator(pass: FormGroup) {
      return pass.get('passwordControl').value === pass.get('rePasswordControl').value
        ? null : { 'mismatch': true };
    }
  }

  onChangePassword() {
    this.accountService.changePassword({password: this.changePassForm.value.passwordControl})
    .then((response) => {

      if (response.affectedRows === 1) {
        this.toastr.success(`เปลี่ยน Password สำเร็จ`, 'Success');
      } else {
        this.toastr.error(`เปลี่ยน Password ไม่สำเร็จ`, 'Error');
      }
      this.dialog.closeAll();
    })
    .catch((error) => {
      this.toastr.error(`เปลี่ยน Password ไม่สำเร็จ`, 'Error');
      throw error;
    });
  }

}
