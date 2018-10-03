import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IStudentSubject } from '../grade-history.interface';
import { GradeHistoryService } from '../grade-history.service';
import { ToastrService } from 'ngx-toastr';
import { redirectLink } from '../../../@common/models/app.url';

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
  public addGradeForm: FormGroup;
  private dataSource: MatTableDataSource<IStudentSubject[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any>;
  @ViewChild('editDilog') editDilog: TemplateRef<any>;

  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    private gradeService: GradeHistoryService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) {
    this.studentID = activateRoute.snapshot.queryParamMap.get('STD_ID');
    this.studentNAME = activateRoute.snapshot.queryParamMap.get('STD_NAME');
  }

  ngOnInit() {
    this.getGrade();
    this.createAddForm();
  }
  public createAddForm() {
    this.addGradeForm = this.fb.group({
      subject_id: [null, Validators.compose([Validators.required, Validators.nullValidator])],
      grade: [null, Validators.compose([Validators.required, Validators.nullValidator])]
    });
  }

  public onTeacherPredict() {
    this.route.navigate([redirectLink.groupPrediction]);
  }

  public onTeacherAdd() {
    this.route.navigate([redirectLink.teacherAddGrade]);
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

  public onSubmitAddGrade(data) {
    const dataArr = [data];
    this.gradeService.teacherAddGradeOne(dataArr, this.studentID )
      .then((response) => {
        console.log(response);
        if (response.success.length) {
          this.toastr.success(`เพิ่ม ${data.subject_id} แล้ว`, 'Success');
          this.getGrade();
          window.scrollTo(0, 0);
          this.addGradeForm.reset();
        } else if (response.error.length) {
          this.toastr.error(`ไม่พบรหัส ${data.subject_id} ในฐาข้อมูล`, 'Error');
        }
      })
      .catch((error) => {
        console.log(error);
        this.toastr.error(`ไม่สามารถเพิ่มได้`, 'Error');
        throw error;
      });
  }
}
