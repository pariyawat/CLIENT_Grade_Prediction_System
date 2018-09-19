import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { IGetSubjectPredict } from '../../prediction.interface';
import { PredictionService } from '../../prediction.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { redirectLink } from '../../../../@common/models/app.url';

@Component({
  selector: 'app-teacher-subject',
  templateUrl: './teacher-subject.component.html',
  styleUrls: ['./teacher-subject.component.css']
})
export class TeacherSubjectComponent implements OnInit {

  displayedColumns: string[] = ['SUB_ID', 'SUB_NAME', 'ACTION'];
  dataSource: MatTableDataSource<IGetSubjectPredict[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('loadingDialog') loadingDialog: TemplateRef<any>;

  public studentNAME;
  public studentID;

  private subjectSelected = [];
  private dataToserver = [];

  constructor(
    private predictService: PredictionService,
    private toastr: ToastrService,
    private route: Router,
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    this.studentID = activateRoute.snapshot.queryParamMap.get('STD_ID');
    this.studentNAME = activateRoute.snapshot.queryParamMap.get('STD_NAME');
  }

  ngOnInit() {
    this.predictService.getSubjectPredict(this.studentID)
      .then((response) => {
        this.dataSource = new MatTableDataSource(response.map(list => {
          list['IS_ACTIVE'] = false;
          return list;
        }));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch((error) => {
        throw error;
      });
  }
  applyFilter(filterValue: String) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  async onSAVE() {
    this.subjectSelected = [];

    await this.dataSource.data.forEach((list) => {
      if (list['IS_ACTIVE']) {
        this.subjectSelected.push(list);
      }
    });
  }


  onPrediction() {
    this.dataToserver = [];
    if (this.subjectSelected.length <= 0) {
      this.toastr.warning('กรุณาเลือกวิชาที่ต้องการทำนาย', 'Warning');
    } else {
      this.subjectSelected.forEach(item => {
        this.dataToserver.push({ STD_ID: this.studentID, SUB_CPE: item.SUB_CPE, SUB_NAME: item.SUB_NAME });
      });
      console.log(this.dataToserver);
      this.dialog.open(this.loadingDialog, { disableClose: true, position: { top: '150px' } });
      this.predictService.studentPredict(this.dataToserver)
        .then((response) => {
          console.log('=======', response);
          if (response) {
            this.predictService.saveResult(response);
            this.dialog.closeAll();
            this.route.navigate([redirectLink.singleResult]);
          }
        })
        .catch((error) => {
          this.dialog.closeAll();
          this.toastr.error('ไม่สามารถทำนายผลการเรียนได้', 'Error');
          throw error;
        });
    }
  }

  onHistory() {
    const data = {
      STD_ID: this.studentID,
      STD_NAME: this.studentNAME
    };
    this.route.navigate([redirectLink.gradeTeacher], { queryParams: data });
  }

}
