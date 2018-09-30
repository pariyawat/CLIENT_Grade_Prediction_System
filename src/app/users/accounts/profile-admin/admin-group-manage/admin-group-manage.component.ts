import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountsService } from '../../accounts.service';
import { ITeacher, IGroup } from '../../manage.interface';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-admin-group-manage',
  templateUrl: './admin-group-manage.component.html',
  styleUrls: ['./admin-group-manage.component.css']
})
export class AdminGroupManageComponent implements OnInit {

  public addGroupFrom: FormGroup;
  public editForm: FormGroup;
  public teacher: ITeacher;
  public editItem;
  public deleteItem;

  public displayedColumns: string[] = ['NO', 'GROUP', 'TEACHER', 'ACTION'];
  private dataSource: MatTableDataSource<IGroup[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('editDialog') editDialog: TemplateRef<any>;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any>;

  constructor(
    private serviceAccount: AccountsService,
    private toastr: ToastrService,
    private dialog: MatDialog, ) { }

  ngOnInit() {
    this.getTeacher();
    this.getGroup();
    this.addGroupFrom = new FormGroup({
      groupName: new FormControl(''),
      teacher_key: new FormControl(''),
    });
  }

  getTeacher() {
    this.serviceAccount.getTeacher()
      .then((response) => {
        this.teacher = response;
      })
      .catch((error) => {
        throw error;
      });
  }

  getGroup() {
    this.serviceAccount.getGroup()
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

  onAddGroup(data) {
    this.serviceAccount.addGroup(data)
      .then((response) => {
        if (response.affectedRows) {
          this.addGroupFrom.reset();
          this.toastr.success(`เพิ่มกลุ่ม ${data.groupName} สำเร็จ`, 'Success');
          this.getGroup();
        } else {
          this.toastr.error(`ไม่สามารถเพิ่มกลุ่มได้`, 'Error');
        }

      })
      .catch((error) => {
        this.toastr.error(`ไม่สามารถเพิ่มกลุ่มได้`, 'Error');
        throw error;
      });
  }

  public async onEditDialog(row) {
    this.editItem = await row;
    this.editForm = await new FormGroup({
      group_name: new FormControl(row.group_name),
      teacher_key: new FormControl(''),

    });
    await this.dialog.open(this.editDialog, { disableClose: true });
  }

  public onEditGroup(value) {
    const data = {
      group_name: value.group_name,
      teacher_key: value.teacher_key,
      group_oldname: this.editItem.group_name,
      teacher_oldkey: this.editItem.teacher_key,

    };
    this.serviceAccount.editGroup(data)
      .then((response) => {
        console.log(response);
        if (response.affectedRows) {
          this.toastr.success(`แก้ไข้ข้อมูลสำเร็จ`, 'Success');
          this.dialog.closeAll();
          this.getGroup();
        } else {
          this.toastr.error(`ไม่สามารถแก้ไขข้อมูลได้`, 'Error');
        }
      })
      .catch((error) => {
        this.toastr.error(`ไม่สามารถแก้ไขข้อมูลได้`, 'Error');
        throw error;
      });
  }

  public async onDeleteDialog(row) {
    this.deleteItem = await row;
    await this.dialog.open(this.deleteDialog);
  }

  public onDeleteGroup() {
    this.serviceAccount.deleteGroup(this.deleteItem)
      .then((response) => {
        if (response.affectedRows) {
          this.toastr.success(`ลบ ${this.deleteItem.group_name} แล้ว`, 'Success');
          this.dialog.closeAll();
          this.getGroup();
        } else {
          this.toastr.error(`ลบไม่สำเร็จ`, 'Warning');
        }

      }).catch((error) => {
        this.toastr.error(`ลบไม่สำเร็จ`, 'Warning');
        throw error;
      });
  }

}
