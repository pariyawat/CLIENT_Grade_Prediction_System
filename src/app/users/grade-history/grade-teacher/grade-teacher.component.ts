import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { IStudentSubject } from '../grade-history.interface';
import { GradeHistoryService } from '../grade-history.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grade-teacher',
  templateUrl: './grade-teacher.component.html',
  styleUrls: ['./grade-teacher.component.css']
})
export class GradeTeacherComponent implements OnInit {
  public studentNAME;
  public studentID;
  public deleteItem;
  public editItem;
  public grade: string[] = ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D'];
  public gradeValue: string;
  public displayedColumns: string[] = ['SUB_ID', 'SUB_NAME', 'GRADE', 'COURSE', 'ACTION'];
  private dataSource: MatTableDataSource<IStudentSubject[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any>;
  @ViewChild('editDilog') editDilog: TemplateRef<any>;

  constructor(
    private activateRoute: ActivatedRoute,
    private gradeService: GradeHistoryService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.studentID = activateRoute.snapshot.queryParamMap.get('STD_ID');
    this.studentNAME = activateRoute.snapshot.queryParamMap.get('STD_NAME');
  }

  ngOnInit() {
    this.getGrade();
  }
  private getGrade() {
    this.gradeService.studentGetGrade(this.studentID)
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

  public onEditDialog(item) {
    this.editItem = item;
    console.log(this.editItem);
    this.dialog.open(this.editDilog);
  }

  public onEditGrade() {
    const data = {
      SUB_ID: this.editItem.SUB_ID,
      GRADE: this.gradeValue,
      STD_ID: this.studentID
    };

    this.gradeService.teacherEditGrade(data)
      .then((response) => {
        this.toastr.success(`แก้ไข ${this.editItem.SUB_NAME}\n เป็น ${data.GRADE} แล้ว`, 'Success');
        this.dialog.closeAll();
        this.getGrade();
      })
      .catch((error) => {
        throw error;
      });
    this.gradeValue = '';
  }

  public onDeleteDialog(item) {
    this.deleteItem = item;
    this.dialog.open(this.deleteDialog);
  }

  public onDeleteGrade() {
    const data = {
      STD_ID: this.studentID,
      SUB_ID: this.deleteItem.SUB_ID
    };

    this.gradeService.teacherDeleteGrade(data)
      .then((response) => {
        this.toastr.success(`ลบ ${this.deleteItem.SUB_NAME} แล้ว`, 'Success');
        this.dialog.closeAll();
        this.getGrade();
      })
      .catch((error) => {
        throw error;
      });
  }
}
