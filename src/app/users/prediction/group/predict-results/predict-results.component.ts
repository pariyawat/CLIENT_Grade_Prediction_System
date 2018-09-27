import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { PredictionService } from '../../prediction.service';
import { Router } from '@angular/router';
import { redirectLink, appURL } from '../../../../@common/models/app.url';
import { IPredictGroupsResult, IDataGroupResult, IGraphResult } from '../../prediction-group.interface';
import { MatDialog } from '@angular/material';
import { ConnectionService } from '../../../../@common/service/connection.service';

@Component({
  selector: 'app-predict-results',
  templateUrl: './predict-results.component.html',
  styleUrls: ['./predict-results.component.css']
})
export class PredictResultsComponent implements OnInit {
  public myDataResult: IDataGroupResult[];
  public myGraphResult: IGraphResult[];
  @ViewChild('chartDialog') chartDialog: TemplateRef<any>;

  public showTable: boolean;
  public showChart: boolean;

  constructor(
    private predictService: PredictionService,
    private route: Router,
    private dialog: MatDialog,
    private connection: ConnectionService
  ) { }

  ngOnInit() {
    this.openTable();
    window.scrollTo(0, 0);
    const data = this.predictService.getGroupResult();
    if (!data) {
      this.route.navigate([redirectLink.groupPrediction]);
    } else {

      console.log('have a result ===', data);
      this.myDataResult = data.data;
      this.myGraphResult = data.graph;
    }

  }

  openChart() {
    this.showTable = false;
    this.showChart = true;
  }
  openTable() {
    this.showTable = true;
    this.showChart = false;
  }

}
