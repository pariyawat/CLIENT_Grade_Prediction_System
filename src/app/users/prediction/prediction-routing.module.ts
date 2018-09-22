import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PredictionComponent } from './prediction.component';
import { SingleComponent } from './single/single.component';
import { GroupComponent } from './group/group.component';
import { SelectSubjectComponent } from './single/select-subject/select-subject.component';
import { PredictResultComponent } from './single/predict-result/predict-result.component';
import { SelectGroupComponent } from './group/select-group/select-group.component';
import { PredictResultsComponent } from './group/predict-results/predict-results.component';
import { SingleTeacherComponent } from './single-teacher/single-teacher.component';
import { TeacherSubjectComponent } from './single-teacher/teacher-subject/teacher-subject.component';

const routes: Routes = [
  {
    path: '',
    component: PredictionComponent,
    children: [
      {
        path: 'single',
        component: SingleComponent,
        children: [
          {
            path: '',
            component: SelectSubjectComponent
          },
          {
            path: 'result',
            component: PredictResultComponent
          }
        ]
      },
      {
        path: 'group',
        component: GroupComponent,
        children: [
          {
            path: '',
            component: SelectGroupComponent
          },
          {
            path: 'results',
            component: PredictResultsComponent
          }
        ]
      },
      {
        path: 'single-teacher',
        component: SingleTeacherComponent,
        children: [
          {
            path: '',
            component: TeacherSubjectComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],

})
export class PredictionRoutingModule { }
