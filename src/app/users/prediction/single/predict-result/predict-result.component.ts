import { Component, OnInit } from '@angular/core';
import { PredictionService } from '../../prediction.service';
import { Router } from '@angular/router';
import { redirectLink } from '../../../../@common/models/app.url';
import { AuthenticationService } from '../../../../@common/service/authentication.service';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-predict-result',
  templateUrl: './predict-result.component.html',
  styleUrls: ['./predict-result.component.css'],
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
export class PredictResultComponent implements OnInit {

  public myResult;
  public gpaDT;
  public gpaASSO;
  public user;
  public gpaShow: boolean;
  constructor(
    private predictService: PredictionService,
    private route: Router,
    private authService: AuthenticationService) {
    this.user = authService.getActiveUser();
  }

  ngOnInit() {
    this.myResult = [];
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
