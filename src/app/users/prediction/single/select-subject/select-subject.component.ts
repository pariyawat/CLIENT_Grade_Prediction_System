import { Component, OnInit, ViewChild } from '@angular/core';
import { PredictionService } from '../../prediction.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { IGetSubjectPredict } from '../../prediction.interface';

@Component({
  selector: 'app-select-subject',
  templateUrl: './select-subject.component.html',
  styleUrls: ['./select-subject.component.css']
})
export class SelectSubjectComponent implements OnInit {

  displayedColumns: string[] = ['SUB_CPE', 'SUB_ID', 'SUB_NAME'];
  dataSource: MatTableDataSource<IGetSubjectPredict[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private predictService: PredictionService) { }

  ngOnInit() {
    this.predictService.getSubjectPredict()
      .then((response) => {
        this.dataSource = new MatTableDataSource(response);
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

}
