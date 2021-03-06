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
import { PredictionService } from './prediction.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingleTeacherComponent } from './single-teacher/single-teacher.component';
import { TeacherSubjectComponent } from './single-teacher/teacher-subject/teacher-subject.component';
import { PieChartComponent } from './group/pie-chart/pie-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';





@NgModule({
    imports: [
        MaterialModule,
        PredictionRoutingModule,
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        NgxEchartsModule
    ],
    declarations: [
        PredictionComponent,
        SingleComponent,
        SelectSubjectComponent,
        PredictResultComponent,
        GroupComponent,
        SelectGroupComponent,
        PredictResultsComponent,
        SingleTeacherComponent,
        TeacherSubjectComponent,
        PieChartComponent,
    ],
    providers: [
        PredictionService
    ]
})
export class PredictionModule { }
