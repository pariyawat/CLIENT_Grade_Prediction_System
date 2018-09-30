import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AccountsService } from '../../accounts.service';
import { ITeacher } from '../../manage.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AuthenticationService } from '../../../../@common/service/authentication.service';

@Component({
  selector: 'app-admin-teacher-data',
  templateUrl: './admin-teacher-data.component.html',
  styleUrls: ['./admin-teacher-data.component.css']
})
export class AdminTeacherDataComponent implements OnInit {

  public deleteItem;
  public editForm: FormGroup;
  public addTeacherForm: FormGroup;
  public changePassForm: FormGroup;

  public displayedColumns: string[] = ['teacher_id', 'first_name', 'last_name', 'email_address', 'EDIT', 'PASSWORD', 'DELETE'];
  private dataSource: MatTableDataSource<ITeacher[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('editDialog') editDialog: TemplateRef<any>;
  @ViewChild('addTeacherDialog') addTeacherDialog: TemplateRef<any>;
  @ViewChild('changPassDialog') changPassDialog: TemplateRef<any>;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any>;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private serviceAccount: AccountsService
  ) { }

  ngOnInit() {
    this.getTeacher();
  }

  public getTeacher() {
    this.serviceAccount.getTeacher()
      .then((response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch((error) => {
        throw error;
      });

  }

  public applyFilter(filterValue: String) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public async onEditDialog(row) {
    this.editForm = await new FormGroup({
      teacher_ido: new FormControl(row.teacher_id),
      teacher_id: new FormControl(row.teacher_id, Validators.required),
      first_name: new FormControl(row.first_name, Validators.required),
      last_name: new FormControl(row.last_name, Validators.required),
      email_address: new FormControl(row.email_address, Validators.email),

    });
    await this.dialog.open(this.editDialog, { disableClose: true });
  }

  public onEditTeacher(data) {
    this.serviceAccount.editTeacher(data)
      .then((response) => {
        console.log(response);
        if (response.affectedRows) {
          this.toastr.success(`แกไข้ข้อมูล ${data.first_name} สำเร็จ`, 'Success');
          this.dialog.closeAll();
          this.getTeacher();
        } else {
          this.toastr.warning(`มีผู้ใช้ ${data.teacher_id} อยู่แล้ว`, 'Warning');
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  public async onAddTeacherDialog() {
    this.addTeacherForm = await new FormGroup({
      teacher_id: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email_address: new FormControl('', Validators.email),
      passwordControl: new FormControl('', Validators.required),
      rePasswordControl: new FormControl('', Validators.required)
    }, passwordMatchValidator);
    function passwordMatchValidator(pass: FormGroup) {
      return pass.get('passwordControl').value === pass.get('rePasswordControl').value
        ? null : { 'mismatch': true };
    }
    await this.dialog.open(this.addTeacherDialog, { disableClose: true });
  }
  public onAddTeacher(data) {
    this.serviceAccount.addTeacher(data)
      .then((response) => {
        if (response.affectedRows) {
          this.toastr.success(`เพิ่มอาจารย์ ${data.first_name} สำเร็จ`, 'Success');
          this.dialog.closeAll();
          this.getTeacher();
        } else if (response.errno === 1062) {
          this.toastr.warning(`มีผู้ใช้ ${data.teacher_id} อยู่แล้ว`, 'Warning');
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  public async onChangPassDialog(row) {
    this.changePassForm = await new FormGroup({
      teacher_id: new FormControl(row.teacher_id),
      teacher_name: new FormControl(row.first_name + ' ' + row.last_name),
      passwordControl: new FormControl('', Validators.required),
      rePasswordControl: new FormControl('', Validators.required)
    }, passwordMatchValidator);

    function passwordMatchValidator(pass: FormGroup) {
      return pass.get('passwordControl').value === pass.get('rePasswordControl').value
        ? null : { 'mismatch': true };
    }

    await this.dialog.open(this.changPassDialog, { disableClose: true });

  }

  public onChangePassword(data) {
    this.serviceAccount.changePassTeacher(data)
      .then((response) => {
        if (response.affectedRows) {
          this.toastr.success(`เปลี่ยนรหัสผ่าน ${data.first_name} สำเร็จ`, 'Success');
          this.dialog.closeAll();
          this.getTeacher();
        } else {
          this.toastr.warning(`เปลี่ยนรหัสผ่านไม่สำเร็จ`, 'Warning');
        }
      })
      .catch((error) => {
        throw error;
      });
  }

  public async onDeleteDialog(row) {
    this.deleteItem = await row;
    await this.dialog.open(this.deleteDialog);
  }

  public onDeleteTeacher() {
    this.serviceAccount.deleteTeacher(this.deleteItem.teacher_id)
      .then((response) => {
        if (response.affectedRows) {
          this.toastr.success(`ลบ ${this.deleteItem.first_name} แล้ว`, 'Success');
          this.dialog.closeAll();
          this.getTeacher();
        } else {
          this.toastr.warning(`ลบไม่สำเร็จ`, 'Warning');
        }

      }).catch((error) => {
        throw error;
      });
  }

}
