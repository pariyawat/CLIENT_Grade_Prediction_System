import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-grade-student',
  templateUrl: './grade-student.component.html',
  styleUrls: ['./grade-student.component.css']
})
export class GradeStudentComponent implements OnInit {
  private data: any;
  constructor(private papa: Papa) { }
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
        console.log(results, file);
      },
    };

    this.papa.parse(this.data, options, );
  }
}
