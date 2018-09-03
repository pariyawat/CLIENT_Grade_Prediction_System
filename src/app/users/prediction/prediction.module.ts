import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { PredictionRoutingModule } from './prediction-routing.module';
import { PredictionComponent } from './prediction.component';
import { SingleComponent } from './single/single.component';
import { GroupComponent } from './group/group.component';
import { SelectSubjectComponent } from './single/select-subject/select-subject.component';
import { PredictResultComponent } from './single/predict-result/predict-result.component';
import { SelectGroupComponent } from './group/select-group/select-group.component';
import { PredictResultsComponent } from './group/predict-results/predict-results.component';
import { SelectSubjectsComponent } from './group/select-subjects/select-subjects.component';
import { PredictionService } from './prediction.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';





@NgModule({
    imports: [
        MaterialModule,
        PredictionRoutingModule,
        CommonModule,
        NgbModule
    ],
    declarations: [
        PredictionComponent,
        SingleComponent,
        SelectSubjectComponent,
        PredictResultComponent,
        GroupComponent,
        SelectGroupComponent,
        SelectSubjectsComponent,
        PredictResultsComponent
    ],
    providers: [
        PredictionService
    ]
})
export class PredictionModule { }
