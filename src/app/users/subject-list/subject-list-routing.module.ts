import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectListComponent } from './subject-list.component';
import { Subject50Component } from './subject50/subject50.component';
import { Subject58Component } from './subject58/subject58.component';
import { Subject53Component } from './subject53/subject53.component';



const routes: Routes = [
  {
    path: '',
    component: SubjectListComponent,
    children: [
      {
        path: 'subject58',
        component: Subject58Component,
      },
      {
        path: 'subject53',
        component: Subject53Component,
      },
      {
        path: 'subject50',
        component: Subject50Component,
      },
      {
        path: '',
        redirectTo: 'subject58',
        pathMatch: 'full',
      }
    ]
  },

];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],

  exports: [RouterModule],
  declarations: [
  ]
})
export class SubjectListRoutingModule { }
