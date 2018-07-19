import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { AccountsComponent } from './accounts.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { ProfileTeacherComponent } from './profile-teacher/profile-teacher.component';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { StudentEmailComponent } from './profile-student/student-email/student-email.component';
import { StudentPasswordComponent } from './profile-student/student-password/student-password.component';
import { TeacherEmailComponent } from './profile-teacher/teacher-email/teacher-email.component';
import { TeacherPasswordComponent } from './profile-teacher/teacher-password/teacher-password.component';
import { AdminEditComponent } from './profile-admin/admin-edit/admin-edit.component';
import { AdminAddDataComponent } from './profile-admin/admin-add-data/admin-add-data.component';
import { AdminStudentDataComponent } from './profile-admin/admin-student-data/admin-student-data.component';
import { AdminTeacherDataComponent } from './profile-admin/admin-teacher-data/admin-teacher-data.component';
import { AdminGroupManageComponent } from './profile-admin/admin-group-manage/admin-group-manage.component';
import { ProfileStudentGuard } from '../../@common/guards/profile-student.guard';
import { ProfileTeacherGuard } from '../../@common/guards/profile-teacher.guard';
import { ProfileAdminGuard } from '../../@common/guards/profile-admin.guard';




const routes: Routes = [
  {
    path: '',
    component: AccountsComponent,
    children: [
      {
        path: 'Student',
        component: ProfileStudentComponent,
        canActivate: [ProfileStudentGuard],
        children: [
          {
            path: 'change-email',
            component: StudentEmailComponent,
          },
          {
            path: 'change-password',
            component: StudentPasswordComponent,
          },
        ]
      },
      {
        path: 'Teacher',
        component: ProfileTeacherComponent,
        canActivate: [ProfileTeacherGuard],
        children: [
          {
            path: 'change-email',
            component: TeacherEmailComponent
          },
          {
            path: 'change-password',
            component: TeacherPasswordComponent
          },
        ]
      },
      {
        path: 'Administrator',
        component: ProfileAdminComponent,
        canActivate: [ProfileAdminGuard],
        children: [
          {
            path: 'edit-account',
            component: AdminEditComponent
          }
        ]
      },
      {
        path: 'Administrator/add-data',
        component: AdminAddDataComponent
      },
      {
        path: 'Administrator/student-data',
        component: AdminStudentDataComponent
      },
      {
        path: 'Administrator/teacher-data',
        component: AdminTeacherDataComponent
      },
      {
        path: 'Administrator/group-manage',
        component: AdminGroupManageComponent
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
})
export class AccountsRoutingModule { }

