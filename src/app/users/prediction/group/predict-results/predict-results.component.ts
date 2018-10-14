import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { PredictionService } from '../../prediction.service';
import { Router } from '@angular/router';
import { redirectLink, appURL } from '../../../../@common/models/app.url';
import { MatDialog } from '@angular/material';
import { ConnectionService } from '../../../../@common/service/connection.service';
import { trigger, transition, animate, style } from '@angular/animations';
import { IPredictGroupsResult } from '../../prediction-group.interface';

@Component({
  selector: 'app-predict-results',
  templateUrl: './predict-results.component.html',
  styleUrls: ['./predict-results.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(1000, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PredictResultsComponent implements OnInit {
  public myDataResult: IPredictGroupsResult[];
  public myGraph = [];

  @ViewChild('chartDialog') chartDialog: TemplateRef<any>;
  @ViewChild('contents') contents: ElementRef;

  public showTable: boolean;
  public showChart: boolean;
  public gpaShow: boolean;

  constructor(
    private predictService: PredictionService,
    private route: Router,
    private dialog: MatDialog,
    private connection: ConnectionService
  ) { }

  async  ngOnInit() {

    this.openTable();
    const data = await this.predictService.getGroupResult();
    if (!data) {
      this.route.navigate([redirectLink.groupPrediction]);
    } else {
      console.table(this.myDataResult);
      this.myDataResult = await data;
      await this.predictService.plotGraph(this.myDataResult)
      .then((response) => {
        console.log(response);
        this.myGraph = response;
      }).catch((error) => {
        throw error;
      });
    }
  }

  // async mapGraph(data: IPredictGroupsResult[]) {
  //   const bySubject = [];
  //   await data.forEach((element) => {
  //     element.results.forEach((item) => {
  //       const subject = {
  //         SUB_CPE: item.SUB_CPE,
  //         SUB_NAME: item.SUB_NAME,
  //         ASSO: item.ASSO.Grade,
  //         DT: item.DT.Grade
  //       };
  //       bySubject.push(subject);
  //     });
  //   });
  //   console.log('#####################################', bySubject);

  //   const grade = {
  //     'A': 0,
  //     'B': 0,
  //     'B+': 0,
  //     'C': 0,
  //     'C+': 0,
  //     'D': 0,
  //     'D+': 0,
  //     'F': 0,
  //     '?': 0,
  //     'S': 0,
  //     'U': 0,
  //   };

  //   await bySubject.forEach((item: {
  //     SUB_CPE: string,
  //     SUB_NAME: string,
  //     ASSO: string,
  //     DT: string,
  //   }) => {
  //     if (this.myGraph[item.SUB_CPE] === undefined) {
  //       this.myGraph[item.SUB_CPE] = {};
  //       this.myGraph[item.SUB_CPE]['ASSO'] = {};
  //       this.myGraph[item.SUB_CPE]['DT'] = {};

  //       Object.assign(this.myGraph[item.SUB_CPE]['ASSO'], grade);
  //       Object.assign(this.myGraph[item.SUB_CPE]['DT'], grade);
  //     }
  //     this.myGraph[item.SUB_CPE]['ASSO'][item.ASSO]++;
  //     this.myGraph[item.SUB_CPE]['DT'][item.DT]++;



  //   });
  //   console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$', this.myGraph);

  // }

  // log() {
  //   this.mapGraph(this.myDataResult);
  // }

  openChart() {
    this.showTable = false;
    this.showChart = true;
  }
  openTable() {
    this.showTable = true;
    this.showChart = false;
  }
}
