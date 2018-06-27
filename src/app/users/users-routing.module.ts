import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { UsersComponent } from './users.component';
import { HomeComponent } from './home/home.component';
import { DowloadsComponent } from './dowloads/dowloads.component';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'download',
        component: DowloadsComponent,
      },
      {
        path: 'account',
        loadChildren: './accounts/accounts.module#AccountsModule',
      },
      {
        path: 'subject',
        loadChildren: './subject-list/subject-list.module#SubjectListModule',
      },
      {
        path: 'prediction',
        loadChildren: './prediction/prediction.module#PredictionModule',
      },
      {
        path: '',
        redirectTo: 'home',
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
export class UsersRoutingModule { }
