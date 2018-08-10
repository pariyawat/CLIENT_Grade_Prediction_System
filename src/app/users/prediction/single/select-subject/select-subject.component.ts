import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PredictionService } from '../../prediction.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { IGetSubjectPredict } from '../../prediction.interface';
import { redirectLink } from '../../../../@common/models/app.url';

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
    private route: Router ) { }

  private subjectSelected = [];
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
    if (this.subjectSelected.length <= 0) {
      this.toastr.warning('กรุณาเลือกวิชาที่ต้องการทำนาย', 'Warning');
    } else {
      this.predictService.studentPredict(this.subjectSelected)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          throw error;
        });
    }
  }

}
