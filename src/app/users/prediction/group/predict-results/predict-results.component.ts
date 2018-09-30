import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { PredictionService } from '../../prediction.service';
import { Router } from '@angular/router';
import { redirectLink, appURL } from '../../../../@common/models/app.url';
import { IPredictGroupsResult, IDataGroupResult, IGraphResult } from '../../prediction-group.interface';
import { MatDialog } from '@angular/material';
import { ConnectionService } from '../../../../@common/service/connection.service';
// import * as jsPDF from 'jspdf';

declare let jsPDF;

@Component({
  selector: 'app-predict-results',
  templateUrl: './predict-results.component.html',
  styleUrls: ['./predict-results.component.css']
})
export class PredictResultsComponent implements OnInit {
  public myDataResult: IDataGroupResult[];
  public myGraphResult: IGraphResult[];
  @ViewChild('chartDialog') chartDialog: TemplateRef<any>;
  @ViewChild('contents') contents: ElementRef;

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

  public exportPDF() {

    const doc = new jsPDF('p', 'pt');
    const columns = ['ID', 'Name', 'Age', 'City'];

    const data = [
      [1, 'Jonathan', 25, 'Gothenburg'],
      [2, 'Simon', 23, 'Gothenburg'],
      [3, 'Hanna', 21, 'Stockholm']
    ];
    doc.autoTable(columns, data);
    doc.save('table.pdf');



  }
}
