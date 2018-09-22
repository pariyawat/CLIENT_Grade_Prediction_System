import { Component, OnInit } from '@angular/core';
import { PredictionService } from '../../prediction.service';
import { Router } from '@angular/router';
import { redirectLink } from '../../../../@common/models/app.url';
import { AuthenticationService } from '../../../../@common/service/authentication.service';

@Component({
  selector: 'app-predict-result',
  templateUrl: './predict-result.component.html',
  styleUrls: ['./predict-result.component.css']
})
export class PredictResultComponent implements OnInit {

  public myResult;
  public gpaDT;
  public gpaASSO;
  public user;
  constructor(
    private predictService: PredictionService,
    private route: Router,
    private authService: AuthenticationService) {
    this.user = authService.getActiveUser();
  }

  ngOnInit() {
    this.myResult = [];
    window.scrollTo(0, 0);
    const data = this.predictService.getResult();
    if (!data) {
      if (this.user.Role === 'Teacher') {
        this.route.navigate([redirectLink.groupPrediction]);
      } else if (this.user.Role === 'Student') {
        this.route.navigate([redirectLink.singlePrediction]);
      }

    } else {
      this.myResult = data.result;
      this.gpaDT = data.gpaDT;
      this.gpaASSO = data.gpaASSO;
    }

    console.log(this.myResult);
  }

}
