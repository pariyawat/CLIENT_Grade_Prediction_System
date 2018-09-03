import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountsService } from '../../accounts.service';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-email',
  templateUrl: './student-email.component.html',
  styleUrls: ['./student-email.component.css']
})
export class StudentEmailComponent implements OnInit {

  constructor(private accountService: AccountsService,
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) { }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  ngOnInit() {
  }

  onChangeEmail() {
    this.accountService.changeEmail({ email: this.emailFormControl.value })
      .then((response) => {
        if (response.affectedRows === 1) {
          this.toastr.success(`เปลี่ยน Email สำเร็จ`, 'Success');
        } else {
          this.toastr.error(`เปลี่ยน Email ไม่สำเร็จ`, 'Error');
        }
        this.dialog.closeAll();
      })
      .catch((error) => {
        throw error;
      });
  }
}
