import { Component, OnInit } from '@angular/core';
import { PredictionService } from '../../prediction.service';
import { Router } from '@angular/router';
import { redirectLink } from '../../../../@common/models/app.url';
import { IPredictGroupsResult, IDataGroupResult, IGraphResult } from '../../prediction-group.interface';

@Component({
  selector: 'app-predict-results',
  templateUrl: './predict-results.component.html',
  styleUrls: ['./predict-results.component.css']
})
export class PredictResultsComponent implements OnInit {
  public myDataResult: IDataGroupResult[];
  public myGraphResult: IGraphResult[];
  constructor(
    private predictService: PredictionService,
    private route: Router
  ) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    const data = this.predictService.getGroupResult();
    if (!data) {
      this.route.navigate([redirectLink.groupPrediction]);
    } else {

      console.log('have a result ===',  data);
      this.myDataResult = data.data;
      this.myGraphResult = data.graph;
    }

  }

}
