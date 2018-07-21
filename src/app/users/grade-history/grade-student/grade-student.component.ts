import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PapaParseService  } from 'ngx-papaparse';
import { GradeHistoryService } from '../grade-history.service';
import { AuthenticationService } from '../../../@common/service/authentication.service';
import { IActiveUser } from '../../../@common/models/login.interface';

@Component({
  selector: 'app-grade-student',
  templateUrl: './grade-student.component.html',
  styleUrls: ['./grade-student.component.css']
})
export class GradeStudentComponent implements OnInit {

  constructor(
    private papa: PapaParseService,
    private gradeService: GradeHistoryService,
    private authService: AuthenticationService) {
  }

  @ViewChild('csvData') _file: ElementRef;
  private data: any;
  private gradeData;
  private user: IActiveUser = this.authService.getActiveUser();


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
    this.gradeData.data.map((student) => {
      student['student_id'] = this.user.ID;
      return student;
    });

    this.gradeService.studentAddGrade(this.gradeData.data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
}
