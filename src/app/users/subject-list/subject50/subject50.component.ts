import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SubjectList } from '../subject-list.interface';
import { SubjectListService } from '../subject-list.service';

@Component({
  selector: 'app-subject50',
  templateUrl: './subject50.component.html',
  styleUrls: ['./subject50.component.css']
})
export class Subject50Component implements OnInit {
  displayedColumns: string[] = ['S_ID', 'S_Name', 'Credit'];
  dataSource: MatTableDataSource<SubjectList[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private subjectService: SubjectListService) { }

  ngOnInit() {
    this.subjectService.getSubjectList(50)
      .then((response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  applyFilter(filterValue: String) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }
}
