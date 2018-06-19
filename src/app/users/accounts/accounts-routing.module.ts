import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { AccountsComponent } from './accounts.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { ProfileTeacherComponent } from './profile-teacher/profile-teacher.component';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';





const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    children: [
      {
        path: 'Student',
        component: ProfileStudentComponent,
      },
      {
        path: 'Teacher',
        component: ProfileTeacherComponent,
      },
      {
        path: 'Administrator',
        component: ProfileAdminComponent,
      },
    ]
  },

];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MaterialModule
  ],

  exports: [RouterModule],
  declarations: [
    AccountsComponent,
    ProfileStudentComponent,
    ProfileTeacherComponent,
    ProfileAdminComponent
  ]
})
export class AccountsRoutingModule { }

