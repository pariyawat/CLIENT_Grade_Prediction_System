import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';
import { ToastrService } from 'ngx-toastr';
import { GradeHistoryService } from '../grade-history.service';
import { AuthenticationService } from '../../../@common/service/authentication.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { NgxAlertsService } from '@ngx-plus/ngx-alerts';
import { IActiveUser } from '../../../@common/models/login.interface';
import { IStudentSubject } from '../grade-history.interface';

@Component({
  selector: 'app-grade-student',
  templateUrl: './grade-student.component.html',
  styleUrls: ['./grade-student.component.css']
})
export class GradeStudentComponent implements OnInit {
  @ViewChild('csvData') _file: ElementRef;
  @ViewChild('statusUploadDialog') uploadDialog: TemplateRef<any>;
  @ViewChild('deleteDialog') deleteDialog: TemplateRef<any>;
  private data: any;
  private gradeData;
  public uploadStatus;
  public deleteItem;
  private user: IActiveUser = this.authService.getActiveUser();

  public displayedColumns: string[] = ['SUB_ID', 'SUB_NAME', 'GRADE', 'COURSE', 'ACTION'];
  private dataSource: MatTableDataSource<IStudentSubject[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private papa: PapaParseService,
    private gradeService: GradeHistoryService,
    private authService: AuthenticationService,
    private alerts: NgxAlertsService,
    private toastr: ToastrService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getGrade();
  }


  public onCSV() {
    const files = this._file.nativeElement.files;
    const blob: Blob = new Blob(files, { type: 'text/csv' });
    this.data = blob;

    const options = {
      header: true,
      complete: (results, file) => {
        this.gradeData = results;
        console.log(this.gradeData);
      },
    };

    this.papa.parse(this.data, options, );
  }

  public onAddGrade() {
    if (!this.gradeData) {
      this.toastr.warning('กรุณาเลือกไฟล์ CSV ของคุณ', 'Warning');
    } else {
      this.gradeService.studentAddGrade(this.gradeData.data)
        .then((response) => {
          console.log(response);
          this.uploadStatus = response;
          // const item: any = {
          //   title: `Status`,
          //   text: `
          //   Success: ${response.success}
          //   Error: ${response.error}
          //   Total: ${response.total}
          //   Message: ${response.errorItem}
          //   `
          // };
          // this.alerts.alertInfo(item);
          this.onUploadDialog();
          this.getGrade();
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    }
  }

  private getGrade() {
    this.gradeService.studentGetGrade(this.user.ID)
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

  private onUploadDialog() {
    this.dialog.open(this.uploadDialog);
  }

  public onEditGrade(data) {
    alert(data);
  }

  public onDeleteGrade(SUB_ID) {
    this.gradeService.studentDeleteGrade(SUB_ID)
      .then((response) => {
        console.log(response);
        this.getGrade();
      })
      .catch((error) => {
        throw error;
      });
  }
  public onDeleteDialog(item) {
    this.deleteItem = item;
    this.dialog.open(this.deleteDialog);
  }
}
