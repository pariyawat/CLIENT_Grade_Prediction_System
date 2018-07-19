import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { GradeHistoryService } from '../grade-history.service';

@Component({
  selector: 'app-grade-student',
  templateUrl: './grade-student.component.html',
  styleUrls: ['./grade-student.component.css']
})
export class GradeStudentComponent implements OnInit {

  private data: any;
  private gradeData;

  constructor(private papa: Papa, private gradeService: GradeHistoryService) { }

  @ViewChild('csvData') _file: ElementRef;
  ngOnInit() {
  }
  onCSV() {
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

  onAddGrade() {
    this.gradeService.studentAddGrade(this.gradeData.data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        throw error;
      });
  }
}
