import { Component, OnInit } from '@angular/core';
import { PredictionService } from '../../prediction.service';
import { IPredictResult } from '../../prediction.interface';
import { Router } from '@angular/router';
import { redirectLink } from '../../../../@common/models/app.url';

@Component({
  selector: 'app-predict-result',
  templateUrl: './predict-result.component.html',
  styleUrls: ['./predict-result.component.css']
})
export class PredictResultComponent implements OnInit {
  public myResult: IPredictResult;
  constructor(
    private predictService: PredictionService,
    private route: Router) { }

  ngOnInit() {
    this.myResult = this.predictService.getResult();
    if (!this.myResult) {
      this.route.navigate([redirectLink.singlePrediction]);
    }

    console.log(this.myResult);
  }

}
