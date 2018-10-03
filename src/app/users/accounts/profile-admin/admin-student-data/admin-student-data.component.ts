import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { AccountsService } from '../../accounts.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { IGroup, IStudent } from '../../manage.interface';
import { PapaParseService } from 'ngx-papaparse';
@Component({
  selector: 'app-admin-student-data',
  templateUrl: './admin-student-data.component.html',
  styleUrls: ['./admin-student-data.component.css']
})
export class AdminStudentDataComponent implements OnInit {

  public groupList: IGroup[];
  public addStudentForm: FormGroup;
  public uploadForm: FormGroup;
  public selectGroup: FormControl;
  public csvData;
  public studentCSV;
  public editForm: FormGroup;
  public deleteItem;
  public changePassForm: FormGroup;
  public showStudentTable: boolean;

  /********** upload result*****/
  public addedItem: number;
  public errorItem: Array<any>;
  public totalItem: number;

  public displayedColumns: string[] = ['student_id', 'first_name', 'last_name', 'email_address', 'EDIT', 'PASSWORD', 'DELETE'];
  private dataSource: MatTableDataSource<IStudent[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('csvData') _file: ElementRef;
  @ViewChild('statusUploadDialog') uploadDialog: TemplateRef<any>;
  @ViewChild('editDialog') editDialog: TemplateRef<any>;
  @ViewChild('changPassDialog') changPassDialog: TemplateRef<any>;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any>;

  constructor(
    private serviceAccount: AccountsService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private papa: PapaParseService,
  ) { }

  ngOnInit() {
    this.showStudentTable = false;
    this.getGroup();
    this.selectGroup = new FormControl('');
    this.addStudentForm = new FormGroup({
      student_id: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      group_name: new FormControl('', Validators.required),
      email_address: new FormControl('', Validators.email),
      passwordControl: new FormControl('', Validators.required),
      rePasswordControl: new FormControl('', Validators.required)
    }, passwordMatchValidator);
    function passwordMatchValidator(pass: FormGroup) {
      return pass.get('passwordControl').value === pass.get('rePasswordControl').value
        ? null : { 'mismatch': true };
    }

    this.uploadForm = new FormGroup({
      student_list: new FormControl('', Validators.required),
      group_name: new FormControl('', Validators.required),
      passwordControl: new FormControl('', Validators.required),
      rePasswordControl: new FormControl('', Validators.required)
    }, passwordMatchValidator);
  }

  public getGroup() {
    this.serviceAccount.getGroup()
      .then((response) => {
        console.log(response);
        this.groupList = response;
      })
      .catch((error) => {
        throw error;
      });
  }
  public  getStudent() {
    this.showStudentTable = true;
     this.serviceAccount.getStudent(this.selectGroup.value)
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

  public onAddStudent(formValue) {
    this.serviceAccount.addStudent(formValue)
      .then((response) => {
        if (response.affectedRows) {
          this.toastr.success(`เพิ่มนักศึกษา ${formValue.first_name} สำเร็จ`, 'Success');
          this.dialog.closeAll();
          this.addStudentForm.reset();
          this.getStudent();
        } else if (response.errno === 1062) {
          this.toastr.warning(`มีผู้ใช้ ${formValue.student_id} อยู่แล้ว`, 'Warning');
        }
      })
      .catch((error) => {
        this.toastr.error(`ไม่สามารถเพิ่มได้`, 'Error');
        throw error;
      });

  }

  public onCSV() {
    const files = this._file.nativeElement.files;
    const blob: Blob = new Blob(files, { type: 'text/csv' });
    this.csvData = blob;

    const options = {
      header: true,
      complete: (results, file) => {
        this.studentCSV = results;
        console.log(this.studentCSV);
      },
    };

    this.papa.parse(this.csvData, options);
  }

  public onUpload(formValue) {
    const { group_name, passwordControl } = formValue;
    const { data } = this.studentCSV;
    const dataSTD = {
      student: data,
      group_name: group_name,
      password: passwordControl
    };
    this.serviceAccount.uploadStudent(dataSTD)
      .then((response) => {

        this.addedItem = response.results.success.length;
        this.errorItem = response.results.error;
        this.totalItem = response.results.success.length + response.results.error.length;
        this.dialog.open(this.uploadDialog, { disableClose: true, position: { top: '150px' } });
        this.uploadForm.reset('');
        this.getStudent();
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  public privateonDownload() {
    const link = document.createElement('a');
    link.href = 'assets/csv/add_student_model.csv';
    link.click();
  }

  public async onEditDialog(row) {
    this.editForm = await new FormGroup({
      student_ido: new FormControl(row.student_id),
      student_id: new FormControl(row.student_id, Validators.required),
      first_name: new FormControl(row.first_name, Validators.required),
      last_name: new FormControl(row.last_name, Validators.required),
      group_name: new FormControl(),
      email_address: new FormControl(row.email_address, Validators.email),

    });
    await this.dialog.open(this.editDialog, { disableClose: true });
  }


  public onEditStudent(data) {
    this.serviceAccount.editStudent(data)
      .then((response) => {
        if (response.affectedRows) {
          this.toastr.success(`แก้ไข้ข้อมูล ${data.first_name} สำเร็จ`, 'Success');
          this.dialog.closeAll();
          this.getStudent();
        } else {
          this.toastr.warning(`มีผู้ใช้ ${data.student_id} อยู่แล้ว`, 'Warning');
        }
      })
      .catch((error) => {
        this.toastr.error(`ไม่สามารถแก้ไขได้`, 'Error');
        throw error;
      });
  }

  public async onChangPassDialog(row) {
    this.changePassForm = await new FormGroup({
      student_id: new FormControl(row.student_id),
      student_name: new FormControl(row.first_name + ' ' + row.last_name),
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
    this.serviceAccount.changePassStudent(data)
      .then((response) => {
        if (response.affectedRows) {
          this.toastr.success(`เปลี่ยนรหัสผ่าน ${data.first_name} สำเร็จ`, 'Success');
          this.dialog.closeAll();
          this.getStudent();
        } else {
          this.toastr.warning(`เปลี่ยนรหัสผ่านไม่สำเร็จ`, 'Warning');
        }
      })
      .catch((error) => {
        this.toastr.error(`ไม่สามารถเปลี่ยนรหัสผ่านได้`, 'Error');
        throw error;
      });
  }

  public async onDeleteDialog(row) {
    this.deleteItem = await row;
    await this.dialog.open(this.deleteDialog);
  }

  public onDeleteStudent() {

    this.serviceAccount.deleteStudent(this.deleteItem.student_id)
      .then((response) => {
        if (response.affectedRows) {
          this.toastr.success(`ลบ ${this.deleteItem.first_name} แล้ว`, 'Success');
          this.dialog.closeAll();
          this.getStudent();
        } else {
          this.toastr.warning(`ไม่สามารถลบได้`, 'Warning');
        }

      }).catch((error) => {
        this.toastr.error(`ไม่สามารถลบได้`, 'Error');
        throw error;
      });
  }
}
