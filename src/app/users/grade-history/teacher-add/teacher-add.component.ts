import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { PapaParseService } from 'ngx-papaparse';
import { ToastrService } from 'ngx-toastr';
import { GradeHistoryService } from '../grade-history.service';
import { redirectLink } from '../../../@common/models/app.url';
import { Router } from '@angular/router';
import { TeacherAddGrade } from '../grade-history.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.css']
})
export class TeacherAddComponent implements OnInit {

  @ViewChild('csvData') _file: ElementRef;
  @ViewChild('statusUploadDialog') uploadDialog: TemplateRef<any>;
  private data: any;
  private dataOfSTD;
  public selectFormForm: FormGroup;
  public group: string[];
  public groupSelected: string;

  public addedItem: number;
  public errorItem: Array<any>;
  public totalItem: number;

  constructor(
    private route: Router,
    private papa: PapaParseService,
    private toastr: ToastrService,
    private gradeService: GradeHistoryService,
    private fb: FormBuilder,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.createSelectForm();
    this.getGroup();
  }

  groupPredict() {
    this.route.navigate([redirectLink.groupPrediction]);
  }

  goDownload() {
    this.route.navigate([redirectLink.downloadPage]);
  }

  public createSelectForm() {
    this.selectFormForm = this.fb.group({
      group: [null, Validators.compose([Validators.required, Validators.nullValidator])]
    });
  }

  public getGroup() {
    this.gradeService.getGroupByTeacher()
      .then((response) => {
        this.group = response;
      })
      .catch((error) => {
        throw error;
      });
  }
  public onSubmitGroup(value) {
    console.log(value);
    this.groupSelected = value.group;
  }
  public onCSV() {
    const files = this._file.nativeElement.files;
    const blob: Blob = new Blob(files, { type: 'text/csv' });
    this.data = blob;

    const options = {
      header: true,
      complete: (results, file) => {
        this.dataOfSTD = results;
        console.log(this.dataOfSTD);
      },
    };

    this.papa.parse(this.data, options);
  }

  public onAddGrade() {
    if (!this.dataOfSTD || this.dataOfSTD.data.length <= 0) {
      this.toastr.warning('กรุณาเลือกไฟล์ CSV ของคุณ', 'Warning');
    } else {
      this.gradeService.teacherAddGrade({ data: this.dataOfSTD.data, group: this.groupSelected })
        .then((response: TeacherAddGrade) => {
          this.addedItem = response.success.length;
          this.errorItem = response.error;
          this.totalItem = response.success.length + response.error.length;
          this.dialog.open(this.uploadDialog, { disableClose: true, position: { top: '150px' } });
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    }
  }
}
