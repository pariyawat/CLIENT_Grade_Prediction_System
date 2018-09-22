import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatPaginatorIntl } from '@angular/material';
import { PredictionService } from '../../prediction.service';
import { IStudenByGroup, IGetSubjectPredict } from '../../prediction.interface';
import { redirectLink } from '../../../../@common/models/app.url';

@Component({
  selector: 'app-select-group',
  templateUrl: './select-group.component.html',
  styleUrls: ['./select-group.component.css']
})
export class SelectGroupComponent implements OnInit {


  displayedColumns: string[] = ['STD_ID', 'STD_NAME', 'ACT_SUB', 'MANAGE', 'PREDICT'];
  dataSource: MatTableDataSource<[IStudenByGroup]>;
  displayedSubject: string[] = ['SUB_ID', 'SUB_NAME', 'ACTION'];
  dataSubject: MatTableDataSource<[IGetSubjectPredict]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('loadingDialog') loadingDialog: TemplateRef<any>;
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private predictService: PredictionService) {

  }

  public showStudentTable: boolean;
  public showSubjectTable: boolean;
  public group: string[];
  public selectFormForm: FormGroup;
  private sbjSelected = [];
  private studentCanUse = [];
  private dataToServer = [];


  ngOnInit() {
    this.getGroup();
    this.createSelectForm();
  }

  public createSelectForm() {
    this.selectFormForm = this.fb.group({
      group: [null, Validators.compose([Validators.required, Validators.nullValidator])]
    });
  }

  public getGroup() {
    this.predictService.getGroupByTeacher()
      .then((response) => {
        console.log(response);
        this.group = response;
      })
      .catch((error) => {
        throw error;
      });
  }


  public onSubmitGroup(value) {
    this.showStudentTable = true;
    this.showSubjectTable = false;
    this.sbjSelected = [];
    this.predictService.getStudentByGroup(value.group)
      .then((response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch((error) => {
        throw error;
      });
  }

  public applyFilter(filterValue: String) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public onManageSTD(ID, NAME) {
    const data = {
      STD_ID: ID,
      STD_NAME: NAME
    };
    this.route.navigate([redirectLink.gradeTeacher], { queryParams: data });

  }

  public onPredictSTD(ID, NAME) {
    const data = {
      STD_ID: ID,
      STD_NAME: NAME
    };
    this.route.navigate([redirectLink.teacherPrediction], { queryParams: data });

  }

  public stdWarnAlertB(name) {
    const NAME = name.substr(0, name.indexOf(' '));
    this.toastr.warning(`เนื่องจาก ${NAME}\n มีผลการเรียนต่ำว่า 7 วิชา`, 'ไม่สามารถทำนายได้');
  }

  public onSubjectByGroup(value) {
    this.showStudentTable = false;
    this.showSubjectTable = true;
    this.sbjSelected = [];
    this.studentCanUse = [];
    this.predictService.getSubjectByGroup(value.group)
      .then((response) => {
        this.dataSubject = new MatTableDataSource(response.map(list => {
          list['IS_ACTIVE'] = false;
          return list;
        }));
        this.dataSubject.paginator = this.paginator;
        this.dataSubject.sort = this.sort;
      })
      .catch((error) => {
        throw error;
      });

    this.predictService.getStudentByGroup(value.group)
      .then((response) => {
        response.forEach((std) => {
          if (std.ACT_SUB >= 7) {
            this.studentCanUse.push(std);
          }
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  public subjectFilter(filterValue: String) {
    this.dataSubject.filter = filterValue.trim().toLocaleLowerCase();

    if (this.dataSubject.paginator) {
      this.dataSubject.paginator.firstPage();
    }
  }

  public async onSAVE() {
    this.sbjSelected = [];

    await this.dataSubject.data.forEach((list) => {
      if (list['IS_ACTIVE']) {
        this.sbjSelected.push(list);
      }
    });
  }

  public onTeacherPredict() {
    this.dialog.open(this.loadingDialog, { disableClose: true, position: { top: '150px' } });
    this.dataToServer = [];
    for (const student of this.studentCanUse) {
      for (const subject of this.sbjSelected) {

        const data = {
          STD_ID: student['STD_ID'],
          STD_NAME: student['STD_NAME'],
          SUB_CPE: subject['SUB_CPE'],
          SUB_NAME: subject['SUB_NAME']
        };

        this.dataToServer.push(data);
      }
    }

    this.predictService.teacherPredict(this.dataToServer)
      .then((response) => {
        console.log('>>>>>>>', response);
        if (response) {
          this.predictService.saveGroupResult(response);
          this.dialog.closeAll();
          this.route.navigate([redirectLink.groupResult]);
        }
      })
      .catch((error) => {
        this.dialog.closeAll();
        this.toastr.error('ไม่สามารถทำนายผลการเรียนได้', 'Error');
        throw error;
      });
  }

}
