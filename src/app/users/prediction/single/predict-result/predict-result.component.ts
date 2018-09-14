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
  public myResult: IPredictResult[];
  public GPA;
  constructor(
    private predictService: PredictionService,
    private route: Router) { }

  ngOnInit() {
    this.myResult = [];
    window.scrollTo(0, 0);
    const data = this.predictService.getResult();
    if (!data) {
      this.route.navigate([redirectLink.singlePrediction]);
    } else {
      this.myResult = data.result;
      this.GPA = data.GPA;
    }

    console.log(this.myResult);
  }

}
