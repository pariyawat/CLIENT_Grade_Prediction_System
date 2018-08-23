import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PredictionService } from '../../prediction.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
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
  constructor(
    private predictService: PredictionService,
    private toastr: ToastrService,
    private authService: AuthenticationService,
    private route: Router) { }

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
        this.dataToserver.push({STD_ID: this.user.ID, SUB_CPE: item.SUB_CPE, SUB_NAME: item.SUB_NAME});
      });
      this.predictService.studentPredict(this.dataToserver)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          throw error;
        });
    }
  }

}
