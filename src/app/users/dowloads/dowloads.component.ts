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
    link.href = 'assets/csv/student_model.csv';
    link.click();
  }
}
