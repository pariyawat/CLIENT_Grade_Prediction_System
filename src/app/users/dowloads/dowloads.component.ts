import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dowloads',
  templateUrl: './dowloads.component.html',
  styleUrls: ['./dowloads.component.css']
})
export class DowloadsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  stdDownload() {
    // window.open('src/assets/image/angular.svg', '_blank');
    const link = document.createElement('a');
    // link.download = 'filename';
    link.href = 'assets/excel/student_model.xlsx';
    link.click();
  }

  teachDownload() {
    // window.open('src/assets/image/angular.svg', '_blank');
    const link = document.createElement('a');
    // link.download = 'filename';
    link.href = 'assets/excel/teacher_model.xlsx';
    link.click();
  }
}
