import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PredictionService } from '../../prediction.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { IGetSubjectPredict } from '../../prediction.interface';
import { redirectLink } from '../../../../@common/models/app.url';
import { AuthenticationService } from '../../../../@common/service/authentication.service';
import { IActiveUser } from '../../../../@common/models/login.interface';

@Component({
  selector: 'app-select-subject',
  templateUrl: './select-subject.component.html',
  styleUrls: ['./select-subject.component.css']
})
export class SelectSubjectComponent implements OnInit {

  displayedColumns: string[] = ['SUB_ID', 'SUB_NAME', 'ACTION'];
  dataSource: MatTableDataSource<IGetSubjectPredict[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('loadingDialog') loadingDialog: TemplateRef<any>;
  constructor(
    private predictService: PredictionService,
    private toastr: ToastrService,
    private authService: AuthenticationService,
    private route: Router,
    private dialog: MatDialog,
    private modalService: NgbModal) { }

  private subjectSelected = [];
  private user: IActiveUser = this.authService.getActiveUser();
  private dataToserver = [];


  ngOnInit() {
    this.predictService.getSubjectPredict()
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
  onHistory() {
    this.route.navigate([redirectLink.gradeStudent]);
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
        this.dataToserver.push({ STD_ID: this.user.ID, SUB_CPE: item.SUB_CPE, SUB_NAME: item.SUB_NAME });
      });
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
          console.log(error);
          this.dialog.closeAll();
          this.toastr.error('ไม่สามารถทำนายผลการเรียนได้', 'Error');
        });
    }
  }

}
