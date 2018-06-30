import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SubjectListService } from '../subject-list.service';
import { SubjectList } from '../subject-list.interface';

@Component({
  selector: 'app-subject58',
  templateUrl: './subject58.component.html',
  styleUrls: ['./subject58.component.css']
})
export class Subject58Component implements OnInit {

  displayedColumns: string[] = ['S_ID', 'S_Name', 'Credit'];
  dataSource: MatTableDataSource<SubjectList[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private subjectService: SubjectListService) { }

  ngOnInit() {

    this.subjectService.getSubjectList(58)
      .then((response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
      })
      .catch((error) => {
        console.log(error);
      });
  }



}
